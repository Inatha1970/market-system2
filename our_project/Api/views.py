from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db.models import Sum, Count, Q
from django.utils import timezone
from datetime import datetime, timedelta
from .models import Product, Category, Sale, SalesReport, SellerProfile
from .serializers import (
    ProductSerializer, CategorySerializer, SaleSerializer, 
    SaleCreateSerializer, SalesReportSerializer, SellerProfileSerializer
)
import json

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Sellers can only see active products
        return Product.objects.filter(is_active=True).order_by('-created_at')

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_sale(request):
    serializer = SaleCreateSerializer(data=request.data)
    if serializer.is_valid():
        # Check if seller has permission and product is available
        product = serializer.validated_data['product']
        quantity = serializer.validated_data['quantity']
        
        if product.stock_quantity < quantity:
            return Response(
                {'error': 'Insufficient stock'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create sale
        sale = serializer.save(seller=request.user)
        
        # Update product stock
        product.stock_quantity -= quantity
        product.save()
        
        # Return sale with receipt details
        sale_data = SaleSerializer(sale).data
        return Response(sale_data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def seller_sales(request):
    sales = Sale.objects.filter(seller=request.user).order_by('-sale_date')
    serializer = SaleSerializer(sales, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def sales_dashboard(request):
    user = request.user
    today = timezone.now().date()
    
    # Calculate various metrics
    total_sales = Sale.objects.filter(seller=user).aggregate(
        total_amount=Sum('total_amount'),
        total_quantity=Sum('quantity'),
        total_transactions=Count('id')
    )
    
    # Today's sales
    today_sales = Sale.objects.filter(
        seller=user, 
        sale_date__date=today
    ).aggregate(
        total_amount=Sum('total_amount'),
        total_transactions=Count('id')
    )
    
    # This week's sales
    week_start = today - timedelta(days=today.weekday())
    week_sales = Sale.objects.filter(
        seller=user,
        sale_date__date__gte=week_start
    ).aggregate(
        total_amount=Sum('total_amount'),
        total_transactions=Count('id')
    )
    
    # This month's sales
    month_sales = Sale.objects.filter(
        seller=user,
        sale_date__year=today.year,
        sale_date__month=today.month
    ).aggregate(
        total_amount=Sum('total_amount'),
        total_transactions=Count('id')
    )
    
    return Response({
        'total_sales': total_sales,
        'today_sales': today_sales,
        'week_sales': week_sales,
        'month_sales': month_sales,
        'recent_sales': SaleSerializer(
            Sale.objects.filter(seller=user).order_by('-sale_date')[:5], 
            many=True
        ).data
    })

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def generate_report(request):
    report_type = request.data.get('report_type')
    
    if report_type not in ['daily', 'weekly', 'monthly', 'semi_yearly']:
        return Response(
            {'error': 'Invalid report type'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    today = timezone.now().date()
    
    # Calculate date ranges based on report type
    if report_type == 'daily':
        start_date = today
        end_date = today
    elif report_type == 'weekly':
        start_date = today - timedelta(days=today.weekday())
        end_date = start_date + timedelta(days=6)
    elif report_type == 'monthly':
        start_date = today.replace(day=1)
        if today.month == 12:
            end_date = today.replace(year=today.year + 1, month=1, day=1) - timedelta(days=1)
        else:
            end_date = today.replace(month=today.month + 1, day=1) - timedelta(days=1)
    else:  # semi_yearly
        if today.month <= 6:
            start_date = today.replace(month=1, day=1)
            end_date = today.replace(month=6, day=30)
        else:
            start_date = today.replace(month=7, day=1)
            end_date = today.replace(month=12, day=31)
    
    # Get sales data for the period
    sales = Sale.objects.filter(
        seller=request.user,
        sale_date__date__gte=start_date,
        sale_date__date__lte=end_date
    )
    
    # Calculate totals
    totals = sales.aggregate(
        total_sales=Sum('total_amount') or 0,
        total_quantity=Sum('quantity') or 0,
        total_transactions=Count('id')
    )
    
    # Create or update report
    report, created = SalesReport.objects.get_or_create(
        seller=request.user,
        report_type=report_type,
        start_date=start_date,
        end_date=end_date,
        defaults={
            'total_sales': totals['total_sales'],
            'total_quantity': totals['total_quantity'],
            'total_transactions': totals['total_transactions']
        }
    )
    
    if not created:
        report.total_sales = totals['total_sales']
        report.total_quantity = totals['total_quantity']
        report.total_transactions = totals['total_transactions']
        report.generated_at = timezone.now()
        report.save()
    
    return Response(SalesReportSerializer(report).data)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_receipt(request, sale_id):
    try:
        sale = Sale.objects.get(id=sale_id, seller=request.user)
        return Response(SaleSerializer(sale).data)
    except Sale.DoesNotExist:
        return Response(
            {'error': 'Sale not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def admin_reports(request):
    # Get all reports that haven't been sent to admin yet
    reports = SalesReport.objects.filter(sent_to_admin=False).order_by('-generated_at')
    
    # Mark reports as sent
    reports.update(sent_to_admin=True, sent_at=timezone.now())
    
    return Response(SalesReportSerializer(reports, many=True).data)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def seller_reports(request):
    reports = SalesReport.objects.filter(seller=request.user).order_by('-generated_at')
    return Response(SalesReportSerializer(reports, many=True).data)
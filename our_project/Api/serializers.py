from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Category, Sale, SalesReport, SellerProfile

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('created_by', 'created_at', 'updated_at')

class SaleSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    seller_name = serializers.CharField(source='seller.username', read_only=True)
    
    class Meta:
        model = Sale
        fields = '__all__'
        read_only_fields = ('seller', 'receipt_number', 'total_amount')

class SaleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ['product', 'quantity', 'unit_price', 'customer_name', 'customer_email', 'customer_phone', 'notes']

class SalesReportSerializer(serializers.ModelSerializer):
    seller_name = serializers.CharField(source='seller.username', read_only=True)
    
    class Meta:
        model = SalesReport
        fields = '__all__'
        read_only_fields = ('seller', 'generated_at', 'sent_at')

class SellerProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = SellerProfile
        fields = '__all__'
        read_only_fields = ('user', 'created_at')
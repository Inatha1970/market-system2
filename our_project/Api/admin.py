from django.contrib import admin
from .models import Category, Product, Sale, SalesReport, SellerProfile

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'stock_quantity', 'is_active', 'created_by', 'created_at']
    list_filter = ['category', 'is_active', 'created_at']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(SellerProfile)
class SellerProfileAdmin(admin.ModelAdmin):
    list_display = ['business_name', 'user', 'phone', 'is_approved', 'created_at']
    list_filter = ['is_approved', 'created_at']
    search_fields = ['business_name', 'user__username']

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ['receipt_number', 'product', 'seller', 'quantity', 'total_amount', 'sale_date']
    list_filter = ['sale_date', 'seller', 'product__category']
    search_fields = ['receipt_number', 'customer_name', 'product__name']
    readonly_fields = ['receipt_number', 'total_amount', 'sale_date']

@admin.register(SalesReport)
class SalesReportAdmin(admin.ModelAdmin):
    list_display = ['report_type', 'seller', 'start_date', 'end_date', 'total_sales', 'sent_to_admin', 'generated_at']
    list_filter = ['report_type', 'sent_to_admin', 'generated_at']
    search_fields = ['seller__username']
    readonly_fields = ['generated_at', 'sent_at']
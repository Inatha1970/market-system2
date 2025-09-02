from django.urls import path
from . import views

urlpatterns = [
    # Product endpoints
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    
    # Sales endpoints
    path('sales/create/', views.create_sale, name='create-sale'),
    path('sales/', views.seller_sales, name='seller-sales'),
    path('sales/dashboard/', views.sales_dashboard, name='sales-dashboard'),
    path('sales/receipt/<uuid:sale_id>/', views.get_receipt, name='get-receipt'),
    
    # Reports endpoints
    path('reports/generate/', views.generate_report, name='generate-report'),
    path('reports/', views.seller_reports, name='seller-reports'),
    path('admin/reports/', views.admin_reports, name='admin-reports'),
]
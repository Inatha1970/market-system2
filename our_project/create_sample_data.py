import os
import django
import sys

# Add the project directory to Python path
sys.path.append('/home/project/our_project')

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'our_project.settings')
django.setup()

from django.contrib.auth.models import User
from Api.models import Category, Product, SellerProfile

def create_sample_data():
    # Create admin user
    admin_user, created = User.objects.get_or_create(
        username='admin',
        defaults={
            'email': 'admin@example.com',
            'is_staff': True,
            'is_superuser': True
        }
    )
    if created:
        admin_user.set_password('admin123')
        admin_user.save()
        print("Admin user created: username=admin, password=admin123")

    # Create seller user
    seller_user, created = User.objects.get_or_create(
        username='seller1',
        defaults={
            'email': 'seller1@example.com',
            'first_name': 'John',
            'last_name': 'Seller'
        }
    )
    if created:
        seller_user.set_password('seller123')
        seller_user.save()
        print("Seller user created: username=seller1, password=seller123")

    # Create seller profile
    seller_profile, created = SellerProfile.objects.get_or_create(
        user=seller_user,
        defaults={
            'business_name': 'John\'s Electronics Store',
            'phone': '+1234567890',
            'address': '123 Main St, City, State 12345',
            'is_approved': True
        }
    )

    # Create categories
    categories_data = [
        {'name': 'Electronics', 'description': 'Electronic devices and gadgets'},
        {'name': 'Clothing', 'description': 'Fashion and apparel'},
        {'name': 'Books', 'description': 'Books and educational materials'},
        {'name': 'Home & Garden', 'description': 'Home improvement and garden supplies'},
    ]

    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            name=cat_data['name'],
            defaults={'description': cat_data['description']}
        )

    # Create sample products
    electronics_cat = Category.objects.get(name='Electronics')
    clothing_cat = Category.objects.get(name='Clothing')
    books_cat = Category.objects.get(name='Books')

    products_data = [
        {
            'name': 'Wireless Headphones',
            'description': 'High-quality wireless headphones with noise cancellation',
            'price': 99.99,
            'category': electronics_cat,
            'stock_quantity': 50,
            'image_url': 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'
        },
        {
            'name': 'Smartphone Case',
            'description': 'Protective case for smartphones with premium materials',
            'price': 24.99,
            'category': electronics_cat,
            'stock_quantity': 100,
            'image_url': 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg'
        },
        {
            'name': 'Cotton T-Shirt',
            'description': 'Comfortable 100% cotton t-shirt in various colors',
            'price': 19.99,
            'category': clothing_cat,
            'stock_quantity': 75,
            'image_url': 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'
        },
        {
            'name': 'Programming Guide',
            'description': 'Complete guide to modern web development',
            'price': 39.99,
            'category': books_cat,
            'stock_quantity': 30,
            'image_url': 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'
        },
        {
            'name': 'Bluetooth Speaker',
            'description': 'Portable Bluetooth speaker with excellent sound quality',
            'price': 79.99,
            'category': electronics_cat,
            'stock_quantity': 25,
            'image_url': 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg'
        },
    ]

    for product_data in products_data:
        product, created = Product.objects.get_or_create(
            name=product_data['name'],
            defaults={
                **product_data,
                'created_by': admin_user
            }
        )

    print("Sample data created successfully!")
    print("\nLogin credentials:")
    print("Admin: username=admin, password=admin123")
    print("Seller: username=seller1, password=seller123")

if __name__ == '__main__':
    create_sample_data()
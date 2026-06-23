import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ecommerce_backend.settings")
django.setup()

from products.models import Category, Product

cat, _ = Category.objects.get_or_create(name="Computer accessories")

products_data = [
    ("Baby Bottle Set", 15.99, "Safe BPA-free baby bottle set", False, 50, "Baby Bottle Set/5.jfif"),
    ("Baby Stroller", 89.99, "Lightweight foldable baby stroller", True, 20, "Baby Stroller/3.webp"),
    ("Backpack", 29.99, "Durable travel backpack with USB port", False, 100, "Backpack/backpack.jfif"),
    ("Bluetooth Speaker", 24.99, "Portable wireless speaker deep bass", True, 75, "Bluetooth Speaker/2.webp"),
    ("Denim Jeans Slim Fit", 39.99, "Classic slim fit denim jeans", False, 60, "Denim Jeans Slim Fit/3.webp"),
    ("Dumbbells Set", 49.99, "Adjustable dumbbell set 20kg", False, 30, "Dumbbells Set/dumbel.jfif"),
    ("Electric Kettle", 19.99, "Stainless steel electric kettle 1.5L", False, 80, "Electric Kettle/1.jfif"),
    ("Electric Toaster", 22.99, "2-slice electric toaster stainless steel", False, 45, "Electric Toaster/3.webp"),
    ("External SSD 512GB", 64.99, "USB-C portable SSD 512GB high speed", True, 40, "External SSD 512GB/ssd.jfif"),
    ("Fast Charging Cable", 9.99, "USB-C fast charging cable 2m braided", False, 200, "Fast Charging Cable/5.jfif"),
    ("Fitness Band", 34.99, "Smart fitness band heart rate monitor", False, 90, "Fitness Band/1.jfif"),
    ("Gaming Console", 299.99, "Next-gen gaming console 4K HDR", True, 15, "Gaming Console/2.webp"),
    ("HDMI Cable 2m", 7.99, "HDMI 2.1 cable 2m 4K 60Hz", False, 150, "HDMI Cable 2m/4.jfif"),
    ("Hoodie", 44.99, "Premium cotton hoodie unisex", False, 55, "Hoodie/1.webp"),
    ("Kitchen Blender", 36.99, "High-speed kitchen blender 1000W", True, 35, "Kitchen Blender/CR-Appliances-Inlinehero-reliability-blenders-0524.jfif"),
    ("Kitchen Knife Set", 42.99, "Stainless steel kitchen knife set 6-pcs", False, 25, "Kitchen Knife Set/knifes.jfif"),
    ("Office Chair", 149.99, "Ergonomic office chair lumbar support", True, 20, "Office Chair/chair.webp"),
    ("Smart Ring", 59.99, "Fitness tracking smart ring waterproof", False, 40, "Smart Ring/4.webp"),
    ("Smart TV 43 inch", 349.99, "43-inch 4K UHD smart TV Android", True, 10, "Smart TV 43 inch/smart_tv.webp"),
    ("Smart Watch", 129.99, "Smart watch with GPS heart rate monitor", True, 30, "Smart Watch/6.jpg"),
    ("Watch Strap", 14.99, "Silicone watch strap replacement 22mm", False, 120, "Watch Strap/11.jpg"),
    ("Wireless Earbuds", 49.99, "True wireless earbuds noise cancelling", True, 65, "Wireless Earbuds/6.jfif"),
    ("Yoga Mat", 18.99, "Non-slip yoga mat 6mm thick", False, 85, "Yoga Mat/yoga.jfif"),
]

for name, price, desc, featured, stock, image in products_data:
    Product.objects.get_or_create(
        name=name,
        defaults={
            "category": cat,
            "price": price,
            "description": desc,
            "is_featured": featured,
            "stock": stock,
            "image": image,
            "is_active": True,
        },
    )

print(f"Seeded {Product.objects.count()} products in '{cat.name}' category")

from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50, verbose_name="Category Name")

    def __str__(self):
        return self.name

def get_imagepath(obj, filename):
    return f"{obj.name}/{filename}"

class Product(models.Model):
    name = models.CharField(max_length=50, verbose_name="Product Name")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    stock = models.IntegerField()
    image = models.ImageField(upload_to=get_imagepath, null=True, blank=True)
    is_active = models.BooleanField()

    def __str__(self):
        return self.name
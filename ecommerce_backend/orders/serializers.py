# orders/serializers.py

from rest_framework import serializers
from .models import Order
from products.serializers import ProductSerializer
from users.serializers import UserSerializer


class OrderSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
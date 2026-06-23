from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile
import re

class UserSerializer(serializers.ModelSerializer):
    phone = serializers.SerializerMethodField()
    shipping_address = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone', 'shipping_address']

    def get_phone(self, obj):
        try:
            return obj.profile.phone
        except Profile.DoesNotExist:
            return ''

    def get_shipping_address(self, obj):
        try:
            return obj.profile.shippping_address
        except Profile.DoesNotExist:
            return ''

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        return user
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from .serializers import CategorySerializer, ProductSerializer
from .models import Category, Product
from .filters import PriceFilter
# Create your views here.

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]
    filterset_class = PriceFilter
    search_fields = ('name', 'description')
    ordering_fields = ('price',)

class FeaturedProductsView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request):
        featured_products = Product.objects.filter(is_featured=True)
        serializer = ProductSerializer(featured_products, many=True)
        return Response(serializer.data)

class InquiryView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        return Response({"status": "ok", "message": "Inquiry received"})
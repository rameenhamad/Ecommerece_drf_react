from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Order
from .serializers import OrderSerializer

# Create your views here.
class OrderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        product_ids = request.data.get('products', [])
        if not product_ids:
            return Response(
                {"error": "At least one product is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        order = Order.objects.create(user=request.user)
        order.products.set(product_ids)

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
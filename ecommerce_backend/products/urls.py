from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, FeaturedProductsView, InquiryView

router = DefaultRouter()
router.register(r'category', CategoryViewSet)
router.register(r'products', ProductViewSet)
urlpatterns = router.urls + [
    path('featured/', FeaturedProductsView.as_view(), name='featured-products'),
    path('inquiry/', InquiryView.as_view(), name='inquiry'),
]

import os
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.http import FileResponse, HttpResponseNotFound
from django.views.decorators.http import require_GET

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('products.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/user/', include('users.urls')),
]

@require_GET
def serve_media(request, path):
    file_path = os.path.join(settings.MEDIA_ROOT, path)
    if os.path.exists(file_path):
        return FileResponse(open(file_path, 'rb'))
    return HttpResponseNotFound()

urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve_media),
]

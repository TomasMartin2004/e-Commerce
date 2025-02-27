from django.urls import path
from .views import SimulateAPI, ProductosPorTags

urlpatterns = [
    path('gym/', SimulateAPI.as_view(), name='simulate-api'),
    path('ProductosPorTag', ProductosPorTags.as_view(), name='productos-por-tag'),
]

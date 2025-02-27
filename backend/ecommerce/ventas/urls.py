from django.urls import path
from . import views

urlpatterns = [
    path('ventas/', views.ListarVentas.as_view(), name='ventas'),
    path('ventas/<int:pk>/', views.VerVenta.as_view(), name='venta_detalle'),
    path('ventadetalles/', views.ListarVentaDetalles.as_view(), name='venta_detalles'),
    path('ventas/<int:pk>/detalles/', views.ListarVentaDetalles.as_view(), name='venta_detalles'),
    path('miscompras/', views.MisCompras.as_view(), name='mis_ventas'),
    path('ventas/<int:venta_id>/restaurar-stock/', views.restaurar_stock, name='restaurar_stock'),

]
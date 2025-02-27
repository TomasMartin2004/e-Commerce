from django.db import models

# Create your models here.

class Venta(models.Model):
    ESTADO_CHOICES = [
        ('Finalizada', 'Finalizada'),
        ('Pendiente', 'Pendiente'),
        ('Cancelada', 'Cancelada'),
    ]

    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    detalles = models.ManyToManyField('productos.Productos', through='VentaDetalle', related_name='ventas')
    usuario = models.ForeignKey('custom_auth.User', on_delete=models.SET_NULL, null=True)
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='Pendiente')
    tiene_beneficio = models.BooleanField(default=False)

    def __str__(self):
        return f"Venta {self.id} - {self.estado}"


class VentaDetalle(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, related_name='venta_detalles')
    producto = models.ForeignKey('productos.Productos', on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    subtotal = models.DecimalField(max_digits=12,decimal_places=2)

    def save(self, *args, **kwargs):
        self.subtotal = self.producto.precio * self.cantidad
        super(VentaDetalle, self).save(*args, **kwargs)
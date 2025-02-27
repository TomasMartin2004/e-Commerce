from rest_framework import serializers
from .models import Venta, VentaDetalle
from productos.models import Productos

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = ['id', 'nombre', 'imagen_url']

class VentaDetalleSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)

    class Meta:
        model = VentaDetalle
        fields = '__all__'
        extra_kwargs = {
            'subtotal': {'read_only': True},
            'venta': {'read_only': True},
        }

class VentaCreateSerializer(serializers.ModelSerializer):
    detalles = serializers.ListField(child=serializers.DictField(), write_only=True)

    class Meta:
        model = Venta
        fields = '__all__'
        extra_kwargs = {
            'total': {'read_only': True},
        }

    def create(self, validated_data):
        detalles_data = validated_data.pop('detalles')
        tiene_beneficio = validated_data.pop('tiene_beneficio', False)  # Recibir del frontend
        venta = Venta.objects.create(**validated_data, total=0, tiene_beneficio=tiene_beneficio)

        total = 0
        productos_sin_stock = []

        for detalle_data in detalles_data:
            producto_id = detalle_data['producto']
            producto = Productos.objects.get(id=producto_id)
            if producto.stock < detalle_data['cantidad']:
                productos_sin_stock.append(producto.nombre)

        if productos_sin_stock:
            venta.delete()
            raise serializers.ValidationError({'productos_sin_stock': productos_sin_stock})

        for detalle_data in detalles_data:
            producto_id = detalle_data.pop('producto')
            cantidad = detalle_data['cantidad']
            producto = Productos.objects.get(id=producto_id)

            # Calcular el subtotal con o sin descuento
            precio_unitario = producto.precio
            if tiene_beneficio and producto.tags.filter(id__in=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 26, 29, 30, 31, 32, 33, 34, 35]).exists():
                precio_unitario *= 0.8  # Aplicar 20% de descuento

            subtotal = precio_unitario * cantidad

            venta_detalle = VentaDetalle.objects.create(
                venta=venta,
                producto=producto,
                cantidad=cantidad,
                subtotal=subtotal
            )

            producto.stock -= cantidad
            producto.save()
            total += subtotal

        venta.total = total
        venta.save()
        return venta
    
class VentaDetalleIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentaDetalle
        fields = ['id']  # Solo devolver el ID


class VentaSerializer(serializers.ModelSerializer):
    usuario_email = serializers.EmailField(source='usuario.email', read_only=True)
    detalles = VentaDetalleIdSerializer(source='venta_detalles', many=True, read_only=True)
    estado = serializers.ChoiceField(choices=Venta.ESTADO_CHOICES)  

    class Meta:
        model = Venta
        fields = '__all__'
        extra_kwargs = {
            'total': {'read_only': True},
            'usuario': {'read_only': True}, 
        }


from rest_framework import serializers
from .models import Productos
from .models import Categorias
from .models import Tag

class ProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'
        extra_kwargs = {
            'imagen': {'write_only': True},
            'imagen_url': {'read_only': True},
        }

    def handle_image(self, instance, imagen):
        """Maneja la imagen y actualiza la imagen_url si es necesario."""
        if imagen:
            instance.imagen = imagen
            instance.save()
            instance.imagen_url = self.context['request'].build_absolute_uri(instance.imagen.url)
            instance.save()

    def create(self, validated_data):
        tags = validated_data.pop('tags', [])
        imagen = validated_data.pop('imagen', None)
        producto = Productos.objects.create(**validated_data)
        producto.tags.set(tags)

        # Manejar la imagen y actualizar imagen_url
        self.handle_image(producto, imagen)
        return producto

    def update(self, instance, validated_data):
        tags = validated_data.pop('tags', [])
        imagen = validated_data.pop('imagen', None)

        # Actualizar los datos del producto y los tags
        instance = super().update(instance, validated_data)
        instance.tags.set(tags)

        # Manejar la imagen y actualizar imagen_url si es necesario
        self.handle_image(instance, imagen)
        return instance
    

class CategoriasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorias
        fields = '__all__'

class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class ProductosSerializerV2(serializers.ModelSerializer):
    class TagsSerializer(serializers.ModelSerializer):
        idCategoria = CategoriasSerializer()
        class Meta:
            model = Tag
            fields = '__all__'
    tags = TagsSerializer(many=True)
    class Meta:
        model = Productos
        fields = '__all__'
        extra_kwargs = {
            'imagen': {'write_only': True},
            'imagen_url': {'read_only': True},
        }

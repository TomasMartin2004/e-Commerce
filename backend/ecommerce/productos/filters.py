import django_filters
from .models import Productos

class CharInFilter(django_filters.BaseInFilter, django_filters.CharFilter):
    # Filtro que permite buscar por varios valores separados por coma, por ejemplo:
    # /productos/?tags=tag1,tag2,tag3
    pass

class ProductosFilter(django_filters.FilterSet):
    precioMinimo = django_filters.NumberFilter(field_name='precio', lookup_expr='gte')
    precioMaximo = django_filters.NumberFilter(field_name='precio', lookup_expr='lte')
    tags = CharInFilter(field_name='tags__nombre')
    categoria = django_filters.CharFilter(field_name='tags__idCategoria__nombre', lookup_expr='icontains')

    class Meta:
        model = Productos
        fields = ['precioMinimo', 'precioMaximo', 'tags', 'categoria']


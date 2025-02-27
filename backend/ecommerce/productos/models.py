from django.db import models
import django_filters

class Productos(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.FloatField()
    stock = models.IntegerField()
    imagen = models.ImageField(upload_to='productos', null=True, blank=True)
    imagen_url = models.URLField(null=True, blank=True, max_length=1024)
    tags = models.ManyToManyField('Tag', related_name='productos')
    popularidad = models.IntegerField(default=0)

    def __str__(self):
        return self.nombre
    

class ProductoVista(models.Model):
    user_id = models.CharField(max_length=50)  
    producto = models.ForeignKey('Productos', on_delete=models.CASCADE)
    visto_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user_id', 'producto')  

class Categorias(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    

class Tag(models.Model):
    idCategoria = models.ForeignKey(Categorias, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre



from django.urls import path
from . import views

urlpatterns = [
    path('productos/', views.ProductosList.as_view()),
    path('productos/<int:pk>/', views.ProductosDetail.as_view()),
    path('productos/destacados/', views.ProductosDestacados.as_view()),
    path('categorias/', views.CategoriasList.as_view()),
    path('categorias/<int:pk>/', views.CategoriasDetail.as_view()),
    path('categorias/<str:cat>/tags/', views.TagsDeCategoria.as_view()),
    path('tags/', views.TagsList.as_view()),
    path('tags/<int:pk>', views.TagsDetail.as_view()),
    path('productos/<int:pk>/v2/', views.ProductosDetailV2.as_view()),
]

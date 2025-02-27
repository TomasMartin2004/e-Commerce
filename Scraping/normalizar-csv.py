from producto import *
import csv
import random

'''
productos_normalizados = [
    {
        id: autogenerado,
        nombre: producto.nombre,
        descripcion: '',
        precio: producto.precio,
        stock: random.randint(0, 100),
        imagen: producto.imagen,
    }, ...
]

tags_normalizados = [
    {
        id: autogenerado,
        nombre: 'tag1',
        categoria_id: 1,
    }, ...
]

productos_tags_normalizados = [
    {
        producto_id
        tag_id
    }, ...

'''

if __name__ == '__main__':
    productos = leer_productos('miro.csv')
    productos_normalizados = []
    tags_normalizados = []
    productos_tags_normalizados = []
    productos_id = 313
    tags_id = 37

    for producto in productos:
        productos_normalizados.append({
            'id': productos_id,
            'nombre': producto.nombre,
            'descripcion': '',
            'precio': producto.precio,
            'stock': random.randint(0, 100),
            'imagen': producto.imagen,
        })
        for tag in producto.tags:
            tag_encontrado = False
            for tag_normalizado in tags_normalizados:
                if tag_normalizado['nombre'] == tag:
                    tag_encontrado = True
                    productos_tags_normalizados.append({
                        'producto_id': productos_id,
                        'tag_id': tag_normalizado['id']
                    })
                    break
            if not tag_encontrado:
                tags_normalizados.append({
                    'id': tags_id,
                    'nombre': tag,
                    'categoria_id': 1
                })
                productos_tags_normalizados.append({
                    'producto_id': productos_id,
                    'tag_id': tags_id
                })
                tags_id += 1
                    
        productos_id += 1




    productos_csv = csv.writer(open('output/productos.csv', 'a', newline='', encoding='utf-8'))
    # productos_csv.writerow(['id','nombre','descripcion', 'precio','stock', 'imagen'])
    for producto in productos_normalizados:
        productos_csv.writerow([
            producto['id'], 
            producto['nombre'], 
            producto['descripcion'], 
            producto['precio'], 
            producto['stock'], 
            producto['imagen']
        ])
    

    tags_csv = csv.writer(open('output/tags.csv', 'a', newline='', encoding='utf-8'))
    # tags_csv.writerow(['id','nombre','categoria_id'])
    for tag in tags_normalizados:
        tags_csv.writerow([
            tag['id'],
            tag['nombre'],
            tag['categoria_id']
        ])
    
    productos_tags_csv = csv.writer(open('output/productos-tags.csv', 'a', newline='', encoding='utf-8'))
    # productos_tags_csv.writerow(['producto_id','tag_id'])
    for producto_tag in productos_tags_normalizados:
        productos_tags_csv.writerow([
            producto_tag['producto_id'],
            producto_tag['tag_id']
        ])


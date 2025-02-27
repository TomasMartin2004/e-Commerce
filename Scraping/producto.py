
class Producto:
    def __init__(self, nombre:str, precio:float, imagen:str, tags:list[str]):
        self.nombre = nombre
        self.precio = precio
        self.imagen = imagen
        self.tags = tags
    
    def _encomillar(self, cadena:str) -> str:
        if ',' in cadena: return f'"{cadena}"'
        return cadena
    
    def __str__(self) -> str:
        return f'{self._encomillar(self.nombre)},{self.precio},{self._encomillar(self.imagen)},"{",".join(self.tags)}"'
    
    def __eq__(self, value: object) -> bool:
        if not isinstance(value, Producto): return False
        return (
            self.nombre == value.nombre and 
            self.precio == value.precio )
    
    def add_tag(self, tag:str):
        self.tags.append(tag)


class ProductoFactory:
    def __init__(self):
        pass
    
    def crear_producto(self, producto) -> Producto:
        return Producto('', 0, '', [])
    

def escribir_productos(productos: list[Producto], archivo:str):
    with open(archivo, 'w', encoding='utf-8') as f:
        for producto in productos:
            f.write(str(producto)+'\n')

def leer_productos(archivo:str) -> list[Producto]:
    productos = []
    with open(archivo, encoding='utf-8') as f:
        for linea in f:
            try:
                partes = linea.strip().split(',')
                productos.append(Producto(
                    partes[0], 
                    float(partes[1]), 
                    partes[2], 
                    [x.replace('"','') for x in partes[3:]]
                    ))
            except:
                print(f'Error en la linea: {linea}')
    return productos
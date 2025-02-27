from ..producto import Producto,ProductoFactory
from ..producto import escribir_productos,leer_productos
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.by import By

class MiroProductoFactory(ProductoFactory):
    def crear_producto(self, producto:WebElement) -> Producto:
        try:
            precio = self.convertir_precio(producto.find_element(By.CSS_SELECTOR, ".price").text)
        except: precio = None

        return Producto(
            nombre=producto.find_element(By.CSS_SELECTOR, ".name.product-title>a").text,
            precio=precio,
            tags=[producto.find_element(By.CSS_SELECTOR, ".category").text],
            imagen=self.obtener_mejor_imagen(producto)
        )
    
    def obtener_mejor_imagen(self, producto: WebElement) -> str:
        imagenes = ' '
        imagenes += producto.find_element(By.CSS_SELECTOR, "img").get_attribute("srcset")
        imagenes = imagenes.split(",")
        imagenes = [imagen.split(" ")[1:] for imagen in imagenes]

        mejor_imagen,mejor_tamano = ["",0]
        for imagen in imagenes:
            tamano = int(imagen[1][:-1])
            if tamano > mejor_tamano:
                mejor_imagen = imagen[0]
                mejor_tamano = tamano

        return mejor_imagen
    
    def convertir_precio(self, precio: str) -> float:
        precio = precio.replace("$","").replace(",","")
        cop = 4127.04
        ars = 1285.00
        return float(precio)*ars/cop
    

from selenium import webdriver

def obtener_paginas() -> list[str]:
    return [f"https://mirodeportes.com/page/{i}/" for i in range(1,9)]


if __name__ == "__main__":
    miro_factory = MiroProductoFactory()
    productos = []
    driver = webdriver.Chrome()
    for url in obtener_paginas():
        driver.get(url)
        driver.implicitly_wait(2)
        productos += [miro_factory.crear_producto(producto) for producto in driver.find_elements(By.CSS_SELECTOR, ".product-small.box")]
    
    escribir_productos(productos, "Scraping/miro.csv")
        

    driver.quit()
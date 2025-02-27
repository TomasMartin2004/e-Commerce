from ..producto import Producto,ProductoFactory
from ..producto import escribir_productos,leer_productos
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.by import By
from selenium import webdriver

'''
document.querySelectorAll('.js-item-product')

document.querySelectorAll('.desktop-list-subitems>li')
  li.js-item-desktop.nav-item-desktop.nav-item
    a.nav-list-link (text y href)
  li.js-item-desktop.nav-item-desktop.nav-item.item-with-subitems
    a.nav-list-link (text y href)
    ul.list-subitems
        li.js-item-desktop>a.nav-list-link (text y href)
    
'''     

def obtener_paginas(elementos:list[WebElement]) -> list[dict]:
    '''devuelve [[tags], url]'''
    paginas = []
    for elemento in elementos:
        if elemento.get_attribute('class').find('item-with-subitems') != -1:
            # Es un elemento con subitems
            tag_padre = elemento.find_element(By.CSS_SELECTOR, 'a').get_attribute('textContent').replace('\n','')
            subitems = elemento.find_elements(By.CSS_SELECTOR, 'ul.list-subitems>li>a')
            for subitem in subitems:
                paginas.append({
                    'tags':[tag_padre, subitem.get_attribute('textContent')], 
                    'url':subitem.get_attribute('href')
                    })

        else:
            # Es un elemento sin subitems
            aux = elemento.find_element(By.CSS_SELECTOR, 'a')
            paginas.append({
                'tags':[aux.get_attribute('textContent')], 
                'url':aux.get_attribute('href')
                })
        
    return paginas
            
                                                                                                                                       
class WhiteProductoFactory(ProductoFactory):
    def crear_producto(self, producto:WebElement,tags:list=[]) -> Producto:
        try:
            p= Producto (
                nombre=producto.find_element(By.CSS_SELECTOR, ".item-description>a").get_attribute('title'),
                precio=self.convertir_precio(
                    producto.find_element(By.CSS_SELECTOR, ".item-price").text),
                tags=tags,
                imagen= self.obtener_mejor_imagen(producto) )
            
            print(p)
            return p
        except:
            print("Error al crear el producto")

    def convertir_precio(self, precio: str) -> float:
        return float(precio.replace("$","").replace(".","").replace(",","."))
    
    def obtener_mejor_imagen(self, producto: WebElement) -> str:
        img_container = producto.find_element(By.CSS_SELECTOR, ".position-relative img")
        img_src_lowres = 'https:' + img_container.get_attribute("data-srcset").split(" ")[0]
        img = img_src_lowres.replace("-240-0.webp","-1024-1024.webp")
        return img
    
def escribir_tags(paginas: list[dict], archivo:str):
    with open(archivo, 'w', encoding='utf-8') as f:
        f.write("categoria,tag\n")
        for pagina in paginas:
            if len(pagina['tags']) == 1:
                f.write(f"{pagina['tags'][0]},{pagina['tags'][0]}\n")
            elif len(pagina['tags']) == 2:
                f.write(f"{pagina['tags'][0]},{pagina['tags'][1]}\n")


if __name__ == "__main__":
    driver = webdriver.Chrome()
    driver.get("https://www.whitesalud.com.ar/")
    driver.implicitly_wait(1)
    paginas = obtener_paginas(driver.find_elements(By.CSS_SELECTOR, ".desktop-list-subitems>li"))
    [print(pagina) for pagina in paginas]

    white_factory = WhiteProductoFactory()
    productos = []
    for pagina in paginas:
        driver.get(pagina['url'])
        driver.implicitly_wait(3)
        productos += [white_factory.crear_producto(producto, pagina['tags']) for producto in driver.find_elements(By.CSS_SELECTOR, ".js-item-product")]
    driver.quit()
    
    escribir_productos(productos, "Scraping/white-salud.csv")
    escribir_tags(paginas, "Scraping/white-salud-tags.csv")





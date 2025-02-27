# Scraping de Ecommerce
La finalidad de estos scripts es la de obtener datos de productos reales para el posterior mockup en la BBDD.

## Como ejecutarlo
Supongamos que queremos hacer scraping de los productos en la web de _mirodeportes.com_. 
Desde la raiz del repositorio, ejecutar el siguiente comando (se da por hecho que se tiene python3 instalado y la biblioteca selenium)

```bash
python -m Scraping.miro-deportes.scraping
```

Para hacer scraping de _whitesalud.com.ar_ el comando a ejecutar sería:
```bash
python -m Scraping.white-salud.scraping
```


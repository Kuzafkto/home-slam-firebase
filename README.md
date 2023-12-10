# Home Slam

Home slam es la mitad del proyecto de tfg y el trabajo para entregar a diciembre de Acceso a Datos, es un crud de jugadores y equipos

La app cuenta con un sistema para que los usuarios se registren y creen sus propios jugadores, luego con esos mismos jugadores podran crear sus propios equipos.


## Tecnologías usadas:

FrontEnd: 
Angular + Ionic + Capacitor.

BackEnd:
Strapi desplegado de forma pública en la red.

## Servicios
### Autenticación

Un servicio de autenticación con opciones para hacer login, logout y registro.
### Acceso a datos
Un servicio por cada modelo de datos de la base de datos, jugadores y equipos. Se pueden hacer operaciones crud sobre cada uno de ellos.

### ApiService
Un servicio de api que contiene la lógica necesaria para comunicarse con el backend de Strapi.

## Traducción
Se implementa un servicio de traducción para poder cambiar el idioma de los elementos de la página a español-ingles/ingles-español

## Directivas usadas
Una directiva personalizada llamada position image para asociar posiciones sus imagenes.

Utilización de ngIf, ngFor y ngClass

## Pipes

Contiene una pipe personalizada para acortar strings dependiendo de la longitud ingresada como parametro.

## Componentes

### La app utliza los siguientes componentes:

Formularios : Login, register, crear equipo (team-detail), crear jugadores (player-detail)

Una navbar app-toolbar

Un ControlValueAccessor que es un selector de posiciones para el jugador

## Páginas

La app cuenta con:

Una página de login

Una página de registro

Una página de horme

Una página de about.

Una página por cada modelo de datos

(se implementa una guarda para que no se pueda acceder sin estar autenticado)

## Interfaz de usuario
Tu app debe es responsive en casi su totalidad por ciertos fallos a la hora de adaptar ciertos componentes a las tecnologías moviles.




Para el backend está publicado a traves de render la app esta subida a Netlify a traves del siguiente enlace

## Colores principalmente usados

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Verde cesped | ![#005625](https://via.placeholder.com/10/005625?text=+) #005625 |
| Marron tierra | ![#7e4d32](https://via.placeholder.com/10/7e4d32?text=+) #7e4d32 |
| Blanco | ![#000000](https://via.placeholder.com/10/000000?text=+) #000000 |
| Negro | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |


## 🔗 Links
[![netlify](https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/qbmz3pgveogtv7np8zyu)](https://homeslam.netlify.app/)

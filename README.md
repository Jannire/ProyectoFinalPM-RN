# Proyecto PM - Final

## Integrantes
* Jannire Ashley Trujillo Delgado
* Johan Andres Oblitas Mantilla
* Alejandro Gomez Lopez
* 4
* 5
* 6

## Instalación React Native

### Instalación NodeJS 
Para poder iniciar a crear aplicaciones con React, se debe de tener instalado NodeJS (https://nodejs.org/en/).
Descargar versión LTS. 

![image](https://github.com/Jannire/ProyectoFinalPM-RN/assets/88001855/373c6aca-c4bb-404c-bdca-2f9c98ccd03e)

Ejecutar el archivo descargado para abrir el wizard de instalación

![image](https://github.com/Jannire/ProyectoFinalPM-RN/assets/88001855/6cf697c7-a5f6-4fe7-98e5-bac51187cc9a)

Seguir las indicaciones del instalador y escoger la ruta donde se instalará NodeJS.

![image](https://github.com/Jannire/ProyectoFinalPM-RN/assets/88001855/9fc2d848-abce-48ec-89e8-a1eeb1e6b4d6)

Para revisar la instalación correcta y la versión instalada utilizar el siguiente comando en la consola.
```bash
node --version
```

### Instalación Expo Go
Al contar con NodeJS, se debe ejecutar el siguiente comando en la carpeta donde se desea iniciar el nuevo proyecto de React Native (móvil).

```bash
npx create-expo-app .
```

Al finalizar de crear la plantilla de la aplicación utilizar el siguiente comando para iniciar la aplicación de manera remota.
```bash
npx expo start
```
![image](https://github.com/Jannire/ProyectoFinalPM-RN/assets/88001855/44da0e13-49cf-4a60-b79f-61b74fbc9829)

(Documentación: https://reactnative.dev/docs/environment-setup)

### Instalación de Aplicativo Móvil Expo Go

Para poder visualizar la aplicación creada localmente, se debe descargar la aplicación Expo Go en Android. 
<img src="https://github.com/Jannire/ProyectoFinalPM-RN/assets/88001855/28104b74-7b9a-49e4-8715-cc1a90923ec7"  width="300"/>

Dentro de la aplicación, se escanea el QR generado en el paso anterior. Ahora la aplicación esta conectada de manera remota al celular con Fast Refresh. 

<img src="https://github.com/Jannire/ProyectoFinalPM-RN/assets/88001855/3caa1285-b0d5-4eb0-ad0a-6328719e5846" width="200"/> 

Para acceder al menú de developer en la aplicación solo se debe sacudir el celular.

<img src="https://github.com/Jannire/ProyectoFinalPM-RN/assets/88001855/07ac9a80-3355-49d8-8439-eb0aa4d5b5c6" width="200"/>


## Diagrama de Despliegue
WIP


## Requerimientos no funcionales
A continuación, se detallan los requisitos no funcionales del sistema, los cuales establecen los límites y condiciones que guían el diseño e implementación integral de la aplicación ULima Gimnasio. Estos requisitos son esenciales para garantizar un rendimiento óptimo, seguridad robusta y una experiencia de usuario efectiva.

### Rendimiento:
* **Tiempo de respuesta**: El tiempo de respuesta de la aplicación debe ser rápido y eficiente, especialmente al cargar datos desde el servidor o al realizar acciones críticas.
* **Consumo de recursos**: La aplicación debe ser eficiente en cuanto al uso de la memoria y la energía de la batería del dispositivo.
### Seguridad:
* **Autenticación y autorización**: Garantizar que la autenticación sea segura y que solo los usuarios autorizados puedan acceder a funciones específicas de la aplicación.
* **Protección de datos**: Asegurar la confidencialidad y la integridad de los datos del usuario, tanto en el dispositivo como durante la transmisión de datos hacia y desde el servidor.
### Escalabilidad:
* **Número de usuarios concurrentes**: La aplicación debe ser capaz de manejar un número aceptable de usuarios concurrentes sin degradación del rendimiento.
* **Escalabilidad del servidor**: El servidor backend en Replit debe ser capaz de manejar un crecimiento en la cantidad de datos y usuarios sin pérdida de rendimiento.
### Disponibilidad:
* **Tiempo de actividad**: La aplicación debe tener un alto tiempo de actividad para garantizar que los usuarios puedan acceder a ella cuando lo necesiten.
* **Respaldos y recuperación**: Implementar mecanismos de respaldo regular y procedimientos de recuperación para proteger los datos en caso de fallos.
### Usabilidad:
* **Interfaz de usuario intuitiva**: Garantizar que la interfaz de usuario sea fácil de entender y de usar para un amplio rango de usuarios.
### Compatibilidad:
* **Compatibilidad con dispositivos**: Asegurar que la aplicación funcione de manera consistente en una variedad de dispositivos Android.
* **Compatibilidad con versiones de Android**: Garantizar que la aplicación sea compatible con varias versiones de Android para llegar a un público más amplio.
### Mantenibilidad:
* **Facilidad de actualización**: La aplicación debe ser diseñada de manera que las actualizaciones se puedan realizar de manera sencilla, sin interrupciones significativas para los usuarios.
* **Registro y monitoreo**: Implementar registros detallados y mecanismos de monitoreo para facilitar la detección y resolución de problemas.
### Interoperabilidad:
* **Integración de plataformas**: Asegurar que la aplicación pueda integrarse con otras plataformas o servicios relacionados con fitness, si es necesario.



## Descripción de los casos de uso

**Crear Usuario**: El aplicativo contará con una pantalla de creación de usuario, la cual almacenará los datos ingresados en una base de datos.

[![Create-Acc.png](https://i.postimg.cc/K8LqtPcg/Create-Acc.png)](https://postimg.cc/jDx4bJ7s)

**Iniciar Sesión**: Se contará con una pantalla para el Login, la cual recibirá las credenciales de usuario y contraseña, estos datos se validarán y de ser ingresados correctamente, darán acceso al usuario a su respectiva cuenta.

[![Login.png](https://i.postimg.cc/sgR866NJ/Login.png)](https://postimg.cc/rKQQzJcd)

**Cambiar Contraseña**: El usuario contará con una pantalla para cambiar su contraseña, la cual recibirá los datos de "correo electronico" y "DNI", estos datos se validarán y de ser correctos, se enviará un correo.

[![Reset-Pass.png](https://i.postimg.cc/TYjQwRtr/Reset-Pass.png)](https://postimg.cc/fJLYqhnL)

**Visualizar Perfil**: Desde una pestaña, el usuario podrá acceder a la pantalla del perfil, donde se muestran datos del usuario, tales como teléfono, correo y finalmente, botones para "editar información" y "cerrar sesión".

[![Perfil.png](https://i.postimg.cc/NFkNWYV7/Perfil.png)](https://postimg.cc/4HnbcCXm)

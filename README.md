# 💳 Billetera Virtual - Frontend React

Este proyecto representa el **cliente web** de la billetera virtual. Desarrollado con **React JS**, se conecta al backend REST, que a su vez se comunica con el servicio SOAP (único acceso a base de datos).

---

## 🛠️ Tecnologías Utilizadas

- React JS
- React-Bootstrap / Bootstrap
- Axios
- Docker (modo desarrollo, con hot-reload)
- Docker Compose

---

## 🚀 Instalación y Puesta en Marcha

```bash
# Clona el repositorio
git clone https://github.com/MikeRider27/billetera-virtual.git
cd billetera-virtual
```

Copia el archivo `.env.example` a `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

```env
REACT_APP_API_URL=http://localhost:9001/api
```

> ⚠️ `REACT_APP_API_URL` la usa el navegador (el bundle de React corre en tu máquina, no dentro de un contenedor), así que tiene que ser una URL alcanzable desde ahí — `localhost:9001`, no `host.docker.internal:9001` (eso solo se resuelve *dentro* de contenedores Docker). Asegurate de que `rest-wallet` esté publicado en ese puerto.

---

### ▶️ Levantar el entorno

```bash
docker compose up --build -d
```

El contenedor corre en modo desarrollo (`npm start` con hot-reload); el código se monta como volumen, así que los cambios se reflejan sin reconstruir la imagen.

Abre la aplicación en tu navegador en:

```
http://localhost:3000
```

---

## 📋 Funcionalidades

- 🔐 Login con documento + contraseña (sesión persistida en `localStorage`)
- 📄 Registro de cliente (con contraseña)
- 💰 Recarga de saldo
- 🛒 Generación y confirmación de compra
- 📊 Consulta de saldo
- ⏳ Indicadores de carga mientras se realizan peticiones

---

## 🔐 Sesión

Sin sesión iniciada, la app solo muestra **Login** (con un link a **Registro** para crear cuenta). Al loguearse, `rest-wallet` devuelve un token que se guarda en `localStorage` (`src/session.js`) y viaja automáticamente como header `Authorization: Bearer <token>` en cada request (interceptor en `src/api/api.js`) — por eso Recargar, Generar Compra y Consultar Saldo ya no piden `documento`/`celular`: la identidad sale de la sesión. "Cerrar sesión" limpia el `localStorage` y vuelve a mostrar el Login.

---

## 📁 Estructura del Proyecto

```
src/
├── api/                 # Configuración Axios (cliente REST + interceptor de token)
├── session.js           # Guardar/leer/borrar la sesión en localStorage
├── components/          # Componentes individuales por funcionalidad
│   ├── Login.js
│   ├── RegistroCliente.js
│   ├── RecargarBilletera.js
│   ├── GenerarCompra.js
│   └── ConsultarSaldo.js
├── App.js               # Gating de sesión, navegación y logout
└── index.js             # Punto de entrada React
```

---

## ✅ Buenas Prácticas

- Comunicación REST mediante Axios (con timeout configurado).
- Separación por componentes, UI consistente con React-Bootstrap (Card, Form, Alert).
- Formularios accesibles (labels asociados a cada campo, no solo placeholders).
- Los mensajes de éxito/error reflejan el `codigo` real que devuelve el backend, no solo si el HTTP respondió 200.
- Los errores de red/servidor muestran el mensaje real devuelto por la API cuando está disponible.
- Dockerfile en modo desarrollo (sin pasos de build que después no se usan).

---

## 🔗 Proyectos Relacionados

- [🔧 SOAP Wallet Service](https://github.com/MikeRider27/soap-wallet)
- [🌐 REST Wallet API](https://github.com/MikeRider27/rest-wallet)

---

## 👨‍💻 Autor

**Miguel Villalba**  
Desarrollador Full Stack - Prueba Técnica ePayco  
✉️ mike.mavc27@gmail.com

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.

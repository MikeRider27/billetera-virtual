# 💳 Billetera Virtual - Frontend React

Este proyecto representa el **cliente web** de la billetera virtual. Desarrollado con **React JS**, se conecta al backend REST, que a su vez se comunica con el servicio SOAP (único acceso a base de datos).

---

## 🛠️ Tecnologías Utilizadas

- React JS
- Axios
- Docker
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

> 📝 Asegúrate de que el puerto `9001` coincida con el servicio REST en tu máquina.
> `host.docker.internal` permite que el contenedor acceda al host desde Docker.

---

### ▶️ Levantar el entorno

```bash
docker compose up --build -d
```

Abre la aplicación en tu navegador en:

```
http://localhost:3000
```

---

## 📋 Funcionalidades

- 📄 Registro de cliente
- 💰 Recarga de saldo
- 🛒 Generación y confirmación de compra
- 📊 Consulta de saldo
- ⏳ Indicadores de carga mientras se realizan peticiones

---

## 📁 Estructura del Proyecto

```
src/
├── api/                 # Configuración Axios (cliente REST)
├── components/          # Componentes individuales por funcionalidad
│   ├── RegistroCliente.js
│   ├── RecargarBilletera.js
│   ├── GenerarCompra.js
│   └── ConsultarSaldo.js
├── App.js               # Estructura principal y navegación
└── index.js             # Punto de entrada React
```

---

## ✅ Buenas Prácticas

- Comunicación REST mediante Axios.
- Separación por componentes.
- Mensajes claros al usuario.
- Dockerización lista para producción/despliegue.

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

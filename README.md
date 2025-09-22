# 🛍️ Tienda Online - Plataforma E-commerce para PYMES

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)](https://mysql.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-brightgreen?style=for-the-badge&logo=github)](https://github.com/rodrigoav748-ctrl/Tienda_online)

## 📋 Tabla de Contenidos
- [🎯 Contexto y Problemática](#-contexto-y-problemática)
- [🚀 Características Principales](#-características-principales)
- [🛠️ Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [📦 Requisitos del Sistema](#-requisitos-del-sistema)
- [⚙️ Instalación y Configuración](#-instalación-y-configuración)
- [🏗️ Estructura del Proyecto](#-estructura-del-proyecto)
- [👥 Roles de Usuario](#-roles-de-usuario)
- [🔒 Seguridad](#-seguridad)
- [📱 Demo y Capturas](#-demo-y-capturas)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)

## 🎯 Contexto y Problemática!

El e-commerce ha transformado el mercado moderno, pero las **Pequeñas y Medianas Empresas (PYMES)** enfrentan barreras significativas:

- **Altos costos** de implementación
- **Complejidad técnica** de las plataformas existentes
- **Falta de presencia digital** efectiva
- **Dificultad para escalar** y gestionar pedidos

**Tienda Online** nace como una solución accesible, robusta y fácil de usar que democratiza el acceso al comercio electrónico para PYMES.

## 🚀 Características Principales

### 🔐 Autenticación y Gestión de Usuarios
- Registro seguro con email y contraseña
- Sistema de recuperación de contraseñas
- Roles diferenciados (Cliente/Administrador)
- Gestión de perfiles de usuario

### 🏪 Catálogo Inteligente
- Búsqueda avanzada de productos
- Filtrado por categoría, precio y disponibilidad
- Gestión completa de productos (CRUD)
- Imágenes de alta calidad

### 🛒 Carrito y Checkout
- Carrito de compras persistente
- Modificación de cantidades en tiempo real
- Cálculo automático de subtotal e impuestos
- Proceso de checkout optimizado

### 📦 Gestión de Pedidos
- Historial completo de pedidos
- Estados personalizables (Pendiente, Enviado, Entregado)
- Panel de administración para gestión
- Notificaciones de estado

## 🛠️ Tecnologías Utilizadas

| Capa | Tecnología |
|------|------------|
| **Frontend** | Next.js 15, React 18, CSS Modules |
| **Backend** | Next.js API Routes, Node.js |
| **Base de Datos** | MySQL 8.0 |
| **Autenticación** | NextAuth.js, JWT |
| **Estilos** | CSS Modules, Responsive Design |
| **Control de Versiones** | Git, GitHub |
| **Despliegue** | Vercel  |

## 📦 Requisitos del Sistema

### ✅ Requisitos Funcionales

#### 🔐 Registro y Autenticación
1. Registro con email y contraseña
2. Inicio y cierre de sesión seguro
3. Recuperación de contraseñas
4. Roles de usuario (Cliente/Admin)

#### 🏪 Gestión de Catálogo
5. Lista de productos con imágenes y precios
6. Búsqueda por nombre de producto
7. Filtrado por categoría, precio y disponibilidad
8. CRUD completo para administradores

#### 🛒 Funcionalidad de Carrito
9. Agregar/eliminar productos del carrito
10. Modificar cantidades en carrito
11. Resumen con subtotal e impuestos
12. Finalizar compra y generar pedidos

#### 📦 Gestión de Pedidos
13. Historial de pedidos por usuario
14. Panel de administración de pedidos
15. Actualización de estados de pedido

### 🚀 Requisitos No Funcionales

#### ⚡ Rendimiento
- **Carga en <3 segundos** en conexión banda ancha
- **Optimización de imágenes** y assets
- **Caching** estratégico implementado

#### 📱 Usabilidad
- **Interfaz intuitiva** y consistente
- **Design responsive** (mobile-first)
- **Experiencia de usuario** optimizada

#### 🔒 Seguridad
- **Contraseñas hasheadas** y salteadas
- **Protección contra SQL Injection**
- **Prevención de ataques XSS**
- **Conexiones HTTPS** obligatorias

#### 📈 Escalabilidad
- **Arquitectura escalable**
- **Base de datos optimizada**
- **Manejo de alta concurrencia**

#### 🛠️ Mantenibilidad
- **Código bien documentado**
- **Patrones de diseño implementados**
- **Testing coverage** adecuado

## ⚙️ Instalación y Configuración

### Prerrequisitos
```bash
Node.js 18+ 
MySQL 8.0+
npm o yarn

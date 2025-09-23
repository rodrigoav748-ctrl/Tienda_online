
# 🛍️ Tienda Online - Plataforma E-commerce para PYMES

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)](https://www.mysql.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-brightgreen?style=for-the-badge&logo=github)](https://github.com/rodrigoav748-ctrl/Tienda_online)

---

## 📋 Tabla de Contenidos
- [🎯 Contexto](#-contexto)
- [🚀 Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologías](#-tecnologías)
- [📦 Requisitos](#-requisitos)
- [⚙️ Instalación y Ejecución Local](#-instalación-y-ejecución-local)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [👥 Roles de Usuario](#-roles-de-usuario)
- [🔒 Seguridad](#-seguridad)
- [📄 Licencia](#-licencia)

---

## 🎯 Contexto

Esta aplicación web está diseñada para pequeñas y medianas empresas (PYMES) que desean vender productos en línea. Permite gestionar usuarios, productos, categorías, pedidos y contacto con clientes, todo de manera sencilla y segura.

---

## 🚀 Funcionalidades

- **Autenticación de usuarios**
  - Registro y login
  - Roles diferenciados (cliente/admin)
- **Gestión de productos y categorías**
  - CRUD completo de productos y categorías
  - Visualización de catálogo con filtrado
- **Pedidos**
  - Carrito de compras
  - Generación de pedidos
  - Historial de pedidos
- **Contacto**
  - Formulario para mensajes de contacto
- **Seguridad**
  - Contraseñas hasheadas con bcrypt
  - Validación de campos y control de errores

---

## 🛠️ Tecnologías

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js 15, React 18, CSS Modules |
| Backend | Next.js API Routes, Node.js |
| Base de datos | MySQL 8.0 |
| ORM | Prisma |
| Autenticación | NextAuth.js, JWT |
| Control de versiones | Git, GitHub |

---

## 📦 Requisitos

- Node.js 18+
- MySQL 8.0+
- npm o yarn
- (Opcional) Visual Studio Code u otro editor

---


npm install
# o
yarn install


-- Crear base de datos
CREATE DATABASE tienda_online_mvp;

-- Ejecutar script de tablas y datos de prueba incluido en prisma/schema.sql
-- Puedes usar  el .sql que esta en el repositorio

DATABASE_URL="mysql://root:TU_PASSWORD@127.0.0.1:3306/tienda_online_mvp"
NEXTAUTH_SECRET="una_cadena_segura_larga"
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="otra_cadena_segura"


npx prisma db push
npx prisma generate
Ejecutar la aplicación
npm run dev
# o
yarn dev


La aplicación estará disponible en http://localhost:3000.


## ⚙️ Instalación y Ejecución Local

### 1. Clonar repositorio
```bash
git clone https://github.com/rodrigoav748-ctrl/Tienda_online.git
cd Tienda_online

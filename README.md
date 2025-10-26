# SafeCity App

Aplicación web desarrollada con **React** y **Vite** para la gestión de usuarios, incidentes y categorías. Implementa **autenticación**, **rutas protegidas** y **modularización por contextos**.

## Características

- Sistema de **login/logout** con JWT y almacenamiento en localStorage.
- **Rutas públicas y protegidas** según el estado de autenticación.
- Gestión de usuarios, incidentes y categorías.
- **Validación de formularios** con **Zod** y react-hook-form.
- **Reset de contraseña** via email mediante token.
- Notificaciones con **react-hot-toast**.
- Diseño responsive y modular.

## Tecnologías

- **Frontend:** React, Vite, TailwindCSS, react-icons, react-router-dom
- **State Management:** React Context
- **Form Validation:** Zod + react-hook-form
- **Notificaciones:** react-hot-toast
- **Fetch API:** para consumir endpoints de backend

## Instalación

```bash
git clone https://github.com/YonierGM/safeCity
cd safeCity
npm install
npm run dev

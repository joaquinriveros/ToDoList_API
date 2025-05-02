📝 To Do List - DevHype

Aplicación web de gestión de tareas desarrollada con React, TypeScript y Vite.

🚀 Características

- ✅ Crear, editar y eliminar tareas
- 📌 Visualización de tareas por estado
- 💾 Persistencia de datos usando `json-server`
- 🎨 Estilos modulares con CSS Modules
- ⚡️ Vite como bundler para una experiencia de desarrollo ultra rápida

🛠️ Tecnologías

- React
- TypeScript
- Vite
- CSS Modules
- json-server (para simular backend REST)
- ESLint

📌 Nota importante: Este proyecto NO incluye la carpeta `node_modules`, por lo tanto, es obligatorio ejecutar `npm install` antes de iniciar el servidor.

📦 Instalación

1. Clona este repositorio:
   ```
   _ git clone https://github.com/JoseFausti/TodoList_DevHype-C4.git
   _ cd TodoList_DevHype-C4/todoList_DevHype
   ```
2. Instala las dependencias:
   ```
   npm install
   ```
3. Ejecuta la app en modo desarrollo:
   ```
   npm run dev
   ```

4. Levanta el backend simulado con `json-server`:
   ```
   npm run db
   ```
📁 Estructura del Proyecto
```
todoList_DevHype/
├── node_modules/            # Dependencias del proyecto (generado con npm install)
├── public/                  # Archivos públicos como imágenes
├── src/                     # Código fuente de la aplicación
│   ├── assets/              # Recursos como logos o íconos
│   ├── components/          # Componentes organizados por pantallas y UI
│   ├── data/                # Controladores para datos
│   ├── hooks/               # Custom hooks de React
│   ├── http/                # Módulos para manejo de peticiones
│   ├── routes/              # Definición de rutas
│   ├── store/               # Estado global (stores)
│   ├── types/               # Tipado y esquemas
│   ├── utils/               # Utilidades generales
│   ├── App.tsx              # Componente raíz
│   └── main.tsx             # Punto de entrada
├── db.json                  # Base de datos simulada (json-server)
├── package.json             # Configuración de dependencias y scripts
├── vite.config.ts           # Configuración de Vite

```
👨‍💻 Autor

Desarrollado por José Fausti y Joaquín Riveros - DevHype

# ProjectBlog — Backend

API REST del proyecto BlogApp desarrollado en .NET 9 con Clean Architecture y patrón Repository. 
Permite la publicación y gestión de posts y comentarios.

## Tecnologías

- .NET 9
- ASP.NET Core Web API
- Entity Framework Core 9
- SQL Server
- Swagger 

## Arquitectura
El proyecto sigue los principios de **Clean Architecture** con separación clara de responsabilidades:

CleanArchitecture.Domain         # Entidades, interfaces y excepciones
CleanArchitecture.Application    # DTOs, servicios y casos de uso
CleanArchitecture.Infrastructure # DbContext, repositorios y migraciones
CleanArchitecture.API            # Controllers, middlewares y configuración

### Flujo de dependencias
API → Application → Domain
↑
Infrastructure

## Requisitos previos

- .NET 9 SDK
- SQL Server
- Visual Studio 2022 o superior

## Configuración

1. Clona el repositorio:
git clone https://github.com/DavidRipFernandez/Tecorp.git


2. Navega a la carpeta del backend:
cd Backend


3. Configura la cadena de conexión en `src/CleanArchitecture.API/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=TU_SERVIDOR;Database=Tecorp;User Id=TU_USUARIO;Password=TU_PASSWORD;TrustServerCertificate=True;"
  }
}
```

4. Aplica las migraciones para crear las tablas:
Update-Database -Project CleanArchitecture.Infrastructure -StartupProject CleanArchitecture.API

5. Inicia el proyecto desde Visual Studio o con:
dotnet run --project src/CleanArchitecture.API

6. Abre Swagger en:
http://localhost:5239/swagger/index.html

## Endpoints disponibles

### Posts

| `GET`  | `/api/v1/posts`      | Lista posts paginados |
| `POST` | `/api/v1/posts`      | Crea un nuevo post    |
| `GET`  | `/api/v1/posts/{id}` | Detalle de un post    |

### Comentarios
 

| `GET`  | `/api/v1/posts/{id}/comments` | Lista comentarios de un post |
| `POST` | `/api/v1/posts/{id}/comments` | Crea un comentario           |

## Estructura de respuestas

### Éxito
```json
{
  "success": true,
  "data": { },
  "meta": { "page": 1, "limit": 10, "total": 1 }
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "DOMAIN_ERROR",
    "message": "El username es requerido."
  }
}
```

## Reglas de negocio

| Regla | Valor |
|-------|-------|
| Longitud máxima de post | 1000 caracteres |
| Longitud máxima de comentario | 1000 caracteres |
| Visualización truncada | 140 caracteres |
| Formato de email | RFC 5322 |
| Ordenamiento | Fecha descendente |

## Migraciones

### Crear una nueva migración
```bash
Add-Migration NombreMigracion -Project CleanArchitecture.Infrastructure -StartupProject CleanArchitecture.API
```

### Aplicar migraciones
```bash
Update-Database -Project CleanArchitecture.Infrastructure -StartupProject CleanArchitecture.API
```

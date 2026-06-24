import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Inventario Restaurante",
      version: "1.0.0",
      description: "API REST para gestión de inventario de un restaurante",
    },
    servers: [
      {
        url: "https://backend-restaurante-three.vercel.app/",
        description: "Servidor de produccion",
      },
    ],
    tags: [
      {
        name: "Usuarios",
        description:
          "Operaciones para registrar, autenticar y consultar datos de usuarios",
      },
      {
        name: "Categorías",
        description: "Operaciones para gestionar categorías de productos",
      },
      {
        name: "Productos",
        description: "Operaciones para gestionar productos en el inventario",
      },
      {
        name: "Inventario",
        description:
          "Operaciones para registrar y consultar movimientos de inventario",
      },
      {
        name: "Reportes",
        description: "Operaciones para obtener reportes del inventario",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Category: {
          type: "object",
          properties: {
            id: { type: "string", example: "1" },
            name: { type: "string", example: "bebidas" },
            description: {
              type: "string",
              example: "jugos naturales, gaseosas y aguas",
            },
            imagen_link: {
              type: "string",
              example: "uploads/category-12345.png",
            },
            status: { type: "boolean", example: true },
            created_at: {
              type: "string",
              format: "date-time",
              example: "2026-06-22T14:00:00Z",
            },
            updated_at: {
              type: "string",
              format: "date-time",
              example: "2026-06-22T14:00:00Z",
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "string", example: "1" },
            category_id: { type: "string", example: "1" },
            user_id: {
              type: "string",
              example: "5f47c8e2-9d3a-4a7a-bdce-1234567890ab",
            },
            name: { type: "string", example: "coca cola" },
            description: { type: "string", example: "Bebida gaseosa de cola" },
            stock: { type: "number", example: 20 },
            price: { type: "number", example: 1.5 },
            unit: { type: "string", example: "unidad" },
            imagen_link: {
              type: "string",
              example: "uploads/product-12345.png",
            },
            status: { type: "boolean", example: true },
            created_at: {
              type: "string",
              format: "date-time",
              example: "2026-06-22T14:00:00Z",
            },
            updated_at: {
              type: "string",
              format: "date-time",
              example: "2026-06-22T14:00:00Z",
            },
          },
        },
        Inventory: {
          type: "object",
          properties: {
            id: { type: "string", example: "1" },
            user_id: {
              type: "string",
              example: "5f47c8e2-9d3a-4a7a-bdce-1234567890ab",
            },
            product_id: { type: "string", example: "1" },
            type: {
              type: "string",
              enum: ["entrada", "salida"],
              example: "entrada",
            },
            quantity: { type: "number", example: 5 },
            reason: { type: "string", example: "Recepción de mercadería" },
            created_at: {
              type: "string",
              format: "date-time",
              example: "2026-06-22T14:00:00Z",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "1" },
            name: { type: "string", example: "Juan" },
            surname: { type: "string", example: "Pérez" },
            email: { type: "string", example: "juan.perez@mail.com" },
            rol: { type: "string", example: "admin" },
            number_phone: { type: "string", example: "3123456789" },
            address: { type: "string", example: "Calle 123, Medellín" },
            imagen_link: { type: "string", example: "uploads/user-12345.png" },
            status: { type: "boolean", example: true },
            created_at: {
              type: "string",
              format: "date-time",
              example: "2026-06-22T14:00:00Z",
            },
            updated_at: {
              type: "string",
              format: "date-time",
              example: "2026-06-22T14:00:00Z",
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./dist/routes/*.js", "./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);

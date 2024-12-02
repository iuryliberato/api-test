import { createZodSchema } from 'zod-to-openapi';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { z } from 'zod';

// Zod schema for user creation
const createUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    age: z.number().positive('Age must be a positive number').optional(),
});

// Generate OpenAPI schema from Zod schema
const userSchemaOpenAPI = createZodSchema(createUserSchema);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Docs POC',
            version: '1.0.0',
            description: 'API documentation with Zod validation',
        },
        servers: [
            { url: 'http://localhost:3000/api' },
        ],
        components: {
            schemas: {
                CreateUserRequest: userSchemaOpenAPI,
            },
        },
    },
    apis: ['./src/routes/*.ts'], // Path to route files for documentation
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };

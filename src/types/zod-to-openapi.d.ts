declare module 'zod-to-openapi' {
  import { ZodSchema } from 'zod';

  export interface OpenAPISchemaObject {
      type?: string;
      properties?: Record<string, OpenAPISchemaObject>;
      items?: OpenAPISchemaObject;
      required?: string[];
  }

  export interface OpenAPIComponents {
      schemas: Record<string, OpenAPISchemaObject>;
  }

  export function createZodSchema(schema: ZodSchema): OpenAPISchemaObject;
}

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import { swaggerUi, swaggerSpec } from './swagger';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', routes);

export default app;


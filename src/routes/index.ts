import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';


const router = Router();

// Zod schema for user creation
const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  age: z.number().positive('Age must be a positive number').optional(), // Apply `positive` before `optional`
});

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API Docs POC!' });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Validate request body using Zod and return a response.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 123
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     age:
 *                       type: number
 *                       example: 30
 */


router.post('/users', validate(createUserSchema), (req, res) => {
  const { name, email, age } = req.body;

  res.status(201).json({
      message: 'User created successfully!',
      data: {
          id: 123,
          name,
          email,
          age: age || null,
      },
  });
});
export default router;

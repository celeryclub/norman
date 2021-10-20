import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Coffee } from '../models/Coffee';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const coffeeRepository = getRepository(Coffee);
  const coffee = coffeeRepository.create(req.body);

  try {
    await coffeeRepository.save(coffee);
  } catch (e) {
    res.status(400);
    res.json({ error: e.sqlMessage });
  }

  res.status(201);
  res.json(coffee);
});

router.get('/', async (req: Request, res: Response) => {
  const coffeeRepository = getRepository(Coffee);
  const coffees = await coffeeRepository.find();

  res.json(coffees);
});

export default router;

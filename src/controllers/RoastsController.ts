import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Coffee } from '../models/Coffee';
import { Roast } from '../models/Roast';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { body } = req;

  const coffeeRepository = getRepository(Coffee);
  const coffee = await coffeeRepository.findOne(body.coffeeId);

  if (!coffee) {
    res
      .status(404)
      .json({ error: `Coffee with ID ${body.coffeeId} does not exist` });
  }

  const roastRepository = getRepository(Roast);
  const roast = roastRepository.create(body);

  try {
    await roastRepository.save(roast);
  } catch (e) {
    res.status(400).json({ error: e.sqlMessage });
  }

  res.status(201).json(roast);
});

router.get('/', async (req: Request, res: Response) => {
  const roastRepository = getRepository(Roast);
  const roasts = await roastRepository.find();

  res.json(roasts);
});

export default router;

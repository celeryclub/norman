import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Coffee from '../entities/Coffee';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const coffeeRepository = getRepository(Coffee);
  const coffee = coffeeRepository.create(req.body);

  try {
    await coffeeRepository.save(coffee);
  } catch (e) {
    res.status(400).json({ message: e.message ? e.message : e });
    return;
  }

  res.status(201).json(coffee);
});

router.get('/', async (req: Request, res: Response) => {
  const coffeeRepository = getRepository(Coffee);
  const coffees = await coffeeRepository.find({
    order: {
      arrivalDate: 'DESC',
    },
  });

  res.json(coffees);
});

router.get('/:id', async (req: Request, res: Response) => {
  const coffeeRepository = getRepository(Coffee);
  const coffee = await coffeeRepository.findOne(req.params.id, {
    relations: ['roasts'],
  });

  if (!coffee) {
    res
      .status(404)
      .json({ message: `No coffee found with ID ${req.params.id}` });
    return;
  }

  res.json(coffee);
});

export default router;

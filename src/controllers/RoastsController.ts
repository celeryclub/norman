import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Roast } from '../models/Roast';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const roastRepository = getRepository(Roast);
  const roast = roastRepository.create(req.body);

  try {
    await roastRepository.save(roast);
  } catch (e) {
    res.status(400).json({ message: e.sqlMessage });
    return;
  }

  res.status(201).json(roast);
});

router.get('/', async (req: Request, res: Response) => {
  const roastRepository = getRepository(Roast);
  const roasts = await roastRepository.find();

  res.json(roasts);
});

export default router;

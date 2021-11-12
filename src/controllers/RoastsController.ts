import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Roast from '../entities/Roast';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const roastRepository = getRepository(Roast);
  const roast = roastRepository.create(req.body);

  try {
    await roastRepository.save(roast);
  } catch (e) {
    res.status(400).json({ message: e.message ? e.message : e });
    return;
  }

  res.status(201).json(roast);
});

router.get('/', async (req: Request, res: Response) => {
  const roastRepository = getRepository(Roast);
  const roasts = await roastRepository.find({
    order: {
      date: 'DESC',
    },
  });

  res.json(roasts);
});

router.get('/recent', async (req: Request, res: Response) => {
  const roastRepository = getRepository(Roast);

  const cafRoasts = await roastRepository.find({
    relations: ['coffee'],
    where: { coffee: { decaf: false } },
    take: 2,
    order: {
      date: 'DESC',
    },
  });

  const decafRoasts = await roastRepository.find({
    relations: ['coffee'],
    where: { coffee: { decaf: true } },
    take: 2,
    order: {
      date: 'DESC',
    },
  });

  res.json({ cafRoasts, decafRoasts });
});

export default router;

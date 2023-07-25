import express from 'express';
import diagnoseService from '../services/diagnoseService';
import { Diagnose } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

router.get('/:code', (req, res) => {
  const diagnose = diagnoseService.getDiagnose(req.params.code);
  if (diagnose) {
    res.send(diagnose);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (_req, res) => {
  const newDiagnose = _req.body as Diagnose;
  const addedDiagnose = diagnoseService.addDiagnose(newDiagnose);
  res.json(addedDiagnose);
});

export default router;
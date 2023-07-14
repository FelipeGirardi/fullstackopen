import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Fetching all diagnoses!');
});

router.get(':code', (req, res) => {
  const diagnose = diagnoseService.getDiagnose(req.params.code);
  if (diagnose) {
    res.send(diagnose);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;
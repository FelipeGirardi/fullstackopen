import express from 'express';
const app = express();
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
      throw new Error('Provided values were not numbers!');
    }

    const resultBMI = calculateBMI(height, weight);
    return res.send({ weight, height, resultBMI });
  } catch(error) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    }
    return res.status(400).send({ error: 'error' });
  }
})

app.post('/exercises', (req, res) => {
  const targetValue = req.body.target;
  const dailyHours = req.body.daily_exercises;

  if (!targetValue || !dailyHours) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  try {
    if(isNaN(Number(targetValue))) {
      throw new Error('malformatted parameters');
    }

    const dailyHoursArray: Array<number> = dailyHours.map((h: String) => {
      if(isNaN(Number(h))) {
        throw new Error('malformatted parameters');
      }
      return Number(h);
    });

    const result = calculateExercises(Number(targetValue), dailyHoursArray);
    return res.send(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    }
    return res.status(400).send({ error: 'error' });
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const query = req.query;

    let response: string = '';

    if (!query.height || !query.weight || isNaN(Number(query.height)) || isNaN(Number(query.weight))) {
        response = JSON.stringify({ error: "malformatted parameters" });
    } else {
        const height: number = Number(query.height);
        const weight: number = Number(query.weight);

        const bmiMessage: string = calculateBmi(height, weight);

        const responseObject = {
            weight,
            height,
            bmi: bmiMessage
        };

        response = JSON.stringify(responseObject);
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(response);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const requestData = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!requestData.target || !requestData.daily_exercises) {
    return res.status(400).send({ error: "parameters missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  if (isNaN(Number(requestData.target)) || requestData.daily_exercises.some((element: any) => isNaN(Number(element)))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target: number = requestData.target;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const daily_exercises: number[] = requestData.daily_exercises;

  const response = JSON.stringify(calculateExercises(daily_exercises, target));

  return res.send(response);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
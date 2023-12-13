import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
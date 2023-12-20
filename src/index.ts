import express from 'express';
import cors from 'cors';
import diagnosesRouter from '../routes/diagnosesRoute';

const app = express();

// To not have eslint screaming unsafe call of any and to not use ignore this line
app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));

app.use(express.json());

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
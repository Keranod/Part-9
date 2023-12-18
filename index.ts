import express from 'express';
import cors from 'cors';

const app = express();

// To not have eslint screaming unsafe call of any and to not use ignore this line
app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));

app.use(express.json());

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
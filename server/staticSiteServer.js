import path from 'path';
import express from 'express';

const app = express();
app.use(express.static(path.join(__dirname, '..', 'buildStatic')));
app.use('/static', express.static(path.join(__dirname, '..', 'buildClient')));

app.listen(5000);

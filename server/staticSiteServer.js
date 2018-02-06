/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import express from 'express';
import compression from 'compression';

const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, '..', 'buildStatic')));
app.use('/static', express.static(path.join(__dirname, '..', 'buildClient')));

app.listen(5000);

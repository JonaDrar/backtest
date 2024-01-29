const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const puerto = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
} );

app.post('/lab/simula-comercio/respuesta-pago', (req, res) => {
  const { body, headers } = req;
  console.log(body);
  console.log(headers);
  res.status(200).send('ok');
} );

app.listen(puerto, () => {
    console.log(`Example app listening on port ${puerto}!`);
} );
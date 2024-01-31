const express = require('express');
const cors = require('cors');
const { jwtDecode } = require('jwt-decode');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const puerto = process.env.PORT || 3010;
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Connected to DB');
})

const paymentSchema = new mongoose.Schema({
  token: String,
  total: Number,
  resultado: String,
  oc: String,
  descripcion: String,
  fecha: String,
  hora: String,
  items: Array,
  numero_cuenta: String,
  code: String,
  modoPago: String,
  tipoTarjeta: String,
  tipoCuenta: String,
  emisor: String,
  fecha_contable: String,
  hora_contable: String,
  iat: Number,
  exp: Number
});

const Payment = mongoose.model('Payment', paymentSchema);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
} );



app.post('/lab/simula-comercio/respuesta-pago', (req, res) => {
  const { body, headers } = req;
  console.log(body);
  console.log(headers);
  const { JWT } = body;
  const decoded = jwtDecode(JWT);
  console.log(decoded);
  const payment = new Payment(decoded);
  payment.save((err, payment) => {
    if (err) return console.error(err);
    console.log('Payment saved');
  });
  res.status(200).send('OK');

} );

app.listen(puerto, () => {
    console.log(`Example app listening on port ${puerto}!`);
} );

// const jwtDecoded_MOCK = {
//   "token": "922aac8e-51f7-4fa0-8e30-133eb603ad68",
//   "total": 1000,
//   "resultado": "ok",
//   "oc": "b6c2d0f5",
//   "descripcion": "ok",
//   "fecha": "31-01-2024",
//   "hora": "19:53:28",
//   "items": [
//     {
//       "nombre": "Producto 1",
//       "valor": 300,
//       "_id": "65ba9728ad893936a21d007a"
//     },
//     {
//       "nombre": "Producto 2",
//       "valor": 700,
//       "_id": "65ba9728ad893936a21d007b"
//     }
//   ],
//   "numero_cuenta": "0212",
//   "code": "ADQ.NQR.0000",
//   "modoPago": "QR",
//   "tipoTarjeta": "DEBITO",
//   "tipoCuenta": "CCT",
//   "emisor": "B.ESTADO DEBITO",
//   "fecha_contable": "2024-1-31",
//   "hora_contable": "15:53:38",
//   "iat": 1706727219,
//   "exp": 1706727819
// }
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middleware/error.handler');

const app = express();
const port = 3000;

const whiteList = ['http://localhost:80808', 'https://luishron.com'];

const options = {
  origin: (origin, callBack) => {
    if (whiteList.includes) {
      callBack(null, true);
    } else {
      callBack(new Error('no permitio'));
    }
  },
};
app.use(cors(options));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port' + port);
});

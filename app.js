const app = require('express')();
const { getSnacks } = require('./controllers.js');

app.get('/api/snacks', getSnacks);

app.use((req, res, next) => {
  res.status(404).send({ msg: 'Path not found' });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'server error' });
});
module.exports = app;

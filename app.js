const app = require('express')();
const { getSnacks } = require('./controllers/controllers');

app.get('/api/snacks', getSnacks);

app.use((req, res, next) => {
  res
    .status(404)
    .send({
      msg: 'Path not found please send a correct path, have a look at my wonderful documentation',
    });
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

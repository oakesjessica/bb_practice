var router = require('express').Router();
var pg = require('pg');

var connectionString = require('../db/connection').connectionString;

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/todos', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log('PG Connection Error /todos', err);
      res.status(500).send(err);
    } else {
      client.query('SELECT * FROM tasks;', function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          console.log(JSON.stringify(result.rows));
          res.send(JSON.stringify(result.rows));
          done();
        }
      });
    } //  else
  }); //  pg.connect
});

router.get('/todos/:id', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log('PG Connection Error /todos/:id', err);
      res.status(500).send(err);
    } else {
      client.query('SELECT * FROM tasks WHERE id = $1;', [req.params.id], function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          console.log(JSON.stringify(result.rows));
          res.send(JSON.stringify(result.rows));
          done();
        }
      });
    } //  else
  }); //  pg.connect
});

router.post('/todos', function(req, res) {
  var task = req.body.task;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log('PG Connection Error /todos', err);
      res.status(500).send(err);
    } else {
      client.query("INSERT INTO tasks (task) " +
      "VALUES ($1) " +
      "ON CONFLICT DO NOTHING " +
      "RETURNING *;", [task], function(err, result) {
        if (err) {
          console.log('POST Error to /todos', err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          res.status(200).send(result);
          done();
        }
      });
    } //  else if no pg.connect err
  }); //  pg.connect
})
module.exports = router;

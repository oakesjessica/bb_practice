var pg = require('pg');

var connectionString;

if (process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/todo_bb';
}

function initializeDB(){
  return new Promise(function(resolve, reject) {
    pg.connect(connectionString, function(err, client, done){
      if(err){
        console.log('Error connecting to DB', err);
        reject(Error(err));
        process.exit(1);
      } else {

        var tasks;

        tasks = 'CREATE TABLE IF NOT EXISTS tasks ( ' +
          'id serial PRIMARY KEY, ' +
          'tasks varchar(100) NOT NULL, ' +
          'status BOOLEAN DEFAULT FALSE);';

        var query = client.query(tasks);

        query.on('end', function(){
          console.log('Schema creation successful');
          resolve();
          done();
        });

        query.on('error', function(err) {
          console.log('Schema creation unsuccessful', err);
          reject(Error(err));
        });
      } //  else
    });
  });
}

module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;

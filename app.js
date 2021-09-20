// const http = require('http');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const courses_router = require('./routes/courses');
const home_router = require('./routes/home');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${config.get('name')}`);
app.get('env');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses_router);
app.use('/', home_router);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}
app.use(logger);



// const server = http.createServer((req, res) => {
//   if (req.url === '/') {
//     res.write('Hello World');
//     res.end();
//   }
//   if (req.url === '/app/example'){
//     res.write(JSON.stringify([1,2,3]));
//     res.end();
//   }
// });

// server.listen(3000);
// console.log('Listening on port 3000');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port: ", port);
})
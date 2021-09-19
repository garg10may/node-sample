// const http = require('http');
const Joi = require('joi');
const express = require('express');

const app = express();
app.use(express.json());

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
};

const courses = [
  { id: 1, name: 'python' },
  { id: 2, name: 'javascript' },
  { id: 3, name: 'node' }
];

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) { res.status(404).send('Course not found') };
  res.send(course);
});

app.post('/api/courses', (req, res) => {

  const result  = validateCourse(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  // if (!req.body.name || req.body.name.length <3) {
  //   res.status(400).send('Name is required');
  // }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res)=> {
  //Look up the course
  //If not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) { res.status(404).send('Course not found')};

  if (result.error) { res.status(404).send(result.error.details)};

  //Validate the course
  //If invalid, return 400 - Bad request

  //Update course
  // Return the updated course
})

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
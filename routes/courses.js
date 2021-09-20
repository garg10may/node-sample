const express = require('express');
const router = express.Router();

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


router.get('/', (req, res) => {
  res.send(courses);
})

router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) { res.status(404).send('Course not found') };
  res.send(course);
});

router.post('/', (req, res) => {

  const result = validateCourse(req.body);

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

router.put('/:id', (req, res) => {
  //Look up the course
  //If not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) { res.status(404).send('Course not found') };

  if (result.error) { res.status(404).send(result.error.details) };

  //Validate the course
  //If invalid, return 400 - Bad request

  //Update course
  // Return the updated course
});

module.exports = router;
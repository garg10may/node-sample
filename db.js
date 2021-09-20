const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => { console.log('Connected to mongodb'); })
  .catch(() => { console.log('Could not connect to mongodb') });


const courseSchema = new mongoose.Schema({
  name: String, //
  author: String, //
  tags: [String],
  date: { type: Date, default: new Date },
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);


async function createCourse() {

  const course = new Course({
    name: 'asdfasdfsadf',
    author: '234Tanmayff',
    tags: ['Angular', 'forntend'],
    isPublished: true,
    price: 3
  });

  const result = await course.save();
  console.log(result);
}

createCourse();

async function getCourses() {

  const pageNumber = 2;
  const pageSize = 20;

  //eq, ne, gt, gte, lt, lte, in, nin
  const courses = await Course
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .find({ author: 'Tanmay', isPublished: true })
    .find({ author: /.*Tanma.*/i })
    .find({ price: { $gt: 10, $lte: 50 } })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
  console.log(courses);
}

getCourses();


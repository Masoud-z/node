import mongoose from "mongoose";

const courses = [
  "nodejs",
  "javascript",
  "reactjs",
  "angularjs",
  "vuejs",
  "python",
  "java",
  "c++",
  "c#",
  "php",
  "ruby",
  "go",
  "swift",
  "kotlin",
  "dart",
  "flutter",
  "react native",
  "ionic",
  "cordova",
  "xamarin",
];

mongoose
  .connect("mongodb://localhost/practice")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  published: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

function createCourse(
  name: string,
  author: string,
  tags: string[],
  published: boolean
) {
  const course = new Course({
    name,
    author,
    tags,
    published,
  });

  return course.save();
}

// for (let i = 1; i < 100; i++) {
//   const randomIndex = Math.floor(Math.random() * 20);
//   const randomBinary = Math.floor(Math.random() * 2);

//   createCourse(
//     `${courses[randomIndex]} Course ${i}`,
//     "Masoud",
//     [`${i}`, `${i} ${i} ${i} ${i}`],
//     !!randomBinary
//   ).then((course) => {
//     console.log("Course created: ", course);
//   });
// }

function getCourses() {
  return Course.find({ published: true })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

getCourses().then((courses) => {
  console.log("Courses: ", courses);
});

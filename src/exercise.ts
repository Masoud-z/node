import mongoose from "mongoose";

interface ICourse extends mongoose.Document {
  name: string;
  author: string;
  tags: string[];
  date: Date;
  published: boolean;
  price: number;
}

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
  name: {
    type: String,
    required: Boolean,
    validate: {
      validator: function (v: string) {
        return !!v && v.length > 3;
      },
      message: "Name should be at least 3 characters long",
    },
  },
  author: { type: String, required: Boolean },
  tags: [String],
  date: { type: Date, default: Date.now },
  published: Boolean,
  price: {
    type: Number,
    required: function (this: ICourse) {
      return this.published;
    },
  },
});

const Course = mongoose.model("Course", courseSchema);

function createCourse(
  name: string,
  author: string,
  tags: string[],
  published: boolean,
  price: number
) {
  const course = new Course({
    name,
    author,
    tags,
    published,
    price,
  });

  return course
    .save()
    .then((course) => course)
    .catch((err) => {
      if (err instanceof Error) {
        console.error("Error creating course: ", err.message);
      } else {
        console.error("Error creating course: ", err);
      }
    });
}

createCourse("N", "Masoud", ["nodejs", "javascript"], true, 900).then(
  (course) => {
    console.log("createCourse2: ", course);
  }
);

// for (let i = 1; i < 100; i++) {
//   const randomIndex = Math.floor(Math.random() * 20);
//   const randomBinary = Math.floor(Math.random() * 2);
//   const randomPrice = Math.floor(Math.random() * 1000) + 1;

//   createCourse(
//     `${courses[randomIndex]} Course ${i}`,
//     "Masoud",
//     [`${i}`, `${i} ${i} ${i} ${i}`],
//     !!randomBinary,
//     randomPrice
//   ).then((course) => {
//     console.log("Course created: ", course);
//   });
// }

function getCourses() {
  return Course.find({ published: true, price: { $gte: 900, $lt: 950 } })
    .sort({ name: 1 })
    .select({ name: 1, price: 1 });
}

getCourses().then((courses) => {
  console.log("Courses: ", courses);
});

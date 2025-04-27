import { MongoClient, ServerApiVersion } from "mongodb";

import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/playground")
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
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

function createCourse(
  name: string,
  author: string,
  tags: string[],
  isPublished: boolean
) {
  const course = new Course({
    name,
    author,
    tags,
    isPublished,
  });

  return course.save();
}

// for (let i = 1; i < 100; i++) {
//   createCourse(
//     `Course ${i}`,
//     "Masoud",
//     [`${i}`, `${i} ${i} ${i} ${i}`],
//     true
//   ).then((course) => {
//     console.log("Course created: ", course);
//   });
// }

function getCourses(page: number, pageSize: number) {
  return Course.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize);
}

function getPublishedCourses() {
  return Course.find({ isPublished: true })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

getPublishedCourses().then((courses) => {
  console.log("Published courses: ");
});

const url =
  "mongodb+srv://masoudzeinalabedini:9whoMgiRYitKIVM9@cluster0.f4sb4jz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);

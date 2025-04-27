import express, { Request, Response } from "express";
import Joi from "joi";
import router from "./generes";

const app = express();

interface Course {
  id: string;
  name: string;
}

const courses: Course[] = [
  { id: "1", name: "course1" },
  { id: "2", name: "course2" },
  { id: "3", name: "course3" },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/generes", router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res: Response<Course[]>) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res: Response<Course | string>) => {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course)
    res.status(404).send("The course with the given ID was not found");
  res.send(course);
});

app.post("/api/courses", (req: Request<any, any, { name: string }>, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.valid(req.body, schema);
  const course: Course = {
    id: `${courses.length + 1}`,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.get(
  "/api/posts/:year/:month",
  (
    req: Request<
      {
        year: string;
        month: string;
      },
      any,
      any,
      { id: string }
    >,
    res
  ) => {
    res.send(`${req.query.id}: ${req.params.year}/${req.params.month}`);
  }
);

const port = process.env.PORT || 5533;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

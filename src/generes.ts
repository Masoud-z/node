import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from generes route");
});

router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send("Name is required");
    return;
  }
  const genre = {
    id: Date.now().toString(),
    name,
  };
  res.status(201).send(genre);
  return;
});

export default router;

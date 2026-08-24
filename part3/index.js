require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();

const Person = require("./models/mongo.js");

app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status :response-time ms :body"));

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.get("/", (request, response) => {
  return response.status(200).json({ message: "Success" });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (!body.content.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (!body.content.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  const nameExist = phonebook.find(
    (person) => person.name === body.content.name,
  );

  if (nameExist) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  Person.findOne({ name: body.name }).then((person) => {
    if (person) {
      return response.status(400).json({
        error: "name must be unique",
      });
    }

    const newPerson = new Person({
      name: body.name,
      number: body.number,
    });

    newPerson.save().then((savedPerson) => {
      response.json(savedPerson);
    });
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findOne({ id }).then((person) => {
    if (!person) {
      return response.status(400).json({
        error: "Not in the phonebook",
      });
    }
    response.json(person);
  });
});

app.get("/api/info", (req, res) => {
  const ppl = phonebook.length;
  const date = new Date();

  return res.send(`
    <p>The phonebook has ${ppl} people</p>
    <p>${date}</p>
    `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

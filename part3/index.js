require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const Person = require("./models/mongo.js");

console.log(Person);
console.log(typeof Person);
console.log(typeof Person.find);
console.log(require.resolve("./models/mongo.js"));

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status :response-time ms :body"));

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
  Person.findById(id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }
      response.json(person);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }

      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/api/info", (req, res) => {
  const ppl = phonebook.length;
  const date = new Date();

  return res.send(`
    <p>The phonebook has ${ppl} people</p>
    <p>${date}</p>
    `);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

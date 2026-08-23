const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status :response-time ms :body"));

let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.get("/", (request, response) => {
  return response.status(200).json({ message: "Success" });
});

app.get("/api/persons", (request, response) => {
  return response.status(200).json(phonebook);
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

  const person = {
    id: generateId(),
    name: body.content.name,
    number: body.content.number,
  };

  phonebook = phonebook.concat(person);

  response.json(note);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = phonebook.find((person) => person.id === id);
  if (!person) return res.status(404);
  return res.status(200).json(person);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  phonebook = phonebook.filter((person) => person.id !== id);

  response.status(204).end();
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

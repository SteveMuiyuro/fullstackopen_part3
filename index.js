const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
var responseTime = require("response-time");
app.use(express.json());
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :response-time ms :body "));
app.use(express.static("build"));
app.use(morgan("tiny"));
app.use(cors());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const newDate = new Date();

  res.send(
    `Phone book has info for ${persons.length} people <P>${newDate}</P>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  function generateId() {
    const maxid =
      persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
    return maxid + 1;
  }
  const body = req.body;
  const person = { id: generateId(), name: body.name, number: body.number };

  if (!body.name || !body.number) {
    return res.status(404).json({
      error: "missing info.please ensure all the fileds are included",
    });
  }
  persons.forEach((person) => {
    if (person.name === body.name && body.number === person.number) {
      return res.status(404).json({
        error: "name and number must be unique",
      });
    }
  });
  persons = persons.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening to Port, ${PORT}`);
});

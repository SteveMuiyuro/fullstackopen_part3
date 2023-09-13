require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/person.js");
const cors = require("cors");
const morgan = require("morgan");
var responseTime = require("response-time");
app.use(express.json());
morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);

app.use(express.static("build"));
app.use(cors());

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

// app.get("/info", (req, res) => {
//   const newDate = new Date();

//   res.send(
//     `Phone book has info for ${persons.length} people <P>${newDate}</P>`
//   );
// });

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => res.json(person));
});

// app.delete("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   persons = persons.filter((person) => person.id !== id);
//   res.status(204).end();
// });

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(404).json({
      error: "missing info.please ensure all the fields are included",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  console.log(person);

  person.save().then((savedPerson) => res.json(savedPerson));

  // Person.forEach((person) => {
  //   if (person.name === body.name && body.number === person.number) {
  //     return res.status(404).json({
  //       error: "name and number must be unique",
  //     });
  //   }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening to Port, ${PORT}`);
});

require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.static("build"));
app.use(express.json());
const morgan = require("morgan");
const Person = require("./models/person.js");
const cors = require("cors");
var responseTime = require("response-time");
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

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (error, req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "missing info.please ensure all the fields are included",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((err) => next(error));

  // Person.forEach((person) => {
  //   if (person.name === body.name && body.number === person.number) {
  //     return res.status(404).json({
  //       error: "name and number must be unique",
  //     });
  //   }
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res
      .status(400)
      .json({
        message: `Person Validation failed: name: ${req.body.name} is shortre than the minimum allowed length (3)`,
      });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening to Port, ${PORT}`);
});

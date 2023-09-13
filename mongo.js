

// const person = new Person({
//   name: "Ada Lovelace",
//   number: "040-1231236",
// });

// person.save().then((result) => {
//   console.log(`Added ${person.name} ${person.number} to phonebook`);
//   mongoose.connection.close();
// });

Person.find({}).then((persons) => {
  persons.forEach((person) => console.log(person));
  mongoose.connection.close();
});

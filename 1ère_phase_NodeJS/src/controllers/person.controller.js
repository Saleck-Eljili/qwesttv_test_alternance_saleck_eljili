const PersonModel = require("../models/person.model");

//GET

// Get tous les Person :
exports.getPersonList = (req, res) => {
  //console.log('here all persons list');
  PersonModel.getAllPersons((err, persons) => {
    console.log("We are here");
    if (err) res.send(err);
    console.log("Persons", persons);
    res.send(persons);
  });
};

// Get un seul Person :

// par id pour la modification
exports.getPersonByID = (req, res) => {
  //console.log('get per by id');
  PersonModel.getPersonByID(req.params.id, (err, person) => {
    if (err) res.send(err);
    console.log("single person data", person);
    // res.json({"first_name":"Saleck"});
    res.send(JSON.stringify({ status: 200, error: null, response: person }));
  });
};

// par Name pour la recherche par nom
exports.getPersonByName = (req, res) => {
  //console.log('get per by id');
  PersonModel.getPersonByName(req.params.first_name, (err, person) => {
    if (err) res.send(err);
    console.log("single person data", person);
    res.send(person);
  });
};



// POST
exports.createNewPerson = (req, res) => {
  const personReqData = new PersonModel(req.body);
  console.log("personReqData", personReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    PersonModel.createPerson(personReqData, (err, person) => {
      if (err) res.send(err);
      res.json({
        status: true,
        message: "Person Created Successfully",
        data: person.insertId,
      });
    });
  }
};



// PUT
exports.updatePerson = (req, res) => {
  const personReqData = new PersonModel(req.body);
  console.log("personReqData update", personReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    PersonModel.updatePerson(req.params.id, personReqData, (err, person) => {
      if (err) res.send(err);
      res.json({ status: true, message: "Person updated Successfully" });
    });
  }
};

// DELETE
exports.deletePerson = (req, res) => {
  PersonModel.deletePerson(req.params.id, (err, person) => {
    if (err) res.send(err);
    res.json({ success: true, message: "Person deleted successully!" });
  });
};

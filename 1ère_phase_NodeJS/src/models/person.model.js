var dbConn = require("../../config/db.config");

var Person = function (person) {
  this.first_name = person.fname;
  this.last_name = person.lname;
  this.address = person.address;
  this.isActive = person.isActive;
};

//GET

// Get tous les Person :
Person.getAllPersons = (result) => {
  dbConn.query("SELECT * FROM persons", (err, res) => {
    if (err) {
      console.log("Error while fetching personss", err);
      result(null, err);
    } else {
      console.log("Persons fetched successfully");
      result(null, res);
    }
  });
};

// Get un seul Person :

// par id pour la modification
Person.getPersonByID = (id, result) => {
  dbConn.query("SELECT * FROM persons WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching person by id", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// par Name pour la recherche par nom
Person.getPersonByName = (first_name, result) => {
  dbConn.query(
    "SELECT * FROM persons WHERE first_name=?",
    first_name,
    (err, res) => {
      if (err) {
        console.log("Error while fetching person by id", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};



// POST
Person.createPerson = (personReqData, result) => {
  dbConn.query("INSERT INTO persons SET ?", personReqData, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(null, err);
    } else {
      console.log("Person created successfully");
      result(null, res);
    }
  });
};



// PUT
Person.updatePerson = (id, personReqData, result) => {
  dbConn.query(
    "UPDATE persons SET first_name=?,last_name=?,address=?,isActive=? WHERE id = ?",
    [
      personReqData.first_name,
      personReqData.last_name,
      personReqData.address,
      personReqData.isActive,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while updating the person");
        result(null, err);
      } else {
        console.log("Person updated successfully");
        result(null, res);
      }
    }
  );
};

// DELETE
Person.deletePerson = (id, result) => {
  dbConn.query("DELETE FROM persons WHERE id=?", [id], (err, res) => {
    if (err) {
      console.log("Error while deleting the person");
      result(null, err);
    } else {
      result(null, res);
    }
  });
  // dbConn.query("UPDATE persons SET is_deleted=? WHERE id = ?", [1, id], (err, res)=>{
  //     if(err){
  //         console.log('Error while deleting the person');
  //         result(null, err);
  //     }else{
  //         console.log("Person deleted successfully");
  //         result(null, res);
  //     }
  // });
};

module.exports = Person;

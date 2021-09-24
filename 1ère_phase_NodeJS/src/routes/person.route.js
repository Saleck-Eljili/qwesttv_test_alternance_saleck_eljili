const express = require("express");
const router = express.Router();

const personController = require("../controllers/person.controller");

// Get tous les Person :
router.get("/", personController.getPersonList);

// get person by ID
router.get("/:id", personController.getPersonByID);

// get ID for Update
router.get("/searchRecord/:first_name", personController.getPersonByName);

// post new person
router.post("/", personController.createNewPerson);

// update person
router.put("/:id", personController.updatePerson);

// delete person
router.delete("/:id", personController.deletePerson);

module.exports = router;

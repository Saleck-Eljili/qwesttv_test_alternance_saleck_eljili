import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function StudentDetail() {
  const [search, setSearch] = useState("");
  const [record, setRecord] = useState([]);

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    address: "",
    isActive: "",
  });

  //  Déstructuration d'objets
  const { fname, lname, address, isActive } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // On Page load display all person
  const loadPersonDetail = async () => {
    var response = fetch("http://localhost:5000/api/v1/person")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setRecord(myJson);
      });
  };
  useEffect(() => {
    loadPersonDetail();
  }, []);

  // Ajouter Person
  const submitPersonRecord = async (e) => {
    e.preventDefault();
    e.target.reset();
    await axios.post("http://localhost:5000/api/v1/person", user);
    alert("la personne était bien ajoutée");

    loadPersonDetail();
  };

  // filtrer
  const searchRecords = () => {
    alert(search);
    axios
      .get(`http://localhost:5000/api/v1/person/searchRecord/${search}`)
      .then((response) => {
        setRecord(response.data);
      });
  };

  // Delete Person
  const deleteRecord = (personId) => {
    axios
      .delete(`http://localhost:5000/api/v1/person/${personId}`)
      .then((result) => {
        loadPersonDetail();
      })
      .catch(() => {
        alert("Error in the Code");
      });
  };

  return (
    <section>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link text-white" href="/">
                [ Qwest TV ] Test Alternance pour le 26 Septembre{" "}
                <span class="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container">
        <div class="row mt-3">
          <div class="col-sm-4">
            <div
              className="box p-3 mb-3 mt-5"
              style={{ border: "1px solid #d0d0d0" }}
            >
              <form onSubmit={submitPersonRecord}>
                <h5 className="mb-3 ">Ajouter une personne</h5>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control  mb-4"
                    name="fname"
                    value={fname}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter name"
                    required=""
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control  mb-4"
                    name="lname"
                    value={lname}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Sirname"
                    required=""
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control mb-4"
                    name="address"
                    value={address}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter adress"
                    required=""
                  />
                </div>

                <div class="form-group">
                  <select
                    type="text"
                    class="btn dropdown-toggle"
                    name="isActive"
                    value={isActive}
                    onChange={(e) => onInputChange(e)}
                    placeholder="is active"
                    required=""
                  >
                    <option value="">Is active</option>
                    <option>YES</option>
                    <option>NO</option>
                  </select>
                </div>

                <button type="submit" class="btn btn-primary btn-block mt-4">
                  Ajouter
                </button>
              </form>
            </div>
          </div>
          <div class="col-sm-8">
            <h4 class="text-center  ml-4 mt-4  mb-5">Voir les personnes</h4>
            <div class="input-group mb-4 mt-3">
              <div class="form-outline">
                <input
                  type="text"
                  id="form1"
                  onChange={(e) => setSearch(e.target.value)}
                  class="form-control"
                  placeholder="filtrer par nom"
                  style={{ backgroundColor: "#ececec" }}
                />
              </div>
              <button
                type="button"
                onClick={searchRecords}
                class="btn btn-success"
              >
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
            <table class="table table-hover  table-striped table-bordered ml-4 ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>address</th>
                  <th>isActive</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {record.map((name) => (
                  <tr>
                    <td>{name.first_name}</td>
                    <td>{name.last_name}</td>
                    <td>{name.address}</td>
                    <td>{name.isActive}</td>

                    <td>
                      <Link
                        className="text-danger mr-2"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Voulez-vous vraiment supprimer " + name.first_name
                          );
                          if (confirmBox === true) {
                            deleteRecord(name.id);
                          }
                        }}
                      >
                        {" "}
                        <i
                          class="far fa-trash-alt"
                          style={{ fontSize: "18px", marginRight: "5px" }}
                        ></i>{" "}
                      </Link>

                      <Link class=" mr-2" to={`../EditPerson/editID/${name.id}`}>
                        <i class="fa fa-edit" aria-hidden="true"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudentDetail;

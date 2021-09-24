import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditPerson = () => {
  let history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams(); //The useParams() hook helps us to access the URL parameters from a current route.

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    address: "",
    isActive: "",
  });

  const { fname, lname, address, isActive } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const updatePerson = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/v1/person/${id}`, user);
    history.push("/");
  };

  const loadUser = () => {
    fetch(`http://localhost:5000/api/v1/person/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUser({
          id: id,
          update: true,
          fname: result.response[0].first_name,
          lname: result.response[0].last_name,
          address: result.response[0].address,
          isActive: result.response[0].isActive,
        });
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
          <h4 className="text-center mb-4">Modifier la personne</h4>

          <h5 className="text-success">Person ID : {user.id} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Person Name"
              name="fname"
              value={fname}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Person Surname"
              name="lname"
              value={lname}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Person Adresse"
              name="address"
              value={address}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
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

          <button
            onClick={updatePerson}
            className="btn btn-secondary btn-block"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPerson;

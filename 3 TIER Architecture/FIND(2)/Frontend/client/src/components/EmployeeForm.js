import React, { useState, useEffect, useRef } from "react";

function EmployeeForm() {
  let [employees, setEmployees] = useState([]);
  let [countriesList, setCountriesList] = useState([]);
  let [departmentsList, setDepartmentsList] = useState([]);
  let [gendersList, setGendersList] = useState([]);

  let countrySelelctRef = useRef();
  let departmentSelelctRef = useRef();
  let genderSelelctRef = useRef();

  useEffect(() => {
    getCountriesListFromServer();
    getDepartmentsListFromServer();
    getGendersListFromServer();
    getEmployeesFromServer();
  }, []);

  let getCountriesListFromServer = async () => {
    let reqOption = {
      method: "GET",
    };
    let JSONData = await fetch(
      "http://localhost:4567/countriesList",
      reqOption
    );
    let JSOData = await JSONData.json();
    console.log("countriesList", JSOData);
    setCountriesList(JSOData);
  };

  let getGendersListFromServer = async () => {
    let reqOption = {
      method: "GET",
    };
    let JSONData = await fetch("http://localhost:4567/gendersList", reqOption);
    let JSOData = await JSONData.json();
    console.log("gendersList", JSOData);
    setGendersList(JSOData);
  };
  let getDepartmentsListFromServer = async () => {
    let reqOption = {
      method: "GET",
    };
    let JSONData = await fetch(
      "http://localhost:4567/departmentsList",
      reqOption
    );
    let JSOData = await JSONData.json();
    console.log("departmentsList", JSOData);
    setDepartmentsList(JSOData);
  };

  let getEmployeesFromServer = async () => {
    try {
      let reqOptions = {
        method: "GET",
      };

      let url= `http://localhost:4567/employees?country=${countrySelelctRef.current.value}&department=${departmentSelelctRef.current.value}&gender=${genderSelelctRef.current.value}`;

      // let url = `http://localhost:4567/employees/${countrySelelctRef.current.value}/${departmentSelelctRef.current.value}/${genderSelelctRef.current.value}?order=asc`;

      console.log(url);

      let response = await fetch(url, reqOptions);
      let data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  };

  return (
    <div className="employee-form-container">
      <h1>Employee Form</h1>
      <form className="employee-form">
        <div>
          <label>Country</label>
          <select ref={countrySelelctRef}>
            {countriesList.map((ele, i) => {
              return <option key={i}>{ele}</option>;
            })}
          </select>
        </div>
        <div>
          <label>Department</label>
          <select ref={departmentSelelctRef}>
            {departmentsList.map((ele, i) => {
              return <option key={i}>{ele}</option>;
            })}
          </select>
        </div>
        <div>
          <label>Gender</label>
          <select ref={genderSelelctRef}>
            {gendersList.map((ele, i) => {
              return <option key={i}>{ele}</option>;
            })}
          </select>
        </div>
        <div className="getEmployeesButton">
          <button type="button" onClick={getEmployeesFromServer}>
            Get Employees
          </button>
        </div>
      </form>
      <table className="employee-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>ID</th>
            <th>Profile Pic</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Department</th>
            <th>Country</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {console.log(employees)}
          {employees.map((employee, index) => (
            <tr key={index} className="employee-row">
              <td>{index + 1}</td>
              <td>{employee.id}</td>
              <td>
                {employee.profilepic && (
                  <img src={employee.profilepic} alt="profile" />
                )}
              </td>
              <td>{employee.firstName}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
              <td>{employee.age}</td>
              <td>{employee.department}</td>
              <td>{employee.country}</td>
              <td>₹.{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeForm;

import React, { useState, useEffect } from "react";

function EmployeeForm() {
  let [employees, setEmployees] = useState([]);
  let [countryiesList, setCountriesList]= useState([]);
  let [departmentsList, setDepartmentsList]= useState([]);
  let [gendersList, setGendersList]= useState([]);



 useEffect(()=>{
  getCountriesListFromServer();
  getDepartmentsListFromServer();
  getGendersListFromServer();
},[])


let getCountriesListFromServer = async()=>{
  let reqOption = {
    method:'GET'
  }
  let JSONData = await fetch("http://localhost:4567/countryiesList",reqOption);
  let JSOData = await JSONData.json();
  console.log(JSOData);
  setCountriesList(JSOData);
}

let getGendersListFromServer = async()=>{
  let reqOption = {
    method:'GET'
  }
  let JSONData = await fetch("http://localhost:4567/gendersList",reqOption);
  let JSOData = await JSONData.json();
  console.log(JSOData);
  setGendersList(JSOData);
}
let getDepartmentsListFromServer = async()=>{
  let reqOption = {
    method:'GET'
  }
  let JSONData = await fetch("http://localhost:4567/departmentsList",reqOption);
  let JSOData = await JSONData.json();
  console.log(JSOData);
  setDepartmentsList(JSONData);
}

  let getEmployeesFromServer = async () => {
    try {
      let reqOptions = {
        method: "GET",
      };
      let response = await fetch("http://localhost:4567/employees", reqOptions);
      let data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    getEmployeesFromServer();
  }, []);

  return (
    <div className="employee-form-container">
      <form className="employee-form">

       <div>
        <label>Country</label>
        <select>
          {countryiesList.map((ele)=>{
            return <option >{ele}</option>
          })}
        </select>
       </div>
       <div>
        <label>Department</label>
        <select>
          {gendersList.map((ele)=>{
            return <option>{ele}</option>
          })}
        </select>
       </div>
       <div>
        <label>Gender</label>
        <select>
          {departmentsList.map((ele)=>{
            return <option>{ele}</option>
          })}
        </select>
       </div>

        <div className="getEmployeeButton">
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
                <td>{employee.profilepic && <img src={employee.profilepic} alt="profile" />}</td>
                <td>{employee.firstName}</td>
                <td>{employee.email}</td>
                <td>{employee.gender}</td>
                <td>{employee.age}</td>
                <td>{employee.department}</td>
                <td>{employee.country}</td>
                <td>₹{employee.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}

export default EmployeeForm;

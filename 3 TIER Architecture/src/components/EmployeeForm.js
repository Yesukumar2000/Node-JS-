import React, { useState, useEffect } from "react";

function EmployeeForm() {
  const [employees, setEmployees] = useState([]);

  const getEmployeesFromServer = async () => {
    try {
      const reqOptions = {
        method: "GET",
      };
      const response = await fetch("http://localhost:4567/employees", reqOptions);
      const data = await response.json();
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

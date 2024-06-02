import React, { useRef } from "react";

function Signup() {
  let fristNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();

  let onSignup = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/json");
    let dataToSend = {
      fristName: fristNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      mobile: mobileNoInputRef.current.value,
      profilePic: profilePicInputRef.current.value,
    };
    let reqOptions = {
      method: "POST",
      headers: myHeader,
      body: JSON.stringify(dataToSend),
    };
    let JSONData = await fetch("http://localhost:7999/register", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
  };

  return (
    <div >
      <form>
        <h2> Employee Form</h2>
        <div>
          <label>Frist Name</label>
          <input ref={fristNameInputRef}  type="text" placeholder="Fristname" ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}  type="text" placeholder="Surname" ></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef} type="number" placeholder="Age" ></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}  type="email" placeholder="Email" />
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef} type="text" placeholder="password"></input>
        </div>
        <div>
          <label>Mobile No</label>
          <input ref={mobileNoInputRef} type="number" placeholder="9100000000"></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input ref={profilePicInputRef}  type="text" placeholder="path" ></input>
        </div>
        <div>
        <button type="button"  onClick={onSignup}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;

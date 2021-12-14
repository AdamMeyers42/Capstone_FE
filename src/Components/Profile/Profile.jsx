
import React from "react";
// import "./Profile.css"
import jwtDecode from "jwt-decode";

const Profile = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const profileDetails = {
        first_name: event.target[0].value,
        last_name: event.target[1].value,
        email: event.target[2].value,
        username: event.target[3].value,
        password: event.target[4].value,
    };
      console.log(profileDetails)
    props.editProfile(profileDetails);
    window.location = ('/Profile')
}

  return (

    
      <div class="row"> 
          <h1>Update Profile Info</h1>
        <div class="container">
          <form onSubmit={handleSubmit} class="w3-table-all">
            <div class="row">
              <div class="col-sm">
                <div class="form-field">
                  <div class="form-field__control">
                    <label for="first_name" class="form-field__label">First Name</label>
                    <input id="first_name" type="text" class="form-field__input" />
                  </div>
                </div>
              </div>
              <div class="col-sm">
                <div class="form-field">
                  <div class="form-field__control">
                    <label for="last_name"class="form-field__label">Last Name</label>
                    <input id="last_name" type="text" class="form-field__input" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <div class="form-field">
                  <div class="form-field__control">
                    <label for="email" class="form-field__label">Email</label>
                    <input id="email" type="email" class="form-field__input" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <div class="form-field">
                  <div class="form-field__control">
                    <label for="username"class="form-field__label">Username</label>
                    <input id="username" type="text" class="form-field__input" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <div class="form-field">
                  <div class="form-field__control">
                    <label for="password"class="form-field__label">Password</label>
                    <input id="password" type="text" class="form-field__input" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <p style={{textAlign:"center"}}></p>

        <p style={{textAlign:"center"}}></p>
      </div>
      
  )
}
export default Profile;






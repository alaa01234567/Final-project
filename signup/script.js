const firstName = document.getElementById("fn");
const lastName = document.getElementById("ln");
const email = document.getElementById("email");
const password = document.getElementById("pass");
const confirmPassword = document.getElementById("repass");
const phoneNumber = document.getElementById("no.");

let allData = [];
if (localStorage.getItem("allData") != null) {
  allData = JSON.parse(localStorage.getItem("allData"));
}

// save data
function save() {

  if (validationData() == true) {
    var data = {
      name: firstName.value + " " + lastName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      phoneNumber: phoneNumber.value,
     
    };

    allData.push(data);
    localStorage.setItem('allData', JSON.stringify(allData));
    clearData();
   
  }

  
}

// clear data after submitting it
function clearData() {
  document.getElementById("fn").value = "";
  document.getElementById("ln").value = "";
  document.getElementById("email").value = "";
  document.getElementById("pass").value = "";
  document.getElementById("repass").value = "";
  document.getElementById("no.").value = "";

}


// check validation and report message if necessary


function validationData() {
  var firstNameRegex = /^[A-Z][a-z]{2,8}$/;
  var lastNameRegex = /^[A-Z][a-z]{2,8}$/;
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#%&*])[A-Za-z\d@#%&*]{8,}$/;
  var phoneNumberRegex = /^(02)?01[0125][0-9]{8}$/;
 
  // Clear previous error messages
  const errorFields = ["fnrgx", "lnrgx", "emailrgx", "pasrgx", "psc", "norgx"];
  errorFields.forEach(field => document.getElementById(field).innerHTML = "");

  let errors = [];

  if (!firstNameRegex.test(firstName.value)) {
      document.getElementById("fnrgx").innerHTML = "First name must be 3-8 characters starting with a capital letter.";
  }

  if (!lastNameRegex.test(lastName.value)) {
      document.getElementById("lnrgx").innerHTML = "Last name must be 3-8 characters starting with a capital letter.";
  }

  if (!emailRegex.test(email.value)) {
      document.getElementById("emailrgx").innerHTML = "Enter a valid email.";
  }

  if (!passwordRegex.test(password.value)) {
      document.getElementById("pasrgx").innerHTML = "Password must be at least 8 characters and include uppercase, lowercase, and special characters.";
  }

  if (confirmPassword.value !== password.value) {
      document.getElementById("psc").innerHTML = "Passwords do not match.";
  }

  if (!phoneNumberRegex.test(phoneNumber.value)) {
      document.getElementById("norgx").innerHTML = "Enter a correct phone number.";
  }



  // Check if there are any errors
  if (errorFields.some(field => document.getElementById(field).innerHTML !== "")) {
      return false; // Validation failed
  }

  return true; // Validation passed
}
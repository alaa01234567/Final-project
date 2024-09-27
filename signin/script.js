const email = document.getElementById("email");
const password = document.getElementById("pass");

// check if data is stored in local storage

function signIn() {
  
  const storedEmail = localStorage.getItem('email');
  const storedPassword = localStorage.getItem('password');
  const messageDiv = document.getElementById('message');

  if (email === storedEmail && password === storedPassword) {
      messageDiv.textContent = 'Sign in successful!';
      messageDiv.style.color = 'green';
      
  } else {
      messageDiv.textContent = 'This email or password is incorrect';
      messageDiv.style.color = 'red';
  }
  
}

// clear data after submitting it
function clearData() {
  document.getElementById("email").value = "";
  document.getElementById("pass").value = "";
}

// check validation and report message if necessary

function validationData() {
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#%&*])[A-Za-z\d@#%&*]{8,}$/;

  // Clear previous error messages
  const errorFields = ["emailrgx", "pasrgx"];
  errorFields.forEach(
    (field) => (document.getElementById(field).innerHTML = "")
  );

  let errors = [];

  if (!emailRegex.test(email.value)) {
    document.getElementById("emailrgx").innerHTML = "Enter a valid email.";
  }

  if (!passwordRegex.test(password.value)) {
    document.getElementById("pasrgx").innerHTML =
      "Password must be at least 8 characters and include uppercase, lowercase, and special characters.";
  }

  // Check if there are any errors
  if (
    errorFields.some((field) => document.getElementById(field).innerHTML !== "")
  ) {
    return false; // Validation failed
  }

  return true; // Validation passed
}
function login() {
  var email = document.getElementById("emailInput").value;
  var password = document.getElementById("passwordInput").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User signed in successfully
      var user = userCredential.user;
      agentID = user.uid;

      var databaseRef = firebase.database().ref("/agents/" + agentID);

      databaseRef.once("value").then(function(snapshot){
        var agentData = snapshot.val();

        if (agentData.accountStatus == "unapproved"){
          alert("Sorry, your account is not yet approved!");
        } else {
          window.location.href = "dashboard.html";
        }

      })

    })
    .catch((error) => {
      // Handle sign-in errors and show error message in alert box
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        alert("Incorrect password. Please try again.");
      } else {
        alert("Login error: " + errorMessage);
      }
      // Reset the form fields after displaying the alert
      resetForm();
    });

}

function signup() {
  var email = document.getElementById("signupEmailInput").value;
  var password = document.getElementById("signupPasswordInput").value;
  var confirmPassword = document.getElementById("confirmSignupPasswordInput").value; // New line to get the confirmed password
  var name = document.getElementById("nameInput").value;
  var phone = document.getElementById("phoneInput").value;
  var roleSelect = document.getElementById('roleInput');
  var roleValue = roleSelect.options[roleSelect.selectedIndex].value;

  if (password !== confirmPassword) {
    alert("Passwords do not match. Please make sure your passwords match.");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User signed up successfully

      var user = userCredential.user;
      var agentID = user.uid;

      var timestamp = new Date().toJSON();

      var databaseRef = firebase.database().ref("/agents/" + agentID);

      var newDataRef = databaseRef;

      console.log(timestamp);

      newDataRef.set({
        agentName: name,
        agentEmail: email,
        agentPhone: phone,
        createdAt: timestamp,
        accountStatus: "unapproved",
        role: roleValue,
        tokens: ""
      })
      .then(function() {

        console.log("Data submitted successfully!");

        databaseRef.once("value").then(function(snapshot){
          var agentData = snapshot.val();
          if (agentData.accountStatus == "unapproved"){
            alert("Sorry, your account is not yet approved!");
          } else {
            window.location.href = "dashboard.html";
          }

        })

      })
      .catch(function(error) {
        console.log("Error submitting data: ", error);
      });

      var updates = {};
      updates['/tokens/'] = "";
      firebase.database().ref('agents/' + agentID).update(updates);

    })
    .catch((error) => {
      // Handle signup errors and show error message in alert box
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/weak-password') {
        alert("Password is too weak. Please choose a stronger password.");
      } else {
        alert("Signup error: " + errorMessage);
      }
      // Reset the form fields after displaying the alert
      resetForm();
    });
}

function resetForm() {
  document.getElementById("emailInput").value = "";
  document.getElementById("passwordInput").value = "";
  document.getElementById("signupEmailInput").value = "";
  document.getElementById("signupPasswordInput").value = "";
  document.getElementById("confirmSignupPasswordInput").value = "";
  document.getElementById("nameInput").value = "";
  document.getElementById("phoneInput").value = "";
  document.getElementById("roleInput").selectedIndex = 0;
}

  function logout() {
    firebase.auth().signOut()
      .then(() => {
        // User signed out successfully
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }

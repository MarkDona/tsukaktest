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
          alert("Thanks for signing up to be an agent. Your application will be reviewed and hopefully approved by our team shortly.");
            window.location.href = "agent-login";
        } else {
          window.location.href = "dashboard";
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
  var confirmPassword = document.getElementById("confirmSignupPasswordInput").value;
  var name = document.getElementById("nameInput").value;
  var phone = document.getElementById("phoneInput").value;
  var roleSelect = document.getElementById('roleInput');
  var roleValue = roleSelect.options[roleSelect.selectedIndex].value;

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match. Please make sure your passwords match.");
    return;
  }

  // Create a new user with email and password
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User signed up successfully
      var user = userCredential.user;
      var agentID = user.uid;
      var timestamp = new Date().toJSON();
      var databaseRef = firebase.database().ref("/agents/" + agentID);
      var newDataRef = databaseRef;

      console.log(timestamp);

      // Set agent data in the database
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

        // Check account status and send email
        databaseRef.once("value").then(function(snapshot){
          var agentData = snapshot.val();
          if (agentData.accountStatus == "unapproved") {
            alert("Thanks for signing up to be an agent. Your application will be reviewed and hopefully approved by our team shortly.");

            // Send email using AJAX
              // const xhr = new XMLHttpRequest();
              // const url = "https://sendmail.rf.htu.edu.gh/sendymail.php";
              // xhr.open("POST", url);
              // xhr.send();
            $.ajax({
              url: 'https://sendmail.rf.htu.edu.gh/sendymail.php',
              type: 'POST',
              data: { content: name },
              success: function(response) {
                console.log('Email sent successfully:', response);
                window.location.href = "agent-login";
              },
              error: function(xhr, status, error) {
                console.error('Error sending email:', error);
                window.location.href = "agent-login";
              }
            });
          } else {
            // Redirect to dashboard
            window.location.href = "dashboard";
          }
        })

      })
      .catch(function(error) {
        console.log("Error submitting data: ", error);
      });

      // Reset tokens
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

// function sendEmail(name) {
//   console.log("Name:", name);
//   const xhr = new XMLHttpRequest();
//   const url = "https://sendmail.rf.htu.edu.gh/sendEmail.php";
//   xhr.open("POST", url);
//   xhr.onreadystatechange = someHandler;
//   xhr.send();
//   // Send the email using fetch API
//   fetch("https://sendmail.rf.htu.edu.gh/sendymail.php", {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: name,
//       submit: true,
//     })
//   })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         // Email sent successfully
//         console.log("success", data.message);
//         redirect("https://tsuks-marvelous-project.webflow.io/agent-login");
//       } else {
//         // Email sending failed
//         console.log("error", data.message);
//       }
//     })
//     .catch(error => {
//       console.error("Error sending email:", error);
//       console.log("error", "An error occurred while sending the email.");
//     });
// }

//   <script>
//   let register_toke = $('#register_toke')
// document.getElementById('generate_toke').addEventListener('submit', function (event) {
//   alert('Thanks for signing up to be an agent. Your application will be reviewed and hopefully approved by our team shortly.');
  // const xhr = new XMLHttpRequest();
  // const url = "https://sendmail.rf.htu.edu.gh/sendymail.php";
  // xhr.open("POST", url);
  // xhr.onreadystatechange = someHandler;
  // xhr.send();
//   event.preventDefault();
//   $.ajax({
//     url: url,
//     type: 'post',
//     dataType: 'json',
//     cache: false,
//     contentType: false,
//     processData: false,
//     data: new FormData(this),
//     success: function (res) {
//       if (res.status === 201) {
//         alert('success', res.message)
//         redirect('https://tsuks-marvelous-project.webflow.io/agent-login')
//       }
//     }
//   })
// })
// </script>

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
        // User signed out successfullyee
        window.location.href = "agent-login";
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }

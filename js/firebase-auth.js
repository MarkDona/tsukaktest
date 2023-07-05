function login() {
    var email = document.getElementById("emailInput").value;
    var password = document.getElementById("passwordInput").value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed in successfully
        var user = userCredential.user;
        agentID = user.uid;

        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        // Handle sign-in errors
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error('Sign in error:', errorCode, errorMessage);
      });

  }

  // Function to redirect to the next page with the user ID
  function redirectToNextPage() {
    var nextPageUrl = "dashboard.html";
    window.location.href = nextPageUrl;
  }
  
  function signup() {
    var email = document.getElementById("signupEmailInput").value;
    var password = document.getElementById("signupPasswordInput").value;
    var name = document.getElementById("nameInput").value;
    var phone = document.getElementById("phoneInput").value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed up successfully

        var user = userCredential.user;
        var agentID = user.uid;

        var databaseRef = firebase.database().ref("/agents/" + agentID);
  
        var newDataRef = databaseRef;
        newDataRef.set({
          agentName: name,
          agentEmail: email,
          agentPhone: phone
        })
        .then(function() {
          console.log("Data submitted successfully!");
          window.location.href = "dashboard.html"; 
        })
        .catch(function(error) {
          console.log("Error submitting data: ", error);
        });
            
      })
      .catch((error) => {
        // Handle signup errors
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error('Signup error:', errorCode, errorMessage);
      });
      
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


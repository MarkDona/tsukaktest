function login() {
    var email = document.getElementById("emailInput").value;
    var password = document.getElementById("passwordInput").value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed in successfully
        window.location.href = "admin-home";
      })
      .catch((error) => {
        // Handle sign-in errors
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error('Sign in error:', errorCode, errorMessage);
      });

  }

  
  function logout() {
    firebase.auth().signOut()
      .then(() => {
        // User signed out successfully
        window.location.href = "login.html";
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }

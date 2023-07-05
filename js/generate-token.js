var agentID = "";
var newTokenKey = "";
   function generateToken() {
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var token = "";

      for (var i = 0; i < 8; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
      }

      return token;
    }

    function saveTokenToFirebase(token, candidateName, candidateEmail) {

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          agentID = user.uid;
          console.log("AgentID: " + agentID);

          var tokenData = {
          token: token,
          candidateName: candidateName,
          candidateEmail: candidateEmail,
          linkWithToken: `https://tsuks-marvelous-project.webflow.io/application-landing-page`,
          linkStatus: 'Copied',
          tokenStatus: 'Active'
        };

        newTokenKey = firebase.database().ref().child('tokens').push().key;
        
        // Get The Newly Generated Link for Emailing 
        var fullLink = `https://tsuks-marvelous-project.webflow.io/application-landing-page?agentID=` +agentID+'&tokenID=' +newTokenKey;
        document.getElementById("generated-link").value = fullLink;
        
        
        var updates = {};
        updates['/tokens/' + newTokenKey] = tokenData;
        firebase.database().ref('agents/' + agentID).update(updates);
        console.log("New Key:" + newTokenKey);

        generateLink(newTokenKey);
        return newTokenKey;
        } 
      });
      
    }


    function getCandidateData(){
       var candidateName = document.getElementById("candidate-name").value;
       var candidateEmail = document.getElementById("candidate-email").value;

       if (candidateName.length < 5) {
        alert("Candidate Name should have a minimum of 5 characters.");
        return;
      }

      if (!isValidEmail(candidateEmail)) {
        alert("Candidate Email should be a valid email address.");
        return;
      }

       var token = generateToken();
       saveTokenToFirebase(token, candidateName, candidateEmail);
     }
 
    onfocus = function () {location.reload (true)}

    function showPopup() {
      var popupContainer = document.querySelector(".popup-container");
      popupContainer.style.display = "block";
    }

    function closePopup() {
      var popupContainer = document.querySelector(".popup-container");
      popupContainer.style.display = "none";
    }


    function generateLink(newTokenKey) {
     
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          agentID = user.uid;
          console.log("AgentID: " + agentID);


          var link = "https://tsuks-marvelous-project.webflow.io/application-landing-page" + "?agentID=" + agentID + "&" + "tokenID=" + newTokenKey;
          
          var linkContainer = document.getElementById("link-container");
          var linkElement = document.getElementById("link");
          var copyButton = document.getElementById("copy-button");
          
          //Push candidate link value 
          document.getElementById("generated-link").value = link;

          //Copy of link sent to agent
          document.getElementById("agent-email").value = user.email;

          console.log("Link to mail:" + link);
          console.log("New TokenID: " + newTokenKey);
          console.log("Agent ID: " + agentID);

          linkElement.textContent = link;
          linkContainer.style.display = "block";
          copyButton.style.display = "block";
        }
        
      });
    }

    function isValidEmail(email) {
      // Simple email format validation
      var emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(email);
    }

    function copyLink() {
      var linkElement = document.getElementById("link");
      var link = linkElement.textContent;

      // Copy the link to the clipboard
      navigator.clipboard.writeText(link).then(function() {
        console.log("Link copied to clipboard: " + link);
      });
    }
    
    // Prevent copying of "LinkWithToken" from the table
    document.addEventListener('DOMContentLoaded', function() {
      var uncopyableCells = document.getElementsByClassName('uncopyable');

      Array.from(uncopyableCells).forEach(function(cell) {
        cell.addEventListener('copy', function(event) {
          event.preventDefault();
          return false;
        });
      });
    });


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
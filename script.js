document.addEventListener("DOMContentLoaded", function() {
    var generateLinkButton = document.getElementById("generate-link-button");
    var copyLinkButton = document.getElementById("copy-link-button");
    var linkContainer = document.getElementById("link-container");
    var tokenTable = document.getElementById("token-table");
  
    generateLinkButton.addEventListener("click", function() {
      var candidateName = document.getElementById("candidate-name").value;
      var candidateEmail = document.getElementById("candidate-email").value;
      var token = generateToken();
      var linkWithToken = "https://tsuk.enaitchdevelopers.com/" + token;
  
      // Save token details to the database
      saveTokenToDatabase(token, linkWithToken, candidateName, candidateEmail, "Active");
  
      // Display the link and copy button
      linkContainer.innerHTML = "<p><a href='" + linkWithToken + "'>" + linkWithToken + "</a></p>";
      linkContainer.innerHTML += "<button id='copy-link-button'>Copy Link</button>";
    });
  
    linkContainer.addEventListener("click", function(event) {
      if (event.target.id === "copy-link-button") {
        var link = linkContainer.querySelector("a");
        copyLinkToClipboard(link.href);
        displayTokenTable();
      }
    });
  
    function generateToken() {
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var token = "";
  
      for (var i = 0; i < 8; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
      }
  
      return token;
    }
  
    function saveTokenToDatabase(token, linkWithToken, candidateName, candidateEmail, tokenStatus) {
      // Save token details to the database
      // Implement your code to save data to the database here
    }
  
    function copyLinkToClipboard(link) {
      var tempInput = document.createElement("input");
      tempInput.value = link;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    }
  
    function displayTokenTable() {
      // Fetch token data from the database
      // Implement your code to fetch data from the database here
  
      // Example data (replace with your database data)
      var tokenData = [
        { tokenId: "1", token: "ABC123", linkWithToken: "https://tsuk.enaitchdevelopers.com/ABC123", linkStatus: "Yes", candidateName: "John Doe", candidateEmail: "john@example.com", tokenStatus: "Active" },
        { tokenId: "2", token: "DEF456", linkWithToken: "https://tsuk.enaitchdevelopers.com/DEF456", linkStatus: "Yes", candidateName: "Jane Smith", candidateEmail: "jane@example.com", tokenStatus: "Active" }
      ];
  
      // Generate the token table
      var tableRows = "";
      tableRows += "<tr><th>TokenID</th><th>Token</th><th>LinkWithToken</th><th>Link Status</th><th>Candidate Name</th><th>Candidate Email</th><th>Token Status</th></tr>";
  
      for (var i = 0; i < tokenData.length; i++) {
        var row = tokenData[i];
        tableRows += "<tr>";
        tableRows += "<td>" + row.tokenId + "</td>";
        tableRows += "<td>" + row.token + "</td>";
        tableRows += "<td>" + row.linkWithToken + "</td>";
        tableRows += "<td>" + row.linkStatus + "</td>";
        tableRows += "<td>" + row.candidateName + "</td>";
        tableRows += "<td>" + row.candidateEmail + "</td>";
        tableRows += "<td>" + row.tokenStatus + "</td>";
        tableRows += "</tr>";
      }
  
      tokenTable.innerHTML = tableRows;
    }
  });
  
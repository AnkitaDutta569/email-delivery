(function () {
    emailjs.init("7x-TOaM8f3nbpSKn1"); // replace with your actual user ID
  })();

  function sendEmails() {
    var senderEmail = document.getElementById("senderEmail").value;
    var message = document.getElementById("message").value;
    var subject = document.getElementById("subject").value;

    var validEmails = [];
    var invalidEmails = [];

    // Read contents of CSV file
    var file = document.getElementById("csvFile").files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
      var csv = event.target.result;
      var lines = csv.split('\n');
      for (var i = 0; i < lines.length; i++) {
        var email = lines[i].trim();
        var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/
          ;
        if (emailRegex.test(email)) {
          validEmails.push(email);
        } else {
          invalidEmails.push(email);
        }
      }



      // Send email to valid email addresses
      for (var j = 0; j < validEmails.length; j++) {
        var templateParams = {
          to_name: validEmails[j],
          from_name: senderEmail,
          message_html: message,
          subject_html: subject
        };

        // Replace you Service ID ↓ and  Template ID ↓ here.
        emailjs.send('service_6sn2lis', 'template_emsafpf', templateParams)
          .then(function (response) {
            console.log("SUCCESS", response);
          }, function (error) {
            console.log("FAILED", error);
          });
      }

      alert("Emails sent to valid email addresses.");
    };
  }

  
  document.getElementById("csvFile").addEventListener("change", function () {
    var validEmails = [];
    var invalidEmails = [];

    // Read contents of CSV file
    var file = document.getElementById("csvFile").files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
      var csv = event.target.result;
      var lines = csv.split('\n');
      for (var i = 0; i < lines.length; i++) {
        var email = lines[i].trim();
        var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/
          ;
        if (emailRegex.test(email)) {
          validEmails.push(email);
        } else {
          invalidEmails.push(email);
        }
      }

      // Display valid and invalid emails
      document.getElementById("validEmails").innerHTML = validEmails.join("<br><br>");
      document.getElementById("invalidEmails").innerHTML = invalidEmails.join("<br><br>");
      document.getElementById("validEmailCount").innerText = "(" + validEmails.length + ")";
      document.getElementById("invalidEmailCount").innerText = "(" + invalidEmails.length + ")";
    };
  });

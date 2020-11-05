$(document).ready(function() {
    // Getting references to our form and input
    const signUpForm = $("form.signup");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");
    const usernameInput = $("input#username-input");
  
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event, res) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim(),
        username: usernameInput.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password, userData.username);
      emailInput.val("");
      passwordInput.val("");
      usernameInput.val("");
      $("input#password-input2").val("");
    })    .then(function() {
      res.redirect(307, "/");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password, username) {
      $.post("/api/signup", {
        email: email,
        password: password,
        username: username
      })
        .then(function(req,res) {
          res.redirect(307, "/");
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $(".fi-alert").text(err.responseJSON);
      $(".fi-alert").fadeIn(500);
    }
  });
  
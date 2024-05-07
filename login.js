const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});


// document.addEventListener('DOMContentLoaded', function() {

//   const signUpForm = document.querySelector('.sign-up-container form');
//   const signInForm = document.querySelector('.sign-in-container form');

//   signUpForm.addEventListener('submit', function(e) {
//       e.preventDefault();
//       const name = signUpForm.querySelector('input[name="name"]').value;
//       const email = signUpForm.querySelector('input[name="email"]').value;
//       const password = signUpForm.querySelector('input[name="password"]').value;
//       const userData = {
//           name: name,
//           email: email,
//           password: password
//       };
//       localStorage.setItem('userData', JSON.stringify(userData));
//       signUpForm.submit();
//   });

//   signInForm.addEventListener('submit', function(e) {
//       e.preventDefault();
//       const email = signInForm.querySelector('input[name="email"]').value;
//       const password = signInForm.querySelector('input[name="password"]').value;
//       const userData = JSON.parse(localStorage.getItem('userData'));
//       if(userData && userData.email === email && userData.password === password) {
//           alert('Login successful!');
//       } else {
//           alert('Invalid email or password.');
//       }
//   });
// });

var isDupUser = false;

// ======================================================================

$(document).ready(function()
{

    $("#regEmail").blur(function()
    {

        var Email = $("#regEmail").val();

        var obj = {

            url : "/checkDupUser",
            type : "get",

            data : {
                uEmail : Email
            }

        }

        $.ajax(obj).done(function(resp)
        {
            if(resp == "Email Already Exists !")
            {
                alert("Email Already Exits !");
                isDupUser = true;
            }
            else
            {
                isDupUser = false;
            }
        })
        .fail(function(err)
        {
            alert(JSON.stringify(err));
        })

    });

    $("#regBTN").click(function()
    {

        var Name = $("#regName").val();
        var Email = $("#regEmail").val();
        var Pass = $("#regPass").val();


        if(Name == "" || Email == "" || Pass == "")
          alert("Enter The Details");


        if(Name && Email && Pass && !isDupUser)
        {


            var obj = {

                type : "get",
                url : "/regAUTH",

                data : {
                    uName : Name,
                    uEmail : Email,
                    uPass : Pass,
                }

            }

            $.ajax(obj).done(function(resp)
            {
                alert(resp);
                window.location.href = "/";
            })
            .fail(function(err)
            {
                alert(JSON.stringify(err));
            })

        }


    });


    $("#loginAuthBtn").click( () => {

      var Email = $("#loginAuthEmail").val();
      var pwd = $("#loginAuthPass").val();

      
      if(!Email || !pwd)
        alert("Enter Your Details");
      
      if(Email && pwd)
      {
          var obj = {

              type : "get",
              url : "/loginAuth",

              data : {
                  uEmail : Email,
                  uPwd : pwd
              }

          }

          $.ajax(obj).done( (resp) => {

              if(resp == "!yesLogin!")
              {
                  localStorage.setItem("email", Email);
                  window.location.href = "/";
                  return;
              }

              alert(JSON.stringify(resp));
          })
          .fail( (err) => {
              alert(JSON.stringify(err));
          })
      }

  });

})
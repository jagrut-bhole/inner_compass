//login and sign-up script code
const form = document.querySelector("form");

//errors
const FnameError = document.querySelector(".firstname.error");
const LnameError = document.querySelector(".lastname.error");
const emailError = document.querySelector(".email.error");
const usernameError = document.querySelector(".username.error");
const passwordError = document.querySelector(".password.error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // reset errors
  FnameError.textContent = "";
  LnameError.textContent = "";
  usernameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";

  //getting values (using form.elements to get the values correctly)
  const Fname = form.elements.firstname.value;
  const Lname = form.elements.lastname.value;
  const username = form.elements.username.value;
  const email = form.elements.email.value;
  const password = form.elements.password.value;

  try {
    const res = await fetch("/signup", {
      method: "POST",
      body: JSON.stringify({
        Fname,     // Use Fname and Lname properly here
        Lname,
        username,
        email,
        password,
      }),
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    
    // handle errors
    if (data.errors) {
      FnameError.textContent = data.errors.Fname;
      LnameError.textContent = data.errors.Lname;
      emailError.textContent = data.errors.email;
      usernameError.textContent = data.errors.username;
      passwordError.textContent = data.errors.password;
    }
    
    // redirect if user created successfully
    if (data.user) {
      location.assign("/");
    }
  } catch (err) {
    console.error(err);
  }
});

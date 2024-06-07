window.addEventListener("load", (event) => {

  const submit = document.getElementById("contact-submit")
  const datePickerId = document.getElementById("dob")
  const name = document.getElementById("name")
  const username = document.getElementById("username")
  const email = document.getElementById("email")


  datePickerId.max = new Date().toISOString().split("T")[0];

});
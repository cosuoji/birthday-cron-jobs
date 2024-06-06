window.addEventListener("load", (event) => {

  const submit = document.getElementById("contact-submit")
  const datePickerId = document.getElementById("dob")
  const name = document.getElementById("name")
  const username = document.getElementById("username")
  const email = document.getElementById("email")


  datePickerId.max = new Date().toISOString().split("T")[0];


  // submit.addEventListener("click", event=>{
   
  //  console.log(dob.value, name.value, username.value, email.value)

  //  fetch("/", {
  //   method: "POST",
  //   body: JSON.stringify({
  //      dob: dob.value,
  //      name: name.value, 
  //      username: username.value, 
  //      email: email.value
  //   }),
  //       headers: {
  //           "Content-type": "application/json; charset=UTF-8"
  //       }
  //   })
  //       .then((response) => response.json())
  //       .then((json) => console.log(json));                   
  // })

});
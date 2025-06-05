document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-contact");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Your request has been received! Thank you.");
      form.reset();
    });
  }
});

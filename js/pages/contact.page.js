document.addEventListener("DOMContentLoaded", function () {
  const sendBtn = document.getElementById("sendBtn");
  const form = document.querySelector(".form-contact");
  const message = document.getElementById("formMessage");
  const submitImage = document.getElementById("submitImage");

  sendBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const text = document.getElementById("message").value.trim();

    if (!name || !email || !phone || !text) {
      alert("Please fill in all the fields before submitting.");
      return;
    }

    message.style.display = "block";

    submitImage.style.display = "block";
    submitImage.style.animation = "none";
    submitImage.offsetHeight; // force reflow
    submitImage.style.animation = "grow 2s ease-in-out forwards";

    form.reset();

    setTimeout(() => {
      message.style.display = "none";
      submitImage.style.display = "none";
    }, 5000);
  });
});

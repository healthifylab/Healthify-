// ✅ EmailJS Contact Form Handler

window.addEventListener("DOMContentLoaded", function () {
  emailjs.init("E4ASdX9FG6gKnzEYF"); // Your EmailJS user ID

  const form = document.getElementById("contactForm");
  const msg = document.getElementById("msg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.send("service_mh0mc3m", "template_yxxr7kc", {
      name: form.name.value,
      email: form.email.value,
      query: form.query.value,
    })
    .then(() => {
      msg.innerHTML = "✅ Your message has been sent successfully!";
      form.reset();
    })
    .catch((err) => {
      msg.innerHTML = "❌ Failed to send message. Please try again later.";
      console.error("EmailJS Error:", err);
    });
  });
});

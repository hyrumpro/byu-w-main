function isFirstVisit() {
  return !localStorage.getItem("visited");
}


function showModal() {
  const modal = document.getElementById("first-visit-modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("first-visit-modal");
  modal.style.display = "none";
}


document.querySelector(".close-button").addEventListener("click", closeModal);


window.addEventListener("click", function(event) {
  const modal = document.getElementById("first-visit-modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

if (isFirstVisit()) {
  showModal();
  localStorage.setItem("visited", "true");
}

document.getElementById("register-button").addEventListener("click", function() {
  window.location.href = "https://forms.gle/wNEzjKmdRZMMbgji7";
});

// Event listener for the newsletter form submission
document.getElementById("newsletter-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  alert(`Thank you for subscribing with ${email}!`);
});

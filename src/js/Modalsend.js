function isFirstVisit() {
  return !localStorage.getItem("visited");
}

// Function to show the modal
function showModal() {
  const modal = document.getElementById("first-visit-modal");
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("first-visit-modal");
  modal.style.display = "none";
}

// Event listener for the close button
document.querySelector(".close-button").addEventListener("click", closeModal);

// Event listener for clicks outside the modal
window.addEventListener("click", function(event) {
  const modal = document.getElementById("first-visit-modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Show the modal if it's the user's first visit
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

document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("tutorial-popup");
    const closeButton = document.querySelector(".close-button");
    const tutorialButton = document.getElementById("tutorial-button");
  
    function openPopup() {
      popup.style.display = "block";
    }
  
    function closePopup() {
      popup.style.display = "none";
    }
  
    closeButton.addEventListener("click", closePopup);

  
    tutorialButton.addEventListener("click", openPopup);
  });
  
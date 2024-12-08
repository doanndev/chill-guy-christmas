// script.js
function handleScroll() {
    const sections = document.querySelectorAll(".hidden, .visible");
    const triggerBottom = window.innerHeight * 0.8;
  
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;
  
      if (sectionTop < triggerBottom && sectionBottom > 0) {
        // Phần tử trong vùng nhìn thấy
        section.classList.add("visible");
        if (section.classList.contains("left")) {
          section.classList.remove("left");
        }
        if (section.classList.contains("right")) {
          section.classList.remove("right");
        }
      } 
    //   else {
    //     section.classList.remove("visible");
    //     if (!section.classList.contains("left") && !section.classList.contains("right")) {
    //       if (section.dataset.side === "left") {
    //         section.classList.add("left");
    //       } else if (section.dataset.side === "right") {
    //         section.classList.add("right");
    //       }
    //     }
    //   }
    });
  }
  document.addEventListener("DOMContentLoaded", handleScroll);
  document.addEventListener("scroll", handleScroll);
  
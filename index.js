/* REMOVE ANIMATION FOR MOBILE DESIGN */

// Set the threshold width
const maxWidthToRemoveAos = 750; // Adjust this value as needed

// Function to remove data-aos attribute
function removeAosAttribute() {
  // Get all elements with the data-aos attribute
  const elementsWithDataAos = document.querySelectorAll("[data-aos]");

  // Loop through the elements and remove the data-aos attribute
  elementsWithDataAos.forEach((element) => {
    element.removeAttribute("data-aos");
  });
}

/* CArousel setting for responsiveness */

const carouselBtns = document.querySelectorAll(".carousel-buttons input");
const sections = document.querySelectorAll("section");
const optionBtn=document.querySelectorAll(".options>button:first-child");

let currentIndex = 0;
let sectionsViewed = 0;
let autoScrollInterval;
/* AUTOMATIC SCROLLING */
const scrollToNextSection = () => {
  // Increment the index to get the next section
  currentIndex = (currentIndex + 1) % carouselBtns.length;

  // Trigger the change event on the next radio button
  carouselBtns[currentIndex].click();
  sectionsViewed++;
  // Check if all sections have been viewed, and stop the interval if true
  if (sectionsViewed === carouselBtns.length) {
    clearInterval(autoScrollInterval);
  }
};

// Check width on initial load
if (window.innerWidth < maxWidthToRemoveAos) {
  autoScrollInterval = setInterval(scrollToNextSection, 5000);

  removeAosAttribute();
}else{
  clearInterval(autoScrollInterval);

}

// Check width on window resize
window.addEventListener("resize", function () {

  if (window.innerWidth < maxWidthToRemoveAos) {
    // Set an interval for auto-scrolling (change the delay as needed)
    removeAosAttribute();
  }
});

// Initialize an Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.id.replace("section", "");
      const correspondingBtn = document.getElementById(sectionId);

      if (entry.isIntersecting) {
        // Add "active" class to the corresponding button
        correspondingBtn.classList.add("active");
      } else {
        // Remove "active" class from the corresponding button
        correspondingBtn.classList.remove("active");
      }
    });
  },
  { threshold: 0.5 }
);

// Observe each section
sections.forEach((section) => {
  observer.observe(section);
});

// Add event listener to radio carouselBtns
carouselBtns.forEach((btn) => {
  btn.addEventListener("change", (e) => {
    // Remove "active" class from all carouselBtns
    carouselBtns.forEach((otherBtn) => {
      otherBtn.classList.remove("active");
    });

    // Add "active" class to the clicked button if checked
    if (e.target.checked) {
      e.target.classList.add("active");

      // Get the ID of the clicked radio button
      const radioId = e.target.id;

      // Find the corresponding section and add a class to it
      const matchingSection = document.querySelector(`#section${radioId}`);
      if (matchingSection) {
        matchingSection.classList.add("active-section");

        // Scroll to the corresponding section horizontally
        matchingSection.scrollIntoView({ behavior: "smooth", inline: "start" });
      }
    }
  });
});

// This code for when user click on dots of svg then change section

const svgs = document.querySelectorAll(".transring");
const dots = document.querySelectorAll("svg .dots-nav");

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    let prefix = "dots";
    const dotId = dot.id;
    console.log(dotId);
    let currentId = dotId.substring(prefix.length);
    // Assuming carouselBtns is an array of carousel buttons
    console.log(currentId);
    for (let btn of carouselBtns) {
      if (currentId === btn.id) {
        btn.click();
      }
    }
  });
});

// Add a scroll event listener to detect the active section
document.addEventListener("scroll", () => {
  let currentSection = null;

  // Find the currently active section based on its position in the viewport
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      currentSection = section;
      break;
    }
  }

  // Reset colors for all dots and lines

  // Set colors for dots and lines in the active section
  if (currentSection) {
    const optionBtn=currentSection.querySelector(".options>button:first-child");
    const currentSvg = currentSection.querySelector(".transring");
    const sectionId = currentSection.id; // section ID is "section1", "section2", etc.

optionBtn.style.animation="scale .5s ease-in";//adding animation on option btn
setTimeout(()=>{
  optionBtn.style.animation="none";//removing animation for adding animation again when needed

},5000)
    // Extract numeric part from the section ID using parseInt
    const sectionNumber = parseInt(sectionId.replace("section", ""), 10);
    const dots = currentSvg.querySelectorAll(".dots-nav .circ path");
    const dotStro = currentSvg.querySelectorAll(".dots-nav .dotsstro");

    const transRing = currentSvg.querySelector(".transrgwht");
    transRing.style.strokeDasharray = `${
      (sectionNumber - 1) * (130 + sectionNumber)
    }, 1000`;

    var i = 0;
    while (i < sectionNumber) {
      console.log(dots[i], i);
      dots[i].style.fill = "skyblue";
      dotStro[i].style.stroke = "rgb(255, 255, 255)";

      i++;
    }
  }
});

// Trigger the scroll event to initialize colors on page load
document.dispatchEvent(new Event("scroll"));

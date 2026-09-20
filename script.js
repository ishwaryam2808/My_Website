
/* =========================================
   CURRENT YEAR
========================================= */

const currentYear = new Date().getFullYear();

document.querySelector("footer p").innerHTML =
    `© ${currentYear} Iceee. Built with curiosity & code.`;


/* =========================================
   SCROLL TO TOP BUTTON
========================================= */

const scrollTopButton = document.createElement("button");

scrollTopButton.textContent = "↑";

scrollTopButton.id = "scrollTop";

document.body.appendChild(scrollTopButton);


/* Show button after scrolling */

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        scrollTopButton.classList.add("show");
    } else {
        scrollTopButton.classList.remove("show");
    }

});


/* Scroll to top */

scrollTopButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

const header = document.querySelector("header");

// --------- Sticky NavBar --------- //

function stickyNavBar() {
    header.classList.toggle("scrolled", window.pageYOffset > 0);
}

// --------- Observer Animations --------- //

// window.addEventListener("scroll", stickyNavBar);

// function createIntersectionObserver(classToToggle) {
//     return new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//             console.log(entry);
//             if (entry.isIntersecting) {
//                 entry.target.classList.add(classToToggle);
//                 observerCard.unobserve(entry.target);
//             } else {
//                 entry.target.classList.remove(classToToggle);
//             }
//         });
//     });
// }

// const observerShowCaseImage = createIntersectionObserver('show-showcase-image');
// const hiddenElementsShowCaseImage = document.querySelectorAll(".showcase-image");
// hiddenElementsShowCaseImage.forEach((el) => observerShowCaseImage.observe(el));
// // 
// const observerShowCaseInfo = createIntersectionObserver('show-showcase-info');
// const hiddenElementsShowCaseInfo = document.querySelectorAll(".showcase-info");
// hiddenElementsShowCaseInfo.forEach((el) => observerShowCaseInfo.observe(el));

// --------- Reveal Animations --------- //

let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: "top", delay: 700 });
const header = document.querySelector("header");
const first_skill = document.querySelector(".skill:first-child");

const sk_progress = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");

const prt_section = document.querySelector(".portfolio");
const zoom_icon = document.querySelectorAll(".zoom-icon");
const model_overlay = document.querySelector(".model-overlay");
const images = document.querySelectorAll(".images img");
const videos = document.querySelectorAll(".images video");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

const links = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  activeLink();
  if (!skillsPlayed) skillsCounter();
  if (!mlPlayed) mlCounters();
});

function updateCount(num, maxNum) {
  let currentNum = +num.innerText;

  if (currentNum < maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() => {
      updateCount(num, maxNum);
    }, 12);
  }
}

// --------- Sticky NavBar --------- //

function stickyNavBar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}

window.addEventListener("scroll", stickyNavBar);

// --------- Observer Animations --------- //

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

// --------- Skills Progress Bar Animations --------- //

function hasReached(el) {
  let topPosition = el.getBoundingClientRect().top;

  if (window.innerHeight >= topPosition + el.offsetHeight) return true;

  return false;
}

let skillsPlayed = false;

function skillsCounter() {
  if (!hasReached(first_skill)) return;

  let skillsPlayed = true;

  sk_progress.forEach((counter, i) => {
    let target = +counter.dataset.target;
    let strokeValue = 427 - 427 * (target / 100);

    progress_bars[i].style.setProperty("--target", strokeValue);

    setTimeout(() => {
      updateCount(counter, target);
    }, 400);
  });

  progress_bars.forEach((p) => {
    p.style.animation = "progress 2s ease-in-out forwards";
  });
}

// --------- Services Counter Animations --------- //

let mlPlayed = false;

function mlCounters() {
  if (!hasReached(ml_section)) return;

  mlPlayed = true;

  ml_counters.forEach((ctr) => {
    let target = +ctr.dataset.target;
    setTimeout(() => {
      updateCount(ctr, target);
    }, 400);
  });
}

// --------- Portfolio Filter Animations --------- //

let mixer = mixitup(".portfolio-gallery", {
  selectors: {
    target: ".prt-card",
  },
  animation: {
    duration: 500,
  },
});

// --------- Model PopUp Animations --------- //

let currentIndex = 0;

zoom_icon.forEach((ico, i) =>
  ico.addEventListener("click", () => {
    prt_section.classList.add("open");
    document.body.classList.add("stopScrolling");
    currentIndex = i;
    changeImage(currentIndex);
    changeVideo(currentIndex);
  })
);

model_overlay.addEventListener("click", () => {
  prt_section.classList.remove("open");
  document.body.classList.remove("stopScrolling");
});

prev_btn.addEventListener("click", (event) => {
  event.stopPropagation(); // منع انتقال الحدث إلى العنصر الأعلى (مثل السلايدر)
  if (currentIndex === 0) {
    currentIndex = 3;
  } else {
    currentIndex--;
  }
  changeImage(currentIndex);
  changeVideo(currentIndex);
});

next_btn.addEventListener("click", (event) => {
  event.stopPropagation(); // منع انتقال الحدث إلى العنصر الأعلى (مثل السلايدر)
  if (currentIndex === 3) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  changeImage(currentIndex);
  changeVideo(currentIndex);
});

function changeImage(index) {
  images.forEach((img) => img.classList.remove("showImage"));
  images[index].classList.add("showImage");
}

function changeVideo(index) {
  videos.forEach((video) => video.classList.remove("showVideo"));
  videos[index].classList.add("showVideo");
}
// --------- Swiper Animations --------- //

const swiper = new Swiper(".swiper", {
  loop: true,
  speed: 500,
  autoplay: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// --------- Change Active Link On Scroll --------- //

function activeLink() {
  let sections = document.querySelectorAll("section[id]");
  let passedSections = Array.from(sections)
    .map((sct, i) => {
      return {
        y: sct.getBoundingClientRect().top - header.offsetHeight,
        id: i,
      };
    })
    .filter((sct) => sct.y <= 0);
  let currSectionId = passedSections.at(-1).id;

  links.forEach((l) => l.classList.remove("active"));
  links[currSectionId].classList.add("active");
}

activeLink();

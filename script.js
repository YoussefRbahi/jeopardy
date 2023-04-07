const container = document.getElementById("container");
const titles = document.getElementById("titles");
const categories = ["1.json", "2.json", "3.json", "4.json", "5.json", "6.json"];
const amounts = ["200", "400", "600", "800", "1000"];

async function addCat(catFile) {
  const response = await fetch(`/categories/${catFile}`);
  const category = await response.json();
  const questions = category.questions.map((q) => {
    const id = `q${q.id}`;
    return `<div class="question" id="${id}" data-state="0"><p class="que">${q.question}</p><p class="answer">${q.answer}</p></div>`;
  });
  const oneCat = `<div class="category">${questions.join("")}</div>`;
  const oneTitle = `<div class="title">${category.name}</a>`;
  container.innerHTML += oneCat;
  titles.innerHTML += oneTitle;
}

async function loadBoard() {
  for (let i = 0; i < categories.length; i++) {
    await addCat(categories[i]);
  }
}

loadBoard();

window.addEventListener("DOMContentLoaded", function () {
  container.addEventListener("click", function (event) {
    const question = event.target.closest(".question");
    if (question) {
      const state = parseInt(question.getAttribute("data-state"));
      if (state === 0) {
        question.classList.add("big");
        question.setAttribute("data-state", "1");
      } else if (state === 1) {
        const answer = question.querySelector(".answer");
        question.querySelector(".que").innerHTML = answer.innerHTML;
        question.setAttribute("data-state", "2");
      } else {
        question.classList.remove("big");
        question.classList.add("disabled");
        question.setAttribute("data-state", "3");
      }
    }
  });
});

// const container = document.getElementById("container");
// const titles = document.getElementById("titles");
// const categories = ["1.json", "2.json", "3.json", "4.json", "5.json", "6.json"];
// const amounts = ["200", "400", "600", "800", "1000"];

// async function addCat(catFile) {
//   const response = await fetch(`/categories/${catFile}`);
//   const category = await response.json();
//   const questions = category.questions.map(
//     (q) => `<div class="question"><p>${q.question}</p></div>`
//   );
//   const oneCat = `<div class="category">${questions.join("")}</div>`;
//   const oneTitle = `<div class="title">${category.name}</a>`;
//   container.innerHTML += oneCat;
//   titles.innerHTML += oneTitle;
// }

// async function loadBoard() {
//   for (let i = 0; i < categories.length; i++) {
//     await addCat(categories[i]);
//   }
//   fixPos();
// }

// loadBoard();

// function fixPos() {
//   window.addEventListener("DOMContentLoaded", function () {
//     const elements = document.querySelectorAll(".question");
//     elements.forEach((element) => {
//       const rect = element.getBoundingClientRect();
//       element.style.position = "fixed";
//       element.style.top = `${rect.top}px`;
//       element.style.left = `0px`;
//       element.style.color = "red";
//     });
//   });
// }
// window.addEventListener("DOMContentLoaded", function () {
//   container.addEventListener("click", function (event) {
//     if (event.target.classList.contains("question")) {
//       if (event.target.classList.contains("big")) {
//         event.target.classList.add("disabled");

//         event.target.classList.remove("big");
//       } else {
//         event.target.classList.add("big");
//       }
//     } else if (event.target.parentElement.classList.contains("question")) {
//       if (event.target.parentElement.classList.contains("big")) {
//         event.target.parentElement.classList.add("disabled");
//         event.target.parentElement.classList.remove("big");
//       } else {
//         event.target.parentElement.classList.add("big");
//       }
//     }
//   });
// });

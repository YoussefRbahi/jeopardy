const container = document.getElementById("container");
const titles = document.getElementById("titles");
const categories = ["1.json", "2.json", "3.json", "4.json", "5.json", "6.json"];
const amounts = ["200", "400", "600", "800", "1000"];

async function addCat(catFile) {
  const response = await fetch(`/categories/${catFile}`);
  const category = await response.json();
  const questions = category.questions.map((q, i) => {
    const id = `q${q}`;
    return `<div class="qna" data-state="0"><p class="amount">${amounts[i]}</p><p class="question">${q.question}</p><p class="answer">${q.answer}</p></div>`;
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
    const qna = event.target.closest(".qna");
    if (qna) {
      const state = parseInt(qna.getAttribute("data-state"));
      if (state === 0) {
        qna.children[1].classList.toggle("question");
        qna.classList.add("big");
        qna.children[0].classList.toggle("question");
        qna.setAttribute("data-state", "1");
      } else if (state === 1) {
        const answer = qna.querySelector(".answer");
        qna.children[1].innerHTML = answer.innerHTML;
        qna.setAttribute("data-state", "2");
      } else {
        qna.classList.remove("big");
        qna.classList.add("disabled");
        qna.setAttribute("data-state", "3");
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

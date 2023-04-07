// Variables
const container = document.getElementById("container");
const titles = document.getElementById("titles");
const categories = ["1.json", "2.json", "3.json", "4.json", "5.json", "6.json"];
const amounts = ["200", "400", "600", "800", "1000"];
const currency = "$";

// Function to add a category
async function addCat(catFile) {
  const response = await fetch(`/categories/${catFile}`);
  const category = await response.json();
  const questions = category.questions.map((q, i) => {
    const id = `q${q}`;
    return `<div class="qna" data-state="0"><p class="amount"><span class="currency">${currency}</span>${amounts[i]}</p><p class="question">${q.question}</p><p class="answer">${q.answer}</p></div>`;
  });
  const oneCat = `<div class="category">${questions.join("")}</div>`;
  const oneTitle = `<div class="title">${category.name}</a>`;
  container.innerHTML += oneCat;
  titles.innerHTML += oneTitle;
}

// Function to load the board with categories and questions
async function loadBoard() {
  for (let i = 0; i < categories.length; i++) {
    await addCat(categories[i]);
  }
}

// Load the board when the page is loaded
loadBoard();

// Add event listener for when a question is clicked
window.addEventListener("DOMContentLoaded", function () {
  container.addEventListener("click", function (event) {
    const qna = event.target.closest(".qna");
    if (qna) {
      // Remove the dollar amount when a question is clicked
      qna.children[0].classList.remove("amount");
      const state = parseInt(qna.getAttribute("data-state"));
      if (state === 0) {
        // Show the question when it's clicked
        qna.children[1].classList.toggle("question");
        qna.classList.add("big");
        qna.children[0].classList.toggle("question");
        qna.setAttribute("data-state", "1");
      } else if (state === 1) {
        // Show the answer when the question is clicked a second time
        const answer = qna.querySelector(".answer");
        qna.children[1].innerHTML = answer.innerHTML;
        qna.setAttribute("data-state", "2");
      } else {
        // Disable the question when it's clicked a third time
        qna.classList.remove("big");
        qna.classList.add("disabled");
        qna.setAttribute("data-state", "3");
      }
    }
  });
});

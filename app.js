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
  const oneTitle = `<div class="title">${category.name}</dive>`;
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
      if (state == 0) {
        // Show the question when it's clicked
        qna.children[1].classList.toggle("question");
        qna.classList.add("big");
        qna.children[0].classList.toggle("question");
        qna.setAttribute("data-state", "1");
      } else if (state == 1) {
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
const mainButton = document.getElementById("b1");
const qTimer = document.getElementById("qTimer");

const buzzer1 = document.getElementById("bz1");
buzzer1.addEventListener("click", function () {
  console.log("haha1");
});

const buzzer2 = document.getElementById("bz2");
buzzer2.addEventListener("click", function () {
  console.log("haha2");
});

const duration = 5;
const interval = 1000;
mainButton.addEventListener("click", function () {
  // Only start the timer if the question has not been clicked yet
  const qna = document.querySelector(".qna[data-state]");
  if (qna) {
    // Set the question state to 1
    qna.setAttribute("data-state", "1");

    // Start the timer
    timerId = setInterval(() => {
      remainingTime--;
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      qTimer.textContent = formattedTime;
      if (remainingTime <= 0) {
        clearInterval(timerId);
        qTimer.textContent = "Start Timer";
        timerFinished = true;
      }
    }, interval);
  }
});

// let remainingTime = duration;
// let timerId = null;
// let timerFinished = false;
// mainButton.addEventListener("click", function () {
//   timerId = setInterval(() => {
//     remainingTime--;
//     const minutes = Math.floor(remainingTime / 60);
//     const seconds = remainingTime % 60;
//     const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//     qTimer.textContent = formattedTime;
//     if (remainingTime <= 0) {
//       clearInterval(timerId);
//       qTimer.textContent = "Start Timer";
//     }
//   }, interval);
// });

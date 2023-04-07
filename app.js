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
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    mainButton.click();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.code === "Numpad1") {
    buzzer1.click();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.code === "Numpad2") {
    buzzer2.click();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.code === "Numpad3") {
    buzzer3.click();
  }
});

// Add event listener for when a question is clicked
window.addEventListener("DOMContentLoaded", function () {
  let currentQna = null;

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

        currentQna = qna;
      }
    }
  });

  mainButton.addEventListener("click", function () {
    if (currentQna && currentQna.getAttribute("data-state") == 1) {
      let timeLeft = 10;
      qTimer.innerHTML = timeLeft;
      const timerInterval = setInterval(function () {
        timeLeft--;
        qTimer.innerHTML = timeLeft;
        if (timeLeft == 0) {
          clearInterval(timerInterval);
          currentQna.setAttribute("data-state", "2");
          const answer = currentQna.querySelector(".answer");
          currentQna.children[1].innerHTML = answer.innerHTML;
        }
      }, 1000);
    } else if (currentQna && currentQna.getAttribute("data-state") == 2) {
      const answer = currentQna.querySelector(".answer");
      currentQna.children[1].innerHTML = answer.innerHTML;
      currentQna.setAttribute("data-state", "3");
    } else if (currentQna && currentQna.getAttribute("data-state") == 3) {
      const answer = currentQna.querySelector(".answer");
      currentQna.children[1].innerHTML = answer.innerHTML;
      currentQna.setAttribute("data-state", "4");
    } else if (currentQna && currentQna.getAttribute("data-state") == 4) {
      // Disable the question when it's clicked a third time
      currentQna.classList.remove("big");
      currentQna.classList.add("disabled");
      currentQna.setAttribute("data-state", "5");
    }
  });
});

const mainButton = document.getElementById("b1");
const qTimer = document.getElementById("qTimer");
const buzzer1 = document.getElementById("bz1");
const buzzer2 = document.getElementById("bz2");
const buzzer3 = document.getElementById("bz3");

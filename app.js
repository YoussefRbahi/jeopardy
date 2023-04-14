// Variables
const container = document.getElementById("container");
const titles = document.getElementById("titles");
const categories = ["1.json", "2.json", "3.json", "4.json", "5.json", "6.json"];
const amounts = ["200", "400", "600", "800", "1000"];
const currency = "$";

// Buttons mapping
const qTimer = document.getElementById("qTimer");
const aTimer = document.getElementById("aTimer");
const buzzer1 = document.getElementById("bz1");
const buzzer2 = document.getElementById("bz2");
const buzzer3 = document.getElementById("bz3");
const check1 = document.getElementById("myCheck1");
const check2 = document.getElementById("myCheck2");
const check3 = document.getElementById("myCheck3");
const mainButton = document.getElementById("b1");

// Function to add a category
async function addCat(catFile) {
  const response = await fetch(`/categories/${catFile}`);
  const category = await response.json();
  const questions = category.questions.map((q, i) => {
    const id = `q${q}`;
    return `<div class="qna" data-state="0" date-column="${i}"><p class="amount"><span class="currency">${currency}</span>${amounts[i]}</p><p class="question">${q.question}</p><p class="answer">${q.answer}</p></div>`;
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

// Function to resize the titles after they're loaded
async function sizeCats() {
  var cats = document.querySelectorAll(".title");
  var maxFontSize = 5;
  var minFontSize = 3;
  var maxTextLength = 50;

  cats.forEach(function (title) {
    var length = title.innerText.length;
    var fontSize =
      maxFontSize - (length / maxTextLength) * (maxFontSize - minFontSize);
    title.style.fontSize = fontSize + "vh";
  });
}

// Load the board when the page is loaded
loadBoard().then(sizeCats);

// Keyboard mappings
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

  const checks = [check1, check2, check3];

  const buzzers = [buzzer1, buzzer2, buzzer3];

  // Enable and disable buzzers
  let buzzLocked = true;
  if ((buzzLocked = true)) {
    buzzers.forEach((buzzer) => {
      buzzer.classList.add("disabled");
    });
  } else {
    buzzers.forEach((buzzer) => {
      buzzer.classList.remove("disabled");
    });
  }
  buzzers.forEach(function (buzzer, index) {
    buzzer.addEventListener("click", function () {
      if (!bz1 && !bz2 && !bz3) {
        return;
      }
      checks[index].checked = true;
      console.log("Buzzer index:", index);
      bz1 = bz2 = bz3 = false;
      this.classList.add("disabled");
      let timeLeft = 10;
      const timerInterval = setInterval(function () {
        timeLeft--;
        aTimer.innerHTML = timeLeft;
        if (timeLeft == 0) {
          clearInterval(timerInterval);
          bz1 = bz2 = bz3 = true;
          buzzers.forEach(function (buzzer, index) {
            buzzer.classList.remove("disabled");
            checks[index].checked = false;
          });
        }
      }, 1000);
    });
  });

  mainButton.addEventListener("click", function () {
    if (currentQna && currentQna.getAttribute("data-state") == 1) {
      let timeLeft = 20;
      qTimer.innerHTML = timeLeft;
      const timerInterval = setInterval(function () {
        timeLeft--;
        qTimer.innerHTML = timeLeft;
        if (timeLeft == 0) {
          clearInterval(timerInterval);
          currentQna.setAttribute("data-state", "2");
          const answer = currentQna.querySelector(".answer");
          currentQna.children[1].innerHTML = answer.innerHTML;
        } else if (timeLeft > 0) {
          array.forEach((element) => {});
          {
          }
        } else {
          clearInterval(timerInterval);
          currentQna.setAttribute("data-state", "2");
          const answer = currentQna.querySelector(".answer");
          currentQna.children[1].innerHTML = answer.innerHTML;
        }
      }, 1000);
    } else if (currentQna && currentQna.getAttribute("data-state") == 2) {
      // Disable the question when it's clicked a third time
      currentQna.classList.remove("big");
      currentQna.classList.add("disabled");
      currentQna.setAttribute("data-state", "3");
    }
  });
});

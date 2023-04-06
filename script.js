const container = document.getElementById("container");
fetch("/categories/1.json")
  .then((response) => response.json())
  .then((category) => {
    const questions = category.questions.map(
      (q) =>
        `<div class="question">
            <p>${q.question}</p>
        </div>`
    );
    container.innerHTML +=
      '<div class="category">' + questions.join("") + "</div>";
  });

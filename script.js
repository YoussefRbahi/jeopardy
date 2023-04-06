const container = document.getElementById("container");
const categories = ["1.json", "2.json", "3.json", "4.json", "5.json", "6.json"];
function addCat(catFile) {
  fetch(`/categories/${catFile}`)
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
}
function loadBoard() {
  categories.forEach((file) => {
    addCat(file);
  });
}
loadBoard();

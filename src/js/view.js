import data from "../services/dataset.json";

// console.log(data.music);

let questions = document.getElementById("question");
let optionsElement = document.getElementById("options");
let nextBtn = document.getElementById("next-btn");
let prevBtn = document.getElementById("prev-btn");

let currentQuestionIndex = 0;
let selectedOption = null;
let userAnswers = [];
let currentOptionIndex = 0;

function displayQuestion() {
  // Display the current Question
  const questionNumber = currentOptionIndex + 1;
  const currentQuestion = data.music[currentOptionIndex];
  questions.innerHTML = `Q${questionNumber}` + " " + currentQuestion.question;

  // To render the options
  optionsElement.innerHTML = "";

  data.music[currentOptionIndex].options.forEach((option, index) => {
    const optionLetter = String.fromCharCode(65 + index);
    // console.log(` ${optionLetter} ${option}`);
    const optionElement = document.createElement("div");
    optionElement.innerHTML = option;
    optionElement.classList.add("option");

    // Add radio buttons to the optins
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "option";
    radioInput.value = index;

    const savedAnswer = userAnswers.find(
      (answer) => answer.question === questionNumber
    );
    if (savedAnswer && savedAnswer.answer === index) {
      console.log(savedAnswer);
      radioInput.checked = true;
      radioInput.disabled = true;
    }
    radioInput.addEventListener("change", function (event) {
      if (!event.target.disabled) {
        const selectedOption = {
          question: questionNumber,
          answer: event.target.value,
        };
        userAnswers = userAnswers.filter(
          (answer) => answer.question !== questionNumber
        ); // Remove any previously saved answer for this question
        userAnswers.push(selectedOption);
        localStorage.setItem(`answer_${questionNumber}`, event.target.value);
        event.target.disabled = true;
      }
    });

    // Append(add) them to the div element
    optionElement.appendChild(radioInput);
    optionsElement.appendChild(optionElement);
  });
}

console.log(userAnswers);

displayQuestion();

// Next Button to go to the next question

nextBtn.addEventListener("click", function () {
  currentQuestionIndex++;

  if (currentQuestionIndex === data.music.length) {
    console.log("No more questions");
    return;
  }

  displayQuestion();
});

// Prev Button to go to the previous question

prevBtn.addEventListener("click", function () {
  currentQuestionIndex--;

  if (currentQuestionIndex === data.music.length) {
    console.log("No more questions");
    return;
  }
  displayQuestion();
});

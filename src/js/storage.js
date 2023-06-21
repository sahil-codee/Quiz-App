export const saveToStore = function ({ userAnswers }) {
  // It's a method that takes a key and a value.
  window.localStorage.setItem(
    "Answer",
    JSON.stringify(userAnswers)
  );
};

export const getFromStore = function () {
  const getActive = window.localStorage.getItem("Answer");

  return { 
    active: getActive ? JSON.parse(getActive) : [],
  };
};

// model.js
let currentQuestionIndex = 0;
let selectedOption = 0;
let userAnswers = [];
let currentOptionIndex = 0;

function displayQuestion() {
  // Display the current Question
  const questionNumber = currentQuestionIndex + 1;
  const currentQuestion = data.music[currentQuestionIndex];
  questions.innerHTML = `Q${questionNumber}` + " " + currentQuestion.question;
  // To render the options
  optionsElement.innerHTML = "";

  data.music[currentOptionIndex].options.forEach((option) => {

    const optionElement = document.createElement("div");
    optionElement.innerHTML = option;
    optionElement.classList.add("option");


    const optionRadio = document.createElement("input");
    optionRadio.type = "radio";
    optionRadio.name = "radio";
    optionRadio.value = option;

    optionElement.appendChild(optionRadio);
    optionsElement.appendChild(optionElement);
  });
}

displayQuestion();
//Checks for the answer selected by the user

optionsElement.addEventListener("click", function (e) {
  userAnswers.push(e.target.value);
  const correctAnswers = [];
  const incorrectAnswers = [];
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === data.music[i].answer) {
      correctAnswers.push(true);
    } else {
      incorrectAnswers.push(false);
    }
  }


  if (currentOptionIndex === 9) {
    subBtn.addEventListener("click", function () {
      const correctAnswerCount = correctAnswers.length;
      const incorrectAnswerCount = incorrectAnswers.length;

      alert(
        `Correct answers: ${correctAnswerCount} Incorrect answers: ${incorrectAnswerCount}`
      );
      console.log(`Correct answers: ${correctAnswerCount}`);
      console.log(`Incorrect answers: ${incorrectAnswerCount}`);

      // Save the selected radio option to the userAnswers array
      // Lock the selected radio option
    });
  }

  // const numCorrectAnswers = correctAnswers.length;
  // const numIncorrectAnswers = incorrectAnswers.length;

  // console.log(`Correct answers: ${numCorrectAnswers}`);
  // console.log(`Incorrect answers: ${numIncorrectAnswers}`);
});

// Next Button to go to the next question

subBtn.addEventListener("click", function () {
  if (currentOptionIndex === 8) {
    subBtn.textContent = "Submit";
  }
  currentQuestionIndex++;
  currentOptionIndex++;
  displayQuestion();
});

// Prev Button to go to the previous question

prevBtn.addEventListener("click", function () {
  currentQuestionIndex--;
  currentOptionIndex--;
  displayQuestion();
});

import data from "../services/dataset.json";

let questions = document.getElementById("question");
let optionsElement = document.getElementById("options");
let prevBtn = document.getElementById("prev-btn");
let nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let userAnswers = [];

// Display Questions
function displayQuestion() {
  let currentQuestion = data.music[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questions.innerHTML = `Q${questionNumber}: ${currentQuestion.question}`;

  // Display Radio Options
  optionsElement.innerHTML = "";

  data.music[currentQuestionIndex].options.forEach((option) => {
    const optionElement = document.createElement("div");
    optionElement.innerHTML = option;
    optionElement.classList.add("option");

    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "radio";
    radioInput.value = option;

    // Check if the option is selected in userAnswers array
    const userAnswer = userAnswers.find(
      (answer) => answer.question === currentQuestionIndex + 1
    );
    if (userAnswer && userAnswer.answer === option) {
      radioInput.checked = true;
    }

    optionElement.appendChild(radioInput);
    optionsElement.appendChild(optionElement);

    // Disable options if a selection has been made
    if (userAnswer) {
      optionElement.classList.add("disabled");
      radioInput.disabled = true;
    }

    // Add event listener to handle option selection
    optionElement.addEventListener("click", function (e) {
      if (!userAnswer) {
        const answers = {
          question: currentQuestionIndex + 1,
          answer: e.target.value,
        };
        userAnswers.push(answers);

        const answerJSON = JSON.stringify(userAnswers);
        localStorage.setItem("UserAnswer", answerJSON);

        radioInput.disabled = true;
        optionElement.classList.add("disabled");
      }
    });
  });

  if (currentQuestionIndex === 9) {
    nextBtn.innerHTML = "Submit";
  } else {
    nextBtn.innerHTML = "Next";
  }
}

// Function to retrieve user answers from localStorage on page load
function retrieveUserAnswers() {
  const answerJSON = localStorage.getItem("UserAnswer");
  if (answerJSON) {
    userAnswers = JSON.parse(answerJSON);
    for (let i = 0; i < userAnswers.length; i++) {
      const answer = userAnswers[i].answer;
      console.log(`The selected option for question ${i + 1} is ${answer}`);
    }
  }
}

// Call the function to retrieve user answers from localStorage on page load
retrieveUserAnswers();

// Display initial question
displayQuestion();

// Go to Previous Question
prevBtn.addEventListener("click", function () {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
  }
  displayQuestion();
});

// Go to Next Question or Submit
// Handle submission logic here
nextBtn.addEventListener("click", function () {
  /*   
The - 1 operator in the code if (currentQuestionIndex < data.music.length - 1) 

subtracts 1 from the length of the data.music array. 
This is because the last question in the array is indexed at data.music.length - 1.

For example, if the data.music array has 10 questions, the last 
question in the array is indexed at 9. This means that the code 
will only run if the current question index is less than 9. If 
the current question index is 9, the code will not run and the 
user will not be able to proceed to the next question.*/

  if (currentQuestionIndex < data.music.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    const correctAnswers = userAnswers.filter((answer) => {
      const questionIndex = answer.question - 1;
      return answer.answer === data.music[questionIndex].answer;
    });

    const incorrectAnswers = userAnswers.filter((answer) => {
      const questionIndex = answer.question - 1;
      return answer.answer !== data.music[questionIndex].answer;
    });

    console.log("Correct answers:", correctAnswers);
    console.log("Incorrect answers:", incorrectAnswers);

    // Display the results or perform other actions with the answer counts
  }
});

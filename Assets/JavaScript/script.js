// Creating MCQs

var questions = [
    {
        prompt: "Which of the following scoping type does JavaScript use?",
        options: ["Sequential", "Segmental", "Lexical", "Literal"],
        answer: "Lexical"
    },

    {
        prompt: "What are the types of Pop up boxes available in JavaScript?",
        options: ["Alert", "Prompt", "Confirm", "All of the above"],
        answer: "All of the above"
    },

    {
        prompt: "Arrays in JavaScript are defined by which of the following statements?",
        options: ["It is an ordered list of values", "It is an ordered list of objects", "It is an ordered list of string", " It is an ordered list of functions"],
        answer: "It is an ordered list of values"
    },

    {
        prompt: "Which company developed JavaScript?",
        options: ["Netscape", "Bell Labs", "Sun Microsystems", "IBM"],
        answer: "Netscape" 
    },

    {
        prompt: "Which of them is not the looping structures in JavaScript?",
    options: ["for", "while", "forwhich", "dowhile"],
        answer: "while"
    }];

// Selecting HTML Elements

var questionsElement = document.querySelector("#questions");
var reviewElement = document.querySelector("#review");
var reStartBtn = document.querySelector("#restart");
var timerEl = document.querySelector("#timer");
var usernameElement = document.querySelector("#name");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");

// Starting point

var currentQuestionpoint = 0;
var quiztime = questions.length * 20;
var timer;

// Starting quiz

function Start() {
    timer = setInterval(clockTick, 1000);
    timerEl.textContent = quiztime;
    var landingScreen = document.getElementById("start-screen");
    landingScreen.setAttribute("class", "hide");
    questionsElement.removeAttribute("class");
    var viewhighscore= document.querySelector('#highscore')
    viewhighscore.classList.add("nonehighscore")
    Question();
}

// going through mcqs and creating  buttons

function Question() {
    var currentQuestion = questions[currentQuestionpoint];
  var promptElement = document.getElementById("question-words")
  promptElement.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Checking whether the answer is correct or not. if not, then dedcuting the time by 10s and moving to next question

function questionClick() {
    if (this.value !== questions[currentQuestionpoint].answer) {
      quiztime -= 20;
      if (quiztime < 0) {
        quiztime = 0;
      }
      timerEl.textContent = quiztime;
      reviewElement.textContent = `Wrong! The correct answer was ${questions[currentQuestionpoint].answer}.`;
      reviewElement.style.color = "red";
    } else {
      reviewElement.textContent = "Correct!";
      reviewElement.style.color = "green";
    }
    reviewElement.setAttribute("class", "review");
    setTimeout(function() {
      reviewElement.setAttribute("class", "review hide");
    }, 2000);
    currentQuestionpoint++;
    if (currentQuestionpoint === questions.length) {
      quizEnd();
    } else {
      Question();
    }
}

// Ending quiz with feedback and final score

function quizEnd() {
    clearInterval(timer);
    var endScreen = document.getElementById("ending");
    endScreen.removeAttribute("class");
    var finalScore = document.getElementById("score-final");
    finalScore.textContent = quiztime;
    questionsElement.setAttribute("class", "hide");
}

// End quiz if timer reaches 0

function clockTick() {
  quiztime--;
    timerEl.textContent = quiztime;
    if (quiztime <= 0) {
      quizEnd();
    }
}

// Using local stroage to store score and username

function saveHighscore() {
    var name = usernameElement.value.trim();
    if (name !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
        score: quiztime,
        name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

// Saving score

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
usernameElement.onkeyup = checkForEnter;

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = Start;

var scoresBtn = document.querySelector("#view-high-scores");
scoresBtn.addEventListener('click', function(){
    var viewhighscore= document.querySelector('#highscore')
    viewhighscore.classList.remove("nonehighscore")
    printHighscores();
})

// Rank previous scores in order by retrieving scores from localStorage

function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
    highscores.forEach(function(score) {
      var liTag = document.createElement("li");
      liTag.textContent = score.name + " - " + score.score;
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
}
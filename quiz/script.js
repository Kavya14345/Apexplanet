const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const questionNumberEl = document.getElementById("question-number");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let countdown;
let timeLeft = 5;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  showQuestion();
});
restartBtn.addEventListener("click", () => location.reload());

function startQuiz() {
  startScreen.classList.add("hide");
  quizScreen.classList.remove("hide");
  fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
    .then(res => res.json())
    .then(data => {
      questions = data.results;
      showQuestion();
    })
    .catch(err => {
      alert("Error fetching questions.");
      console.error(err);
    });
}

function showQuestion() {
  resetState();
  if (currentQuestionIndex >= questions.length) return showResult();

  const q = questions[currentQuestionIndex];
  questionEl.innerHTML = decodeHTML(q.question);
  questionNumberEl.textContent = `Question ${currentQuestionIndex + 1}`;

  let answers = [...q.incorrect_answers];
  answers.push(q.correct_answer);
  answers.sort(() => Math.random() - 0.5);

  answers.forEach(answer => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerHTML = decodeHTML(answer);
    btn.addEventListener("click", () => selectAnswer(btn, answer === q.correct_answer, decodeHTML(q.correct_answer)));
    li.appendChild(btn);
    answersEl.appendChild(li);
  });

  startTimer();
}

function resetState() {
  clearInterval(countdown);
  timeLeft = 5;
  timerEl.textContent = `⏳ 5s`;
  nextBtn.classList.add("hide");
  answersEl.innerHTML = "";
}

function startTimer() {
  countdown = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏳ ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(countdown);
      autoShowCorrectAnswer();
    }
  }, 1000);
}

function selectAnswer(selectedBtn, isCorrect, correctAnswer) {
  clearInterval(countdown);
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === selectedBtn && !isCorrect) {
      btn.classList.add("wrong");
    }
  });

  if (isCorrect) score++;
  nextBtn.classList.remove("hide");
}

function autoShowCorrectAnswer() {
  const q = questions[currentQuestionIndex];
  const correct = decodeHTML(q.correct_answer);
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    }
  });
  nextBtn.classList.remove("hide");
}

function showResult() {
  quizScreen.classList.add("hide");
  resultScreen.classList.remove("hide");
  scoreEl.textContent = `${score} / ${questions.length}`;
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

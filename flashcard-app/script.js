let flashcards = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    answer: "Delhi"
  },
  {
    question: "Who developed Python?",
    options: ["Elon Musk", "Mark Zuckerberg", "Guido van Rossum", "Steve Jobs"],
    answer: "Guido van Rossum"
  }
];

let currentIndex = 0;

function loadQuestion() {
  if (flashcards.length === 0) {
    document.getElementById("question").innerText = "No flashcards available.";
    document.getElementById("options").innerHTML = "";
    document.getElementById("feedback").innerText = "";
    document.getElementById("showAnswerBtn").style.display = "none";
    document.getElementById("correctAnswer").innerText = "";
    return;
  }

  const card = flashcards[currentIndex];
  document.getElementById("question").innerText = card.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  card.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(option, card.answer);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("feedback").innerText = "";
  document.getElementById("showAnswerBtn").style.display = "none";
  document.getElementById("correctAnswer").innerText = "";
}

function checkAnswer(selected, correct) {
  const feedback = document.getElementById("feedback");
  const showBtn = document.getElementById("showAnswerBtn");
  const correctAnswerText = document.getElementById("correctAnswer");

  if (selected === correct) {
    feedback.innerText = "✅ Correct!";
    feedback.style.color = "green";
    showBtn.style.display = "none";
    correctAnswerText.innerText = "";
  } else {
    feedback.innerText = "❌ Wrong Answer!";
    feedback.style.color = "red";
    showBtn.style.display = "inline-block";
    correctAnswerText.innerText = "";
  }
}

function showCorrectAnswer() {
  const correct = flashcards[currentIndex].answer;
  document.getElementById("correctAnswer").innerText = "✅ Correct Answer: " + correct;
}

function nextQuestion() {
  if (currentIndex < flashcards.length - 1) {
    currentIndex++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion();
  }
}

function addFlashcard() {
  const question = document.getElementById("newQuestion").value.trim();
  const opt1 = document.getElementById("newOption1").value.trim();
  const opt2 = document.getElementById("newOption2").value.trim();
  const opt3 = document.getElementById("newOption3").value.trim();
  const opt4 = document.getElementById("newOption4").value.trim();
  const answer = document.getElementById("newAnswer").value.trim();

  if (!question || !opt1 || !opt2 || !opt3 || !opt4 || !answer) {
    alert("Please fill in all fields.");
    return;
  }

  const newCard = {
    question,
    options: [opt1, opt2, opt3, opt4],
    answer
  };

  flashcards.push(newCard);
  currentIndex = flashcards.length - 1;
  loadQuestion();
  clearInputs();
}

function editFlashcard() {
  if (flashcards.length === 0) return;

  const question = document.getElementById("newQuestion").value.trim();
  const opt1 = document.getElementById("newOption1").value.trim();
  const opt2 = document.getElementById("newOption2").value.trim();
  const opt3 = document.getElementById("newOption3").value.trim();
  const opt4 = document.getElementById("newOption4").value.trim();
  const answer = document.getElementById("newAnswer").value.trim();

  if (!question || !opt1 || !opt2 || !opt3 || !opt4 || !answer) {
    alert("Please fill in all fields.");
    return;
  }

  flashcards[currentIndex] = {
    question,
    options: [opt1, opt2, opt3, opt4],
    answer
  };

  loadQuestion();
  clearInputs();
}

function deleteFlashcard() {
  if (flashcards.length === 0) return;
  flashcards.splice(currentIndex, 1);
  currentIndex = Math.max(0, currentIndex - 1);
  loadQuestion();
}

function clearInputs() {
  document.getElementById("newQuestion").value = "";
  document.getElementById("newOption1").value = "";
  document.getElementById("newOption2").value = "";
  document.getElementById("newOption3").value = "";
  document.getElementById("newOption4").value = "";
  document.getElementById("newAnswer").value = "";
}

window.onload = loadQuestion;

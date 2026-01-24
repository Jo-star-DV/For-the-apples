const parts = [
  { src: "https://www.youtube.com/embed/AIjtNbYUo4I", questions: [
      { text: "Wen besucht Felix?", answers: [
          { text: "Gallener Gurkenschmiede", correct: false },
          { text: "Stahringer Streuobstmosterei", correct: true }
        ]},
      { text: "Warum tut er das?", answers: [
          { text: "Um sich über Streuobst zu informieren", correct: true },
          { text: "Weil er gratis Apfelsaft haben wollte", correct: false }
        ]},
      { text: "Mit wem spricht er?", answers: [
          { text: "Besitzer", correct: false },
          { text: "Lohnmoster", correct: true },
          { text: "Profi Schwimmer", correct: false }
        ]}
    ]},
  { src: "https://www.youtube.com/embed/AIjtNbYUo4I", questions: [
      { text: "Wie ist die Pflege von Streuobst?", answers: [
          { text: "Intensiv", correct: false },
          { text: "Minimal", correct: true }
        ]},
      { text: "Was wird zweimal jährlich gemacht?", answers: [
          { text: "Das Gras wird gemäht", correct: false },
          { text: "Ein Sonnentanz wird aufgeführt", correct: true }
        ]},
      { text: "Wie stehen die Bäume auf einer Streuobstwiese?", answers: [
          { text: "Verteilt mit großem Abstand", correct: true },
          { text: "Nah beieinander in Reihen", correct: false },
          { text: "In einem Dreieck", correct: false }
        ]},
      { text: "Wie viele Arten gibt es ca. auf einer Streuobstwiese?", answers: [
          { text: "> 5000", correct: true },
          { text: "ca. 2000", correct: false },
          { text: "3784", correct: false }
        ]}
    ]},
  { src: "https://www.youtube.com/embed/AIjtNbYUo4I", questions: [
      { text: "Wie heißt der Hof, den Felix besucht?", answers: [
          { text: "Fuchshof", correct: true },
          { text: "Lurchhof", correct: false },
          { text: "Ponyhof", correct: false }
        ]},
      { text: "Warum baut der Fuchshof keine Streuobstäpfel an?", answers: [
          { text: "Florian mag ihren Geschmack nicht", correct: false },
          { text: "Die Nachbarn haben es ihnen verboten", correct: false },
          { text: "Sie sind wirtschaftlich unrentabel", correct: true }
        ]},
      { text: "Was ist beim langen Lagern zu beachten?", answers: [
          { text: "Die Äpfel wöchentlich zu waschen", correct: false },
          { text: "Den Sauerstoff-Gehalt in der Luft zu senken", correct: true },
          { text: "Den Äpfeln klassische Musik vorzuspielen", correct: false }
        ]}
    ]},
  { src: "https://www.youtube.com/embed/AIjtNbYUo4I", questions: [
      { text: "Was ist beim Bio-Anbau besonders?", answers: [
          { text: "Es wird auf chemisch-synthetische Düngemittel verzichtet", correct: true },
          { text: "Die Apfelbäume werden nur mit destilliertem Wasser gegossen", correct: false },
          { text: "Die Gewinnmage wird bewusst höher gesetzt", correct: false }
        ]},
      { text: "Warum ist die ökologische Einordnung schwierig?", answers: [
          { text: "Weil sich die Tiere oft verstecken", correct: false },
          { text: "Weil niemand eine Ahnung hat, wie man rechnen soll", correct: false },
          { text: "Weil für den gleichen Ertrag in den versch. Anbauformen mehr Fläche benötigt wird", correct: true }
        ]}
    ]}
];

let currentPart = 0;
let currentQuestion = 0;
let score = 0;

let totalQuestions = parts.reduce((sum, part) => sum + part.questions.length, 0);
let answeredQuestions = 0;

const video = document.getElementById("video");
const quizDiv = document.getElementById("quiz");
const feedback = document.getElementById("feedback");
const stepSpan = document.getElementById("step");
const pointsSpan = document.getElementById("points");
const progressFill = document.getElementById("progressFill");
const nextBtn = document.getElementById("nextBtn");
document.getElementById("totalParts").textContent = parts.length;

nextBtn.addEventListener("click", () => {
  showQuestion();
});

function loadPart() {
  quizDiv.innerHTML = "";
  feedback.textContent = "";
  currentQuestion = 0;

  video.style.display = "block";
  nextBtn.style.display = "inline-block";
  video.src = parts[currentPart].src;
  updateProgress();
}

function showQuestion() {
  const q = parts[currentPart].questions[currentQuestion];
  if (!q) return;
  video.src = ""; 
  video.style.display = "none";
  nextBtn.style.display = "none";
  quizDiv.innerHTML = `<p><strong>${q.text}</strong></p>`;
  q.answers.forEach(a => {
    const btn = document.createElement("button");
    btn.textContent = a.text;
    btn.onclick = () => nextQuestion(a.correct);
    quizDiv.appendChild(btn);
  });
}

function nextQuestion(correct) {
  answeredQuestions++;

  if (correct) {
    score++;
    feedback.textContent = "Richtig!";
  } else {
    feedback.textContent = "Falsch!";
  }
  pointsSpan.textContent = score;
  updateProgress();

  currentQuestion++;

  setTimeout(() => {
    feedback.textContent = "";
    if (currentQuestion < parts[currentPart].questions.length) {
      showQuestion();
    } else {
      currentPart++;
      if (currentPart < parts.length) {
        loadPart();
      } else {
        showResult();
      }
    }
  }, 1000);
}

function updateProgress() {
  let progressPercent = (answeredQuestions / totalQuestions) * 100;
  progressFill.style.width = progressPercent + "%";
  stepSpan.textContent = Math.min(currentPart + 1, parts.length);
}

function showResult() {
  video.style.display = "none";
  nextBtn.style.display = "none";
  progressFill.style.width = "100%";
  quizDiv.innerHTML = `
    <h2>🎉 Herzlichen Glückwunsch!</h2>
    <p>Du hast <strong>${score}</strong> von ${totalQuestions} Punkten erreicht.</p>
  `;
  feedback.textContent = "";
}

loadPart();

const parts = [
  { questions: [
      { text: "Wen besucht Felix als erstes?", answers: [
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
  { questions: [
      { text: "Wie ist die Pflege von Streuobst?", answers: [
          { text: "Intensiv", correct: false },
          { text: "Minimal", correct: true }
        ]},
      { text: "Was wird zweimal jährlich gemacht?", answers: [
          { text: "Das Gras wird gemäht", correct: true },
          { text: "Ein Sonnentanz wird aufgeführt", correct: false }
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
  { questions: [
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
      { text: "Was ist beim langen Lagern hilfreich?", answers: [
          { text: "Die Äpfel wöchentlich zu waschen", correct: false },
          { text: "Den Sauerstoff-Gehalt in der Luft zu senken", correct: true },
          { text: "Den Äpfeln klassische Musik vorzuspielen", correct: false }
        ]}
    ]},
  { questions: [
      { text: "Wie ist in Deutschland etwa die Nachfrage nach Bio-Äpfeln?", answers: [
          { text: "20%", correct: false },
          { text: "15%", correct: true},
          { text: "10%", correct: false }
        ]},
      { text: "Was ist beim Bio-Anbau besonders?", answers: [
          { text: "Es wird auf chemisch-synthetische Düngemittel verzichtet", correct: true },
          { text: "Die Apfelbäume werden nur mit destilliertem Wasser gegossen", correct: false },
          { text: "Die Gewinnmage wird bewusst höher gesetzt", correct: false }
        ]},
      { text: "Warum ist die ökologische Einordnung der Anbauarten schwierig?", answers: [
          { text: "Weil sich die Tiere oft verstecken", correct: false },
          { text: "Weil niemand eine Ahnung hat, wie man rechnen soll", correct: false },
          { text: "Weil für den gleichen Ertrag in den versch. Anbauformen mehr Fläche benötigt wird", correct: true }
        ]},
      { text: "Warum sind Streuobswiesen erhaltenswert?", answers: [
          { text: "Weil sie ein Kulturgut sind und zur Artenfielfalt beitragen", correct: true },
          { text: "Weil Günther sie schön findet", correct: false },
          { text: "Da sie beim Betrachten Sozialkompetenzen trainieren", correct: false }
        ]}
    ]}
 ];

let currentPart = 0;
let currentQuestion = 0;
let score = 0;

let totalQuestions = parts.reduce((sum, part) => sum + part.questions.length, 0);
let answeredQuestions = 0;

const quizDiv = document.getElementById("quiz");
const feedback = document.getElementById("feedback");
const stepSpan = document.getElementById("step");
const pointsSpan = document.getElementById("points");
const progressFill = document.getElementById("progressFill");

function showQuestion() {
  const q = parts[currentPart].questions[currentQuestion];
  if (!q) return;

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
  if (correct) score++;
  pointsSpan.textContent = score;

  feedback.textContent = correct ? "Richtig!" : "Falsch!";
  updateProgress();

  currentQuestion++;

  setTimeout(() => {
    feedback.textContent = "";
    if (currentQuestion < parts[currentPart].questions.length) {
      showQuestion();
    } else {
      currentPart++;
      if (currentPart < parts.length) {
        currentQuestion = 0;
        showQuestion();
      } else {
        showResult();
      }
    }
  }, 700);
}

function updateProgress() {
  let progressPercent = (answeredQuestions / totalQuestions) * 100;
  progressFill.style.width = progressPercent + "%";
  stepSpan.textContent = Math.min(currentPart + 1, parts.length);
}

function showResult() {
  quizDiv.innerHTML = `
    <h2>🎉 Herzlichen Glückwunsch!</h2>
    <p>Du hast <strong>${score}</strong> von ${totalQuestions} Punkten erreicht.</p>
  `;
  feedback.textContent = "";
  progressFill.style.width = "100%";
  
  if (score === totalQuestions) {
    quizDiv.innerHTML += "<p>🎉🎉🎊🎉🎉</p>";
  }
}

showQuestion();
updateProgress();

//Das hat seeeeeehr lange gedauert xD

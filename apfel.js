function checkQuiz() {
  const answers = {
    q1: "b",
    q2: "b",
    q3: "b",
    q4: "a",
    q5: "a"
  };

  let score = 0;
  for (let q in answers) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === answers[q]) {
      score++;
    }
  }

  let feedback = "";
  if (score === 5) {
    feedback = "Super! 👍 Du bist ein Streuobst-Profi! 🌳";
  } else if (score >= 3) {
    feedback = "Gut gemacht! 😊";
  } else {
    feedback = "Nicht schlimm 🙂 Schau dir die Doku nochmal an.";
  }

  document.getElementById("result").textContent =
    `Punkte: ${score}/5 – ${feedback}`;
}

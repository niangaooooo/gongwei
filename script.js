let current = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next');
const progressEl = document.getElementById('progress');

function loadQuestion() {
  const q = QUESTIONS[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';

  q.options.forEach((opt, idx) => {
    const li = document.createElement('li');
    li.textContent = opt;
    li.addEventListener('click', () => selectOption(li, idx));
    optionsEl.appendChild(li);
  });

  nextBtn.disabled = true;
  nextBtn.classList.remove('enabled');
  progressEl.textContent = `Question ${current + 1} of ${QUESTIONS.length}`;
}

function selectOption(li, idx) {
  const q = QUESTIONS[current];
  [...optionsEl.children].forEach(child => child.classList.remove('selected'));
  li.classList.add('selected');
  nextBtn.disabled = false;
  nextBtn.classList.add('enabled');

  nextBtn.onclick = () => {
    if (idx === q.answer) {
      score++;
      li.classList.add('correct');
    } else {
      li.classList.add('wrong');
      optionsEl.children[q.answer].classList.add('correct');
    }

    setTimeout(() => {
      current++;
      if (current < QUESTIONS.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }, 800);
  };
}

function showResult() {
  questionEl.textContent = `You scored ${score} / ${QUESTIONS.length}`;
  optionsEl.innerHTML = '';
  nextBtn.style.display = 'none';
  progressEl.textContent = '';
}

window.onload = loadQuestion;

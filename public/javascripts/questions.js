const questions = [
    { emoji: "🦁👑", options: ["Lion King", "Jungle", "Madagascar", "Tarzan"], answer: 0 },
    { emoji: "❄️👑", options: ["Ice Age", "Happy Feet", "Frozen", "Snow White"], answer: 2 },
{ emoji: "🧊🧊🧊🚢", options: ["Life of Pi", "Titanic", "The Poseidon Adventure", "Captain Phillips"], answer: 1 },
{ emoji: "🐍🦧🐅📖", options: ["Jumanji", "Anaconda", "Congo", "The Jungle Book"], answer: 3 },
{ emoji: "👨‍💼👨‍💼👨‍💼👶", options: ["Look Who's Talking", "Big Daddy", "Three Men & a Baby", "Kindergarten Cop"], answer: 2 },
{ emoji: "🏊‍♀️🩸🦈", options: ["Jaws", "The Shallows", "Piranha", "47 Metres Down"], answer: 0 },
];
let currentQuestion = 0;
let score = 0;

function startQuiz() {
    document.getElementById('quiz-start').classList.add('hidden');
    document.getElementById('quiz-content').classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.emoji;
    const optionsList = document.getElementById('options');
    optionsList.innerHTML = '';
  
    question.options.forEach((option, index) => {
        const div = document.createElement('div')
        div.classList.add('answer-item')
        div.textContent = option;
        div.onclick = () => selectOption(index, div)
        optionsList.appendChild(div)
    })
}

function selectOption(selected, element) {
    const options = document.querySelectorAll('.answer-item')
    options.forEach(option => option.classList.remove('selected'))
    element.classList.add('selected')
    if (selected === questions[currentQuestion].answer) score++
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById('quiz-content').classList.add('hidden');
    document.getElementById('quiz-end').classList.remove('hidden');
    let message = document.getElementById('message');
    if (score >= 3) {
      message.textContent = "Well done!!"
    } else {
      message.textContent = "Better luck next time..."
    }
    document.getElementById('score').textContent = `${score}/6`;
}

function restart() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-end').classList.add('hidden');
    document.getElementById('quiz-content').classList.remove('hidden');
    loadQuestion();
}
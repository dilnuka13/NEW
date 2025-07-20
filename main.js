let currentLang = 'en';
let currentQuiz = null;
let currentQuestion = 0;
let score = 0;
let timer = 120;

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'si' : 'en';
    alert(`Language switched to ${currentLang === 'en' ? 'English' : 'Sinhala'}`);
    // Implement translation logic here
}

function selectAvatar(avatar) {
    alert(`Selected avatar: ${avatar}`);
    // Implement avatar selection logic
}

function socialLogin(provider) {
    alert(`Logging in with ${provider}`);
    // Implement social login logic
}

function sendMessage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    if (name && email && message) {
        successMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        // Simulate form submission
        setTimeout(() => {
            successMessage.classList.add('hidden');
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        }, 2000);
    } else {
        errorMessage.classList.remove('hidden');
        successMessage.classList.add('hidden');
    }
}

const quizzes = {
    physics: [
        { question: "What is Newton's First Law?", options: ["Inertia", "F=ma", "Action-Reaction", "Gravity"], answer: "Inertia" },
        { question: "What is the unit of force?", options: ["Joule", "Newton", "Watt", "Volt"], answer: "Newton" }
    ],
    chemistry: [
        { question: "What is the atomic number of Carbon?", options: ["6", "12", "8", "14"], answer: "6" }
    ],
    biology: [
        { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi"], answer: "Mitochondria" }
    ],
    mathematics: [
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" }
    ]
};

function startQuiz(subject) {
    currentQuiz = quizzes[subject];
    currentQuestion = 0;
    score = 0;
    timer = 120;
    document.getElementById('quizSelection').classList.add('hidden');
    document.getElementById('quizContent').classList.remove('hidden');
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizTitle').textContent = `${subject.charAt(0).toUpperCase() + subject.slice(1)} Quiz`;
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const q = currentQuiz[currentQuestion];
    document.getElementById('question').textContent = q.question;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    q.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'w-full p-2 border rounded hover:bg-blue-100';
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selected) {
    if (selected === currentQuiz[currentQuestion].answer) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < currentQuiz.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById('quizContent').classList.add('hidden');
    document.getElementById('quizResults').classList.remove('hidden');
    document.getElementById('score').textContent = `${score}/${currentQuiz.length}`;
    clearInterval(window.quizTimer);
}

function retakeQuiz() {
    startQuiz(currentQuiz[0].question.split(' ')[0].toLowerCase());
}

function startTimer() {
    document.getElementById('timer').textContent = formatTime(timer);
    window.quizTimer = setInterval(() => {
        timer--;
        document.getElementById('timer').textContent = formatTime(timer);
        if (timer <= 0) {
            endQuiz();
        }
    }, 1000);
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}
const quizData = {
    html: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language"], answer: "Hyper Text Markup Language" },
        { question: "Tag for hyperlink?", options: ["<a>", "<link>", "<href>"], answer: "<a>" },
        { question: "Largest heading tag?", options: ["<h1>", "<h6>"], answer: "<h1>" },
        { question: "HTML tag for an image?", options: ["<img>", "<picture>"], answer: "<img>" },
        { question: "HTML tag for a line break?", options: ["<br>", "<lb>"], answer: "<br>" },
        { question: "HTML tag for an unordered list?", options: ["<ul>", "<ol>"], answer: "<ul>" },
        { question: "Element to insert a comment?", options: ["<!-- comment -->", "// comment"], answer: "<!-- comment -->" },
        { question: "HTML tag to define a table row?", options: ["<tr>", "<td>"], answer: "<tr>" }
    ],
    css: [
        { question: "Property to change text color?", options: ["font-color", "color"], answer: "color" },
        { question: "Symbol for ID selector?", options: ["#", "."], answer: "#" },
        { question: "CSS property to set background?", options: ["background", "bg-color"], answer: "background" },
        { question: "CSS property for bold text?", options: ["font-weight", "font-style"], answer: "font-weight" },
        { question: "Unit for relative size?", options: ["em", "px"], answer: "em" },
        { question: "Property to add shadow to text?", options: ["text-shadow", "box-shadow"], answer: "text-shadow" },
        { question: "CSS property to align text center?", options: ["text-align", "align"], answer: "text-align" },
        { question: "Selector for all elements?", options: ["*", "#all"], answer: "*" }
    ],
    javascript: [
        { question: "Print to console?", options: ["console.log()", "print()"], answer: "console.log()" },
        { question: "Declare constant in JS?", options: ["const", "var"], answer: "const" },
        { question: "Function to show alert?", options: ["alert()", "show()"], answer: "alert()" },
        { question: "Operator to compare value & type?", options: ["===", "=="], answer: "===" },
        { question: "Data type for true/false?", options: ["boolean", "string"], answer: "boolean" },
        { question: "Which keyword creates a function?", options: ["function", "define"], answer: "function" },
        { question: "How to get element by ID?", options: ["document.getElementById()", "document.querySelectorAll()"], answer: "document.getElementById()" },
        { question: "Event triggered on button click?", options: ["onclick", "onhover"], answer: "onclick" }
    ],
    python: [
        { question: "Keyword to define function?", options: ["def", "function"], answer: "def" },
        { question: "Python file extension?", options: [".py", ".js"], answer: ".py" },
        { question: "Function to output text?", options: ["print()", "echo()"], answer: "print()" },
        { question: "Operator for exponentiation?", options: ["**", "^"], answer: "**" },
        { question: "Python keyword for loop?", options: ["for", "repeat"], answer: "for" },
        { question: "Which data type is immutable?", options: ["tuple", "list"], answer: "tuple" },
        { question: "Keyword to handle exceptions?", options: ["try", "catch"], answer: "try" },
        { question: "To import a module?", options: ["import", "include"], answer: "import" }
    ],
    gk: [
        { question: "Largest planet?", options: ["Jupiter", "Earth"], answer: "Jupiter" },
        { question: "Capital of India?", options: ["New Delhi", "Mumbai"], answer: "New Delhi" },
        { question: "Fastest land animal?", options: ["Cheetah", "Tiger"], answer: "Cheetah" },
        { question: "Ocean between Africa & Australia?", options: ["Indian Ocean", "Pacific Ocean"], answer: "Indian Ocean" },
        { question: "How many continents are there?", options: ["7", "5"], answer: "7" },
        { question: "Tallest mountain?", options: ["Mount Everest", "K2"], answer: "Mount Everest" },
        { question: "First person on the moon?", options: ["Neil Armstrong", "Buzz Aldrin"], answer: "Neil Armstrong" },
        { question: "Currency of Japan?", options: ["Yen", "Won"], answer: "Yen" }
    ]
};

let currentTopic = "";
let questions = [];
let index = 0;
let score = 0;

function startQuiz(topic) {
    currentTopic = topic;
    questions = [...quizData[topic]].sort(() => Math.random() - 0.5);
    index = 0;
    score = 0;
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('quizTitle').textContent = topic.toUpperCase() + " Quiz";
    document.getElementById('score').textContent = "Score: 0";
    document.getElementById('restartBtn').classList.add('hidden');
    document.getElementById('nextBtn').style.display = 'block';
    document.getElementById('final').textContent = ""; // Clear previous final message
    loadQuestion();
}

function loadQuestion() {
    const q = questions[index];
    document.getElementById('questionText').textContent = q.question;
    const optDiv = document.getElementById('options');
    optDiv.innerHTML = '';

    q.options.sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(btn, opt);
        optDiv.appendChild(btn);
    });

    document.getElementById('result').textContent = '';
}

function checkAnswer(btn, selected) {
    const correct = questions[index].answer;
    const buttons = document.querySelectorAll('.options button');
    buttons.forEach(b => b.disabled = true);

    if (selected === correct) {
        btn.classList.add('correct');
        score++;
        document.getElementById('result').textContent = "✅ Correct!";
    } else {
        btn.classList.add('wrong');
        document.getElementById('result').textContent = "❌ Wrong! Correct: " + correct;
    }
    document.getElementById('score').textContent = "Score: " + score;
}

function nextQuestion() {
    index++;
    if (index < questions.length) {
        loadQuestion();
    } else {
        document.getElementById('questionText').textContent = '';
        document.getElementById('options').innerHTML = '';
        document.getElementById('result').textContent = '';
        document.getElementById('final').textContent = `🎉 Quiz Over! Your Score: ${score}/${questions.length}`;
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('restartBtn').classList.remove('hidden');
    }
}

function restartQuiz() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('intro').classList.remove('hidden');
    document.getElementById('final').textContent = "";  
}
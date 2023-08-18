// create a question class
class Question {

    // constructor 
    constructor(text,choices,answer){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    //methods
    isCorrectAnswer(choice){
        return this.answer == choice;
    }


}

// create quiz class

class Quiz {

    // constructor
    constructor(questions){
        this.questions = questions;
        this.score = 0;
        this.questionIndex = 0;
    }

    // methods
    getQuestion(){
        return this.questions[this.questionIndex];
    }

    getCurrentQuestionIndex(){
        return this.questionIndex;
    }

    getQuestionsLength(){
        return this.questions.length;
    }

    guess(answer){
        if (this.getQuestion().isCorrectAnswer(answer)){
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded(){
        return this.questionIndex === this.questions.length;
    }
}


// create questions here
let questions = [
    new Question(
        "Hyper Text Markup Language Stands For?", ["JQuery", "XHTML", "CSS", "HTML"], "HTML"
    ),
    new Question(
        "Cascading Style sheet stands for?", ["HTML", "JQuery", "CSS", "XML"], "CSS"
    ),
    new Question(
        "Which is a JavaScript Framework?", ["React", "Laravel", "Django", "Sass"], "React"
    ),
    new Question(
        "Which is a backend language?", ["PHP", "HTML", "React", "All"], "PHP"
    ),
    new Question(
        "Which is best for Artificial intelligence?", ["React", "Laravel", "Python", "Sass"], "Python"
    )
];

// INITIALIZE quiz
let quiz = new Quiz(questions);



// setting the timer for the quiz
let time = 10;
let quizTimeInSecs = 10 * 60;

let counting = document.getElementById('count-down');
startCountDown();

//calling the displayQuestion function
displayQuestion();




// displaying the questions

function displayQuestion(){

    // here we are checking whether quiz reached to its end
    if(quiz.isEnded()){
        showScores();
    }
    else {
        // show question
        let questionEl = document.getElementById('question');
        questionEl.innerHTML = quiz.getQuestion().text;

        //show options
        let choices = quiz.getQuestion().choices;
        for(let i = 0;i<choices.length;i++){
            let choiceEl = document.getElementById(`choice${i}`);
            choiceEl.innerHTML = choices[i];
            guess(`btn${i}`,choices[i]);

            }

        showProgress();
    }
}

// guess answer
function guess(id,answer){
    let button = document.getElementById(id);

    button.onclick = function() {

        quiz.guess(answer);
        displayQuestion();
    }
}

// show quiz progress
function showProgress() {
    const currentQuestionNumber = (quiz.getCurrentQuestionIndex())+1;
    const progressEl = document.getElementById("progress");
    progressEl.innerHTML = 
    `
     Question ${currentQuestionNumber} of ${quiz.getQuestionsLength()};
    `;
}


// show the score
function showScores() {
    let quizEndElement = 
    `
        <h1>Quiz Completed</h1>
        <h2 id='score'> Your score: ${quiz.score} of ${quiz.getQuestionsLength()}</h2>
        <div class='quiz-repeat'>
               <a href="home.html">Take Quiz Again</a>
        </div>
    `;

    let quizEl = document.getElementById('quiz');
    quizEl.innerHTML = quizEndElement;
}


// count down timer for the quiz

function startCountDown() {
    let quizTimer = setInterval(() => {

        if(quizTimer <=0){
            clearInterval(quizTimer);
            showScores();
        }
        else {
            quizTimeInSecs--;
            let sec = Math.floor(quizTimeInSecs % 60);
            let min = Math.floor(quizTimeInSecs/60) % 60;

            counting.innerHTML = `Time: ${min}:${sec}`;
        }

    },1000)
}



var startQuiz = document.querySelector("#startButton");
var optionA = document.querySelector("#buttonA");
var optionB = document.querySelector("#buttonB");
var optionC = document.querySelector("#buttonC");
var optionD = document.querySelector("#buttonD");
var quizInstructions = document.querySelector("#quiz-instructions");
var questions = document.querySelector("#question");
var allButtons = document.querySelector("#buttons");
var result = document.querySelector("#result");
var showResult = document.querySelector("#result-display");
var scorePlaceholder = document.querySelector("#score");
var newForm = document.querySelector("#mainBody");
var lastPage = document.querySelector("#last-page");
var scoresList = document.querySelector("#scores-list");
var viewHighscore = document.querySelector("#highscore-display");
var score = 100;
var countIncrement;
var timer;
var scoreAndInitialsArray = [];

var quizQuestions = {
    questionArray : ["1. Which operator is used to assign a value to a variable?", "2. How do you round the number 7.25, to the nearest integer?", "3. What is the correct way to write a JavaScript array?", "4. How does a FOR loop start?", "5. How to write an IF statement for executing some code if \"i\" is NOT equal to 5?", "6. How do you write \"Hello World\" in an alert box?"],
    optionAArray : ["=", "round(7.25)", "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")", "for i = 1 to 5", "if (i != 5)", "alertBox(\"Hello World\");"],
    optionBArray : ["x", "Math.rnd(7.25)", "var colors = [\"red\", \"green\", \"blue\"]", "for (i <= 5; i++)", "if (i <> 5)", "msg(\"Hello World\");"],
    optionCArray : ["*", "Math.round(7.25)", "var colors = (1:\"red\", 2:\"green\", 3:\"blue\")", "for (i = 0; i <= 5; i++)", "if i =! 5 then", "alert(\"Hello World\");"],
    optionDArray : ["-", "rnd(7.25)", "var colors = \"red\", \"green\", \"blue\"", "for (i = 0; i <= 5)", "if i <> 5", "msgBox(\"Hello World\");"],
    correctArray : ["=", "Math.round(7.25)", "var colors = [\"red\", \"green\", \"blue\"]", "for (i = 0; i <= 5; i++)", "if (i != 5)", "alert(\"Hello World\");"],
}

init();

function init() {
    // Parsing the JSON string to an object
    var storedData = JSON.parse(localStorage.getItem("highscores"));
  
    // If stored data were retrieved from localStorage, update the scoreAndInitialsArray
    if (storedData !== null) {
        scoreAndInitialsArray = storedData;
    }
  }


// The following function is called when the Start Quiz button is clicked and displays the first question. 
function quizStarts1() {

        startQuiz.classList.add("hide");
        quizInstructions.classList.add("hide");
        countIncrement = 0;
        questions.textContent = quizQuestions.questionArray[countIncrement];
        
        allButtons.classList.remove("hide");
        optionA.textContent = quizQuestions.optionAArray[countIncrement];
        optionB.textContent = quizQuestions.optionBArray[countIncrement];
        optionC.textContent = quizQuestions.optionCArray[countIncrement];
        optionD.textContent = quizQuestions.optionDArray[countIncrement];

        scorePlaceholder.classList.remove("hide");

}

// The following function is called when on of the answer option is clicked.
function quizStarts2() {

// The following code detects the button clicked and verify if the text content of the clicked button matches the correct answer.
    var buttonClicked = event.target;
    console.log(buttonClicked.textContent);

    if (buttonClicked.textContent === quizQuestions.correctArray[countIncrement]) {
        showResult.textContent = "Correct!";
 
        
    }

    else {
        showResult.textContent = "Wrong!";
        score = score - 10;
   
    }

// The following code calls the function when the number of Questions left is 0. 
    if (countIncrement > quizQuestions.questionArray.length-2) {
        zeroScore();
        return;

    }

   
    
// This code shows the result div for 1 sec and then hides it.   
    result.classList.remove("hide");

    setTimeout(function() {
        result.classList.add("hide");
    }, 1000);


// This code displays the questions and the answer buttons.
    startQuiz.classList.add("hide");
    quizInstructions.classList.add("hide");
    countIncrement++;
    questions.textContent = quizQuestions.questionArray[countIncrement];
    
    allButtons.classList.remove("hide");
    optionA.textContent = quizQuestions.optionAArray[countIncrement];
    optionB.textContent = quizQuestions.optionBArray[countIncrement];
    optionC.textContent = quizQuestions.optionCArray[countIncrement];
    optionD.textContent = quizQuestions.optionDArray[countIncrement];
    console.log(countIncrement);

}

// The following function will show the Quiz Over and score and ask for initials.

function zeroScore() {

        questions.textContent = "Quiz Over!";
        allButtons.classList.add("hide");
        result.classList.add("hide");
        scorePlaceholder.classList.add("hide");
        
        quizInstructions.classList.remove("hide");
        quizInstructions.textContent = "Your Score is : " + score;

        var createForm = document.createElement("form");
        console.log(createForm); 
        createForm.innerHTML = "Enter initials : ";
        newForm.appendChild(createForm); 
        
        var createInputBox = document.createElement("input");
        createForm.appendChild(createInputBox);

        var submitBtn = document.createElement("button");
        submitBtn.innerText = "submit";
        submitBtn.style = "margin-left: 10px";
        createForm.appendChild(submitBtn);


        // When submit button is clicked ************************************************************************
        submitBtn.addEventListener("click", function(){
            event.preventDefault();

            var initials = createInputBox.value.trim() + " : " + score;

            if (initials === "") {
                return;
            }
            scoreAndInitialsArray.push(initials);
            createInputBox.value = "";

            storeHighscores();


            // This code shows the saved Highscores and options to go back and clear the results.
             
            questions.textContent = "HighScores";
            quizInstructions.classList.add("hide");
            createForm.classList.add("hide");

            renderHighscores();


 
        }); /**************************************************************************************************************************/
        clearInterval(timer);
        return;
}

function storeHighscores() {
    // Stringify and set "highscore" key in localStorage
    localStorage.setItem("highscores", JSON.stringify(scoreAndInitialsArray));
  }

function renderHighscores() {
  // Render a new li for stored scores
  for (var i = 0; i < scoreAndInitialsArray.length; i++) {
    var scoreInit = scoreAndInitialsArray[i];

    var li = document.createElement("li");
    li.style.background = "lightpink";
    li.style.textAlign = "left";
    li.style.margin = "10px";
    li.style.padding = "10px";
    li.style.fontWeight = "bold";
    li.textContent = scoreInit.toUpperCase();
    scoresList.appendChild(li);
    scoresList.classList.remove("hide");
  }

    var button1 = document.createElement("button");
    button1.textContent = "Go Back";
    lastPage.appendChild(button1);
    button1.addEventListener("click", function() {
        window.location.reload();

    })

    var button2 = document.createElement("button");
    button2.textContent = "Clear Highscores";
    lastPage.appendChild(button2);
    button2.style.marginLeft = "10px";
    button2.addEventListener("click", function() {
        localStorage.setItem("highscores", null);
        scoresList.classList.add("hide");
    })
}



// This code displays the score on the upper right corner of the Quiz page and decrement its value every second and calls the "zeroScore" function when it is 0.
startQuiz.addEventListener("click", function(){
     timer = setInterval(() => {
        score--;
        scorePlaceholder.textContent = "Score: " + score; 

        if (score <= 0) {
            zeroScore();
        }
    }, 1000);
    
});


startQuiz.addEventListener("click", quizStarts1);
allButtons.addEventListener("click", quizStarts2);

viewHighscore.addEventListener("click", function() {
            questions.textContent = "HighScores";
            quizInstructions.classList.add("hide");
            createForm.classList.add("hide");

            renderHighscores();
});












// * when I click start quiz, it navigates to a new page with my first question.
// * when I click on the start quiz, the new page will also display the time and highscore.
// * this page will present me with question and 4 options.
// * when i click on one of the option, it will display the result-right/wrong 

// * when I choose the wrong option, the score decreases by 10.

// * wait for 3 seconds and show the next page with new question.
// * when the timer or the number of questions left reaches 0, the game is over.

// * when the game is over then I can save my score and initials in the local Storage.




// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score






// 1. Which operator is used to assign a value to a variable?

//         Your answer  
//      
//      
//      



// How do you round the number 7.25, to the nearest integer?

//     Your answer  
// 
// )
// 


// What is the correct way to write a JavaScript array?

//     Your answer  
// 
// 
// 


// How does a FOR loop start?

//     Your answer  
// 
// 
// 

// How to write an IF statement for executing some code if "i" is NOT equal to 5?

//     Your answer  
// 
// 
// 

// How do you write "Hello World" in an alert box?

//     Your answer  
// 
// 
// 


// How  you write "Hello World" in an alert box?

// alert("Hello World");    Your answer  
// msg("Hello World");
// alertBox("Hello World");
// msgBox("Hello World");

// How to write an IF statement for executing some code if "i" is NOT equal to 5?

// if (i != 5)    Your answer  
// if i <> 5
// if (i <> 5)
// if i =! 5 then

// What is the correct way to write a JavaScript array?

// var colors = ["red", "green", "blue"]    Your answer  
// var colors = (1:"red", 2:"green", 3:"blue")
// var colors = "red", "green", "blue"
// var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")


// How do you round the number 7.25, to the nearest integer?

// Math.round(7.25)    Your answer  
// rnd(7.25)
// round(7.25)
// Math.rnd(7.25)

// Which operator is used to assign a value to a variable?

// =    Your answer  
// *
// -
// x


// How does a FOR loop start?

// for (i = 0; i <= 5; i++)    Your answer  
// for (i = 0; i <= 5)
// for (i <= 5; i++)
// for i = 1 to 5

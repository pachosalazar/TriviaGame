//set up initial variables and new ones

var start;
var HTMLDOM;
var time = 0;
var question = ["What_is_the_name_of_the_Simpsons_next_door_neighbour?",
                "In which town do the Simpson's reside?", 
                "What did Bart name his pet elephant?",
                "What is the name of the school bus driver?", 
               ];
var answer = [("Ned_Flanders"," Otto", "Homer", "Apu"),
              ("Springfield", "Demopolis","Birmingham", "Guntersville"),
              ("Stampy", "Stoner: 1","Monty:2"," Rosty: 3"),
              ("Otto", "Timothy","Lyle","Apu")
                ];
var right = ["Ned Flanders", "Springfield", "Stampy", "Otto"];
var Counter = 0;
var crono;
var right = 0;
var Wrong = 0;
var blank= 0;
var music = new Audio("assets/sound/The-Simpsons-Theme-Song.mp3");
var good = new Audio("assets/sound/Bart - Cool Man.wav");
var bad = new Audio("assets/sound/Homer - D'oh! Wrong one!.wav");

$(document).ready(function () {
 
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-danger btn-lg btn-block start' href='#' role='button'>Are you ready!!</a></p>";
        $("#wrapper").html(startScreen);
    }

    initialScreen();


    $("body").on("click", ".start", function (event) {
        event.preventDefault(); 
        music.play();
        generateHTML();
        timerframe();

    });

    $("body").on("click", ".answer", function (event) {
       
        selectedAnswer = $(this).text();
        if (selectedAnswer === right[Counter]) {
           

            clearInterval(crono);
            good.play();
            Win();
        } else {
            clearInterval(crono);
            bad.play();
            Lost();
        }
    }); 

    $("body").on("click", ".reset-button", function (event) {
        music.play();
        resetHTMLDOM();
    }); 

}); 

function LossTimeOut() {
    blank++;
    HTMLDOM= "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
    + Counter + "</span></p>" + "<p class='text-center'>Bad luck man no more time " 
    + right[Counter] + "</p>" 
    + "<img class='center-block img-wrong' src='../image/timeout homer.gif'>";
    $("#wrapper").html(HTMLDOM);
    setTimeout(timer, 4000);
}

function Win() {
    right++;
    HTMLDOM= "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
    + Counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " 
    + right[Counter] + "</p>" + "<img class='center-block img-right' src='../image/bart.gif'>";
    $("#wrapper").html(HTMLDOM);
    setTimeout(timer, 4000); 
}

function Lost() {
    Wrong++;
    HTMLDOM = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
    + Counter + "</span></p>" + "<p class='text-center'>Wrong! Wrong! Wrong! "
     + right[Counter] + "</p>" 
     + "<img class='center-block img-wrong' src='../image/homer.gif'>";
    $("#wrapper").html(HTMLDOM);
    setTimeout(timer, 4000); 
}

function generateHTML() {
    HTMLDOM = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>"
     + question[Counter] + "</p><p class='first-answer answer'>A. " + answer[Counter][0] + 
     "</p><p class='answer'>B. " + answer[Counter][1] + "</p><p class='answer'>C. " 
     + answer[Counter][2] + "</p><p class='answer'>D. " + answer[Counter][3] + "</p>";
    $("#wrapper").html(HTMLDOM);
}

function timer() {
    if (time < 4) {
        time++;
        generateHTML();
        Counter = 0;
        timerframe();
    } else {
        finalScreen();
    }
}

function timerframe() {
    crono = setInterval(thirtySeconds, 1000);

    function thirtySeconds() {
        if (Counter === 0) {
            clearInterval(crono);
            generateLossDueToTimeOut();
        }
        if (Counter > 0) {
            Counter--;
        }
        $(".timer").html(Counter);
    }
}

function finalScreen() {
    HTMLDOM = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
    + Counter + "</span></p>" + "<p class='text-center'>Finally Yeah!!"
    + "</p>" + "<p class='summary-correct'> " + right + "</p>" 
    + "<p>Wrong Answers: " + Wrong + "</p>" + "<p>Missed " + blank + "</p>"
    + "<p class='text-center reset-button-container'><a class='btn btn-danger btn-lg btn-block reset-button' href='#' role='button'>U wanna play again?</a></p>";
    $("#wrapper").html(HTMLDOM);
}

function resetHTMLDOM() {
   time = 0;
    right = 0;
    Wrong = 0;
    blank = 0;
    Counter = 30;
    generateHTML();
    timerframe();
}


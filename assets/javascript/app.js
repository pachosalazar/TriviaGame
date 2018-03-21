//set up initial variables and new ones

var start;
var HTMLDOM;
var time = 30;
var question = ["What is the name of the Simpsons next door neighbour?",
                "In which town do the Simpson's reside?", 
                "What did Bart name his pet elephant?",
                "What is the name of the school bus driver?", 
               ];
var answer = [["Ned_Flanders"," Otto", "Homer", "Apu"],
              ["Springfield", "Demopolis","Birmingham", "Guntersville"],
              ["Stampy", "Stoner: 1","Monty:2"," Rosty: 3"],
              ["Otto", "Timothy","Lyle","Apu"]
                ];
var rightanswer = ["Ned Flanders", "Springfield", "Stampy", "Otto"];
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
        if (selectedAnswer === rightanswer[Counter]) {
           

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
    + time + "</span></p>" + "<p class='text-center'>Bad luck man no more time " 
    + rightanswer[Counter] + "</p>" 
    + "<img class='center-block img-wrong' src='image/timeout-homer.gif'>"
    $("#wrapper").html(HTMLDOM);
    setTimeout(timer, 4000);
}

function Win() {
    right++;
    HTMLDOM= "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
    + time + "</span></p>" + "<p class='text-center'>Correct! The answer is: " 
    + rightanswer[Counter] + "</p>" + "<img class='center-block img-right' src='image/bart.gif'>";
    $("#wrapper").html(HTMLDOM);
    setTimeout(timer, 4000); 
}

function Lost() {
    Wrong++;
    HTMLDOM = "<p class='text-center timer-p'>Tick Tack tick tack <span class='timer'>" 
    + time + "</span></p>" + "<p class='text-center'>Wrong! Wrong! Wrong! "
     + rightanswer[Counter] + "</p>" 
     + "<img class='center-block img-wrong' src='image/timeout-homer.gif'>";
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
    if (Counter < 4) {
        Counter++;
        generateHTML();
        time = 0;
        timerframe();
    } else {
        finalScreen();
    }
}

function timerframe() {
    crono = setInterval(thirtySeconds, 1000);

    function thirtySeconds() {
        if (time === 0) {
            clearInterval(crono);
            LossTimeOut();
        }
        if (time > 0) {
            time--;
        }
        $(".timer").html(time);
    }
}

function finalScreen() {
    HTMLDOM = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
    + time + "</span></p>" + "<p class='text-center'>Finally Yeah!!"
    + "</p>" + "<p class='summary-correct'> " + right + "</p>" 
    + "<p>Wrong Answers: " + Wrong + "</p>" + "<p>Missed " + blank + "</p>"
    + "<p class='text-center reset-button-container'><a class='btn btn-danger btn-lg btn-block reset-button' href='#' role='button'>U wanna play again?</a></p>";
    $("#wrapper").html(HTMLDOM);
}

function resetHTMLDOM() {
   time = 30;
    right = 0;
    Wrong = 0;
    blank = 0;
    Counter = 0;
    generateHTML();
    timerframe();
}


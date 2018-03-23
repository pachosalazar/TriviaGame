//set up initial variables and new ones

var start;
var HTMLDOM;
var time = 30;

// add another array within the array to use the index of the first one
var question = [
    ["What is the name of the Simpsons next door neighbour?"],
    ["In which town do the Simpson's reside?"],
    ["What did Bart name his pet elephant?"],
    ["What is the name of the school bus driver?"],
];
// change answers to arrays to
// answer[0] = [ "Ned Flanders", " Otto", "Homer", "Apu" ]
//  answers[0][0] = Ned Flanders
var answer = [
    ["Ned Flanders", " Otto", "Homer", "Apu"],
    ["Springfield", "Demopolis", "Birmingham", "Guntersville"],
    ["Stampy", "Stoner: 1", "Monty:2", " Rosty: 3"],
    ["Otto", "Timothy", "Lyle", "Apu"]
];
var right = ["A. Ned Flanders", "A. Springfield", "A. Stampy", "A. Otto"];
var Counter = 0;
var crono;
var Wrong = 0;
var blank = 0;
var music = new Audio("assets/sound/The-Simpsons-Theme-Song.mp3");
var good = new Audio("assets/sound/Bart - Cool Man.wav");
var bad = new Audio("assets/sound/Homer - D'oh! Wrong one!.wav");

$(document).ready(function() {

    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-danger btn-lg btn-block start' href='#' role='button'>Are you ready!!</a></p>";
        $("#wrapper").html(startScreen);
    }

    initialScreen();


    $("body").on("click", ".start", function(event) {
        event.preventDefault();
        music.play();
        generateHTML();
        // timerframe();

    });

    $("body").on("click", ".answer", function(event) {

        selectedAnswer = $(this).text();

        console.log("selectedAnswer", selectedAnswer)
        console.log("right[Counter]", right[Counter])

        if (selectedAnswer === right[Counter]) {

            // clearInterval(crono);
            // good.play();
            Win();
        } else {
            clearInterval(crono);
            bad.play();
            Lost();
        }
    });

    $("body").on("click", ".reset-button", function(event) {
        music.play();
    generateHTML();
    });

});

function LossTimeOut() {
    blank++;
    HTMLDOM = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
        time + "</span></p>" + "<p class='text-center'>Bad luck man no more time " +
        right[Counter] + "</p>" +
        "<img class='center-block img-wrong' src='../image/timeout homer.gif'>";
    $("#wrapper").html(HTMLDOM);
    setTimeout(timer, 4000);
}

function Win() {
    right++;
    HTMLDOM = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
        time + "</span></p>" + "<p class='text-center'>Correct! The answer is: " +
        right[Counter] + "</p>" + "<img class='center-block img-right' src='../image/bart.gif'>";
    $("#wrapper").html(HTMLDOM);
    setTimeout(timer, 4000);
}

function Lost() {
    Wrong++;
    HTMLDOM = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
        time + "</span></p>" + "<p class='text-center'>Wrong! Wrong! Wrong! " +
        right[Counter] + "</p>" +
        "<img class='center-block img-wrong' src='../image/homer.gif'>";
    $("#wrapper").html(HTMLDOM);
    setTimeout(timer, 4000);
}

function generateHTML() {
    HTMLDOM = "<p class='text-center timer-p'>Time Remaining: <span class='timer'></span></p><p class='text-center'>" +
        question[Counter] + "</p><p class='first-answer answer'>A. " + answer[Counter][0] +
        "</p><p class='answer'>B. " + answer[Counter][1] + "</p><p class='answer'>C. " +
        answer[Counter][2] + "</p><p class='answer'>D. " + answer[Counter][3] + "</p>";
    $("#wrapper").html(HTMLDOM);
}

function timer() {
    if (time < 4) {
        time++;
        generateHTML();
        Counter = 30;
        timerframe();
    } else {
        finalScreen();
    }
}

function timerframe() {
    crono = setInterval(thirtySeconds, 1000);

        if (Counter === 0) {
            clearInterval(crono);
            LossToTimeOut();
        } else(Counter > 0) 
            Counter--;
        
        $(".timer").html(Counter);
        
    
}

function finalScreen() {
    HTMLDOM = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
        Counter + "</span></p>" + "<p class='text-center'>Finally Yeah!!" +
        "</p>" + "<p class='summary-correct'> " + right + "</p>" +
        "<p>Wrong Answers: " + Wrong + "</p>" + "<p>Missed " + blank + "</p>" +
        "<p class='text-center reset-button-container'><a class='btn btn-danger btn-lg btn-block reset-button' href='#' role='button'>U wanna play again?</a></p>";
    $("#wrapper").html(HTMLDOM);
}

$(".reset-button").on("click", function(){
    console.log("clicked");
    time = 0;
    right = 0;
    Wrong = 0;
    blank = 0;
    Counter = 30;
    generateHTML();
    timerframe();
});
    

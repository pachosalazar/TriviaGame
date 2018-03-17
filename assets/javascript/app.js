//Javascript
var startValue = 120000; //Number of milliseconds
var time = new Date(startValue);
var interv;


function done(){
    alert("Timer reached 00:00!");
}
$(function(){
    displayTime();
    $(".start").on("click", function(){
    interv = setInterval(function(){
        time = new Date(time - 1000);
        if(time<=0){
            done();
            clearInterval(interv);
        }
        displayTime();
    }, 1000);
    });
    $(".stop").on("click", function(){
        clearInterval(interv);
        time = new Date(startValue);
        displayTime();
    });
    $(".pause").on("click", function(){
        clearInterval(interv);
    });
    $(".reset").on("click", function(){
        time = new Date(startValue);
        displayTime();
    });
});

function displayTime(){
    $(".time").text(fillZeroes(time.getMinutes()) + ":" + fillZeroes(time.getSeconds()));
}

function fillZeroes(t){
    t = t+"";
    if(t.length==1)
        return "0" + t;
    else
        return t;
};

$(document).ready(function() {
   
    $("input[name$='cars']").click(function() {
        var test = $(this).val();
       
        $("#" + test).show();
    });
});
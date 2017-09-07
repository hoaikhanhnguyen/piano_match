//Game area variables

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var cant_click_card_twice = false;

//Game info area variables

var matches =0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;//when page loads,variable should reset.when reset button is clicked, +1

//Game area functions

$(document).ready(function() {
    $(".card").click(card_clicked);
    $(".reset").click(reset_button);
    display_stats();
});
function card_clicked() {
    if(cant_click_card_twice){
        console.log("cant CLICK BEFORE RETURN");
        return};
    $(this).children(".back").fadeOut("fast");
    if (first_card_clicked == null) {
        return first_card_clicked = $(this).children(".front");
    } else {
        second_card_clicked = $(this).children(".front")
        attempts += 1;
        //This compares to see if both cards revealed match each other
        if ($(first_card_clicked).css("background-image") == $(second_card_clicked).css("background-image") && $(first_card_clicked).attr("id") != $(second_card_clicked).attr("id")) {
            match_counter += 1;
            matches = match_counter;
            first_card_clicked = null;
            second_card_clicked = null;
            // This checks if the player has won
            if (match_counter == total_possible_matches) {
                console.log("You have won!");
                return;
            }
            //If the cards do not match
        } else {
            console.log("these cards don't match");
            //resetCards();
            cant_click_card_twice = true;
            setTimeout(time_out_cards,2000);
            $(first_card_clicked).siblings(".back").fadeIn(2000);
            $(second_card_clicked).siblings(".back").fadeIn(2000);
            display_stats();
            return;
        }
        display_stats();
        return;
    }
}
function time_out_cards() {
    first_card_clicked = null;
    second_card_clicked = null;
    cant_click_card_twice = false;
};
//GAME INFO AREA FUNCTIONS
function display_stats(){
    $(".games-played .value").text(games_played);  // inserts games_played value into ".games-played.value" element
    $(".attempts .value").text(attempts);   //insert attempts value into ".attempts.value" element
    accuracy = (Math.floor((matches / attempts) * 100)) + "%";    //formats accuracy to a percentage with %sign
    $(".accuracy .value").text(accuracy);   //inserts formatted accuracy into ".accuracy.value" element
    return;
};
function reset_stats(){
    accuracy = 0;     //resets accuracy to 0
    match_counter = 0;      //resets matches to 0
    attempts = 0;      //resets attempts to 0
    display_stats();  //calls display_stats function
    return;
};
function reset_button(){
    games_played += 1;
    reset_stats();
    $(".back").fadeIn("fast");
    return;
};



function stackShuffle () {
    //loop until array is empty
    let audioFiles = [];
    for (i = 36; i < 47; i++) {
        audioFiles.push(`piano_sounds/0${i}.wav`)
    }
    let audioFilesCopy = audioFiles.slice();

    for (var i = 0; i < audioFiles.length; i++) {
        var card_selected = Math.floor(Math.random() * audioFilesCopy.length);
        $('#'+i+"> img").attr("src", audioFilesCopy[card_selected]);
        audioFilesCopy.splice(card_selected, 1);
    }
}

const keyObject = {
    'white7': '036.wav',
    'black8': '037.wav',
    'white8': '038.wav',
    'black9': '039.wav',
    'white9': '040.wav',
    'white10': '041.wav',
    'black11': '042.wav',
    'white11': '043.wav',
    'black12':'044.wav',
    'white12': '045.wav',
    'black13': '046.wav',
    'white13': '047.wav'
};


const keyObject = {
    'white7': 'piano_sounds/036.wav',
    'black8': 'piano_sounds/037.wav',
    'white8': 'piano_sounds/038.wav',
    'black9': 'piano_sounds/039.wav',
    'white9': 'piano_sounds/040.wav',
    'white10': 'piano_sounds/041.wav',
    'black11': 'piano_sounds/042.wav',
    'white11': 'piano_sounds/043.wav',
    'black12':'piano_sounds/044.wav',
    'white12': 'piano_sounds/045.wav',
    'black13': 'piano_sounds/046.wav',
    'white13': 'piano_sounds/047.wav'
};
//Game area variables

let first_card_clicked = null;
let second_card_clicked = null;
let total_possible_matches = 12;
let cant_click_card_twice = false;

//Game info area variables

let matches =0;
let attempts = 0;
let accuracy = 0;
let games_played = 0;//when page loads,variable should reset.when reset button is clicked, +1
let score = 0;
let score_multiplier = 1;

$(document).ready(function() {
    stackShuffle();
    $(".card").click(card_clicked);
    $(".key").click(key_clicked);
    // $(".reset").click(reset_button);
    // display_stats();
});
function card_clicked() {
    console.log(this);
    if(cant_click_card_twice){
        playSound($(this).attr("sound"));
        console.log("cant CLICK. Please click a key ");
        return
    }
    $(this).animate({
        opacity: .5,
        height: "50%"
    });
    if (first_card_clicked == null && cant_click_card_twice === false) {
        playSound($(this).attr("sound"));
        cant_click_card_twice = true;
        return first_card_clicked = $(this);
    }
        display_stats();
}
function key_clicked(){
    console.log(this);
    if(first_card_clicked !== null){
        second_card_clicked = $(this);
        attempts += 1;
        if(keyObject[second_card_clicked.attr("id")] === first_card_clicked.attr("sound")){
            console.log("match!");
            first_card_clicked.fadeOut("fast");
            first_card_clicked = null;
            second_card_clicked = null;
            cant_click_card_twice = false;
            matches++;
            score += 1000*score_multiplier;
            score_multiplier++;
            display_score();
                    if (matches === total_possible_matches) {
                        alert("You have won!");
                    }
        }else if(keyObject[second_card_clicked.attr("id")] !== first_card_clicked.attr("sound")){
            console.log("no match!");
            first_card_clicked.animate({
                opacity: 1,
                height: "50%"
            });
            first_card_clicked = null;
            second_card_clicked = null;
            cant_click_card_twice = false;
            score_multiplier = 1;
        }
    }
}
//GAME INFO AREA FUNCTIONS
function display_score(){
    $("#score").text(`Score: ${score}`);
}

// function display_stats(){
//     // $(".games-played .value").text(games_played);  // inserts games_played value into ".games-played.value" element
//     $(".attempts .value").text(attempts);   //insert attempts value into ".attempts.value" element
//     accuracy = (Math.floor((matches / attempts) * 100)) + "%";    //formats accuracy to a percentage with %sign
//     $(".accuracy .value").text(accuracy);   //inserts formatted accuracy into ".accuracy.value" element
//     return;
// };
// function reset_stats(){
//     accuracy = 0;     //resets accuracy to 0
//     match_counter = 0;      //resets matches to 0
//     attempts = 0;      //resets attempts to 0
//     display_stats();  //calls display_stats function
//     return;
// };
// function reset_button(){
//     games_played += 1;
//     reset_stats();
//     $(".back").fadeIn("fast");
//     return;
// };

function stackShuffle () {
    let audioFiles = [];
    for (i = 36; i < 48; i++) {
        audioFiles.push(`piano_sounds/0${i}.wav`)
    }
    let audioFilesCopy = audioFiles.slice();
    console.log(audioFilesCopy);
    for (var i = 0; i < audioFiles.length; i++) {
        var card_selected = Math.floor(Math.random() * audioFilesCopy.length);
        $(`#${i}`).attr("sound", audioFilesCopy[card_selected]);
        audioFilesCopy.splice(card_selected, 1);
    }
}

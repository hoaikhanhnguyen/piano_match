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
let last_sound_played = null;
let allow_replay = false;
//Game info area variables

let matches =0;
let attempts = 0;
let accuracy = 0;
let score = 0;
let score_multiplier = 1;

$(document).ready(function() {
    stackShuffle();
    $(".card").click(card_clicked);
    $(".key").click(key_clicked);
    $("#previous_sound").click(play_previous_sound);
    $("#reset").click(reset_stats);
    $("#music_off").click(stop_music);
});
function card_clicked() {
    console.log(this);
    if(cant_click_card_twice){
        console.log("cant CLICK. Please click a key ");
        return
    }
    $(this).addClass("note_animation");
    //     .animate({
    //     opacity: .5,
    // });
    if (first_card_clicked == null && cant_click_card_twice === false) {
        playSound($(this).attr("sound"));
        last_sound_played = $(this).attr("sound");
        cant_click_card_twice = true;
        allow_replay = true;
        return first_card_clicked = $(this);
    }
}
function key_clicked(){
    console.log(this);
    if(first_card_clicked !== null){
        second_card_clicked = $(this);
        attempts += 1;
        if(keyObject[second_card_clicked.attr("id")] === first_card_clicked.attr("sound")){
            console.log("match!");
            playSound("sfx/correct_match.wav");
            first_card_clicked.fadeOut("slow");
            first_card_clicked = null;
            second_card_clicked = null;
            cant_click_card_twice = false;
            matches++;
            score += 1000*score_multiplier;
            $(".score_indicator").text(`+${1000*score_multiplier}`).animate({top: '5%', opacity: 1}, 1000,function(){
                $(this).removeAttr('style').text("")
            });
            score_multiplier++;
            display_score();
            display_accuracy();
                    if (matches === total_possible_matches) {
                        playSound("sfx/victory.wav");
                        $(".music_sheet").append($("<div>").text("CONGRATULATIONS!"));
                    }
        }else if(keyObject[second_card_clicked.attr("id")] !== first_card_clicked.attr("sound")){
            console.log("no match!");
            first_card_clicked.removeClass("note_animation");
            first_card_clicked = null;
            second_card_clicked = null;
            cant_click_card_twice = false;
            score_multiplier = 1;
            display_score();
            display_accuracy();
        }
        allow_replay = false;
    }
}

function play_previous_sound(){
    if(allow_replay) {
        playSound(last_sound_played);
        if(score > 100){
            score = score - 100;
        }
        display_score();
    }
}
//GAME INFO AREA FUNCTIONS

function display_score() {
    $("#score").text(`Score: ${score}`);
    $("#multiplier").text(`Multiplier: ${score_multiplier}x`);
}

function display_accuracy() {
    accuracy = (Math.floor((matches / attempts) * 100)) + "%";
    $("#accuracy").text(`Accuracy: ${accuracy}`);   //inserts formatted accuracy into ".accuracy.value" element
}

function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    score = 0;
    score_multiplier = 0;
    display_score();
    $("#accuracy").text(`Accuracy: 0`);
    $(".card").fadeIn("fast");
    stackShuffle();
}
function stackShuffle () {
    let audioFiles = [];
    for (i = 36; i < 48; i++) {
        audioFiles.push(`piano_sounds/0${i}.wav`)
    }
    let audioFilesCopy = audioFiles.slice();
    console.log(audioFilesCopy);
    for (var i = 0; i < audioFiles.length; i++) {
        var card_selected = (Math.random() * audioFilesCopy.length) | 0;
        $(`#${i}`).attr("sound", audioFilesCopy[card_selected]);
        audioFilesCopy.splice(card_selected, 1);
    }
}
function stop_music(){
    if($("#music_off").hasClass("on")) {
        $("audio").trigger("pause");
        $("#music_off").text(`Music On`);
        $("#music_off").removeClass("on");
    }else{
        $("audio").trigger("play");
        $("#music_off").text(`Music Off`);
        $("#music_off").addClass("on");
    }
}

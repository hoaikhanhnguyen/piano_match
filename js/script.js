const keyObject = {
    'white7': 'c',
    'black8': 'c#',
    'white8': 'd',
    'black9': 'd#',
    'white9': 'e',
    'white10': 'f',
    'black11': 'f#',
    'white11': 'g',
    'black12':'g#',
    'white12': 'a',
    'black13': 'a#',
    'white13': 'b'
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
    $(".active_key").on("mousedown", key_clicked);
    $("#previous_sound").click(play_previous_sound);
    $("#reset").click(reset_stats);
    $("#music_off").click(stop_music);
    $("#key_press").click(key_press_assist);
});
function isSingleNote(element){
    if($(element).attr("src") === "images/music_note3.svg"){
        return true;
    }
    return false;
}
function card_clicked() {
    console.log(this.notes);
    if(cant_click_card_twice){
        console.log("cant CLICK. Please click a key ");
        return
    }
    $(this).removeClass("card_float");
    $(this).addClass("note_clicked_animation");
    if (first_card_clicked == null && cant_click_card_twice === false) {
        playNotes(this.notes);
        last_sound_played = $(this)[0].notes;
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
        if(keyObject[second_card_clicked.attr("id")] === first_card_clicked[0].notes[0]){
            playSound("sfx/correct_match.wav");
            first_card_clicked.fadeOut("slow");
            first_card_clicked = null;
            second_card_clicked = null;
            cant_click_card_twice = false;
            matches++;
            score += 1000*score_multiplier;
            $(".score_indicator").text(`+${1000*score_multiplier}`).animate({top: '5%', opacity: 0}, 1000,function(){
                $(this).removeAttr('style').text("")
            });
            score_multiplier++;
            setTimeout(display_score,800);
            display_accuracy();
                    if (matches === total_possible_matches) {
                        playSound("sfx/victory.wav");
                        $(".music_sheet").append($("<div>").addClass("victory_text").text("CONGRATULATIONS!!!"));
                    }
        }else{
            first_card_clicked.removeClass("note_clicked_animation");
            first_card_clicked.addClass("card_float");
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
        playNotes(last_sound_played);
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
    $(".victory_text").text("");
    $("#accuracy").text(`Accuracy: 0`);
    $(".card").fadeIn("fast");
    $(".card").removeClass("note_clicked_animation");
    $(".card").addClass("card_float");
    stackShuffle();

}
function stackShuffle () {
    let audioFiles = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'];
    var i = 0;
    while(audioFiles.length) {
        var noteElement = $(`#${i}`);
        var card_selected = (Math.random() * audioFiles.length) | 0;
        var notes = [];
        var selectedNote = audioFiles[card_selected];
        notes.push(selectedNote);
        if(!isSingleNote(noteElement)){
            notes.push(selectedNote);
        }
        audioFiles.splice(card_selected, 1);
        noteElement[0].notes = notes;
        i++;
    }
}
function stop_music(){
    if($("#music_off").hasClass("on")) {
        $("audio").trigger("pause");
        $("#music_off").text(`Music Off`);
        $("#music_off").removeClass("on");
    }else{
        $("audio").trigger("play");
        $("#music_off").text(`Music On`);
        $("#music_off").addClass("on");
    }
}
function key_press_assist(){
    if($("#key_press").hasClass("off")) {
        allowed = true;
        $("#key_press").text(`Key press Assist On`);
        $("#key_press").removeClass("off");
    }else{
        allowed = false;
        $("#key_press").text(`Key press Assist Off`);
        $("#key_press").addClass("off");
    }
}
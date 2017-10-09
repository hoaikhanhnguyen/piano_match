function playSound(src){
    var player = new Audio();
    player.src = src;
    player.play();
}
let playingSound = null;
let audioFiles = [];
for (i = 36; i < 47; i++) {
    audioFiles.push(`piano_sounds/0${i}.mp3`)
}
audioFiles.preload = "auto";

let whiteKeys = [36, 38, 40, 41, 43, 45, 47 ];
let blackKeys = [37, 39, 0, 42, 44, 46];
let isDown = false;
let flag = false;
// $(currentKey).bind('touchstart mousedown', function(){
//     if (!flag) {
//         flag = true;
//         setTimeout(function(){ flag = false; }, 100);
//         // do something
//     }
//
//     return false
// });
for(i=0; i<whiteKeys.length;i++) {
    let currentKey = $(`#white${i+7}`)[0];
    let currentSound = `piano_sounds/0${whiteKeys[i]}.mp3`;
    $(currentKey).bind('mousedown touchstart', function () {
        if (!flag){
        flag = true;
        setTimeout(function(){ flag = false; }, 100);
        playSound(currentSound);
        $(currentKey).css("background-color", "black");
        isDown = true;
        }
        return false
    }).on('mouseup touchend', function () {
        $(currentKey).css("background-color", "white");
        isDown = false;
    }).on('mouseleave', function () {
        $(currentKey).css("background-color", "white");
        isDown = false;
    }).on('mouseover', function(){
        if(isDown){
            playSound(currentSound);
            $(currentKey).css("opacity", 1);
        }
    });
}
for(i=0; i<blackKeys.length;i++) {
    let currentKey = $(`#black${i+8}`)[0];
    let currentSound = `piano_sounds/0${blackKeys[i]}.mp3`;
    $(currentKey).bind('mousedown touchstart', function () {
        if(!flag) {
            flag = true;
            setTimeout(function(){ flag = false; }, 100);
            playSound(currentSound);
            $(currentKey).addClass("black_key_select");
            isDown = true;
        }
        return false
    }).on('mouseup touchend', function () {
        $(currentKey).removeClass("black_key_select");
        isDown = false;
    }).on('mouseleave', function () {
        $(currentKey).removeClass("black_key_select");
        isDown = false;
    }).on('mouseover', function(){
        if(isDown === true){
            playSound(currentSound);
            $(currentKey).addClass("black_key_select");
        }
    });
}
function playNotes(noteArray){
    const noteObject = {
        'c': '036.mp3',
        'c#': '037.mp3',
        'd': '038.mp3',
        'd#': '039.mp3',
        'e': '040.mp3',
        'f': '041.mp3',
        'f#': '042.mp3',
        'g': '043.mp3',
        'g#':'044.mp3',
        'a': '045.mp3',
        'a#': '046.mp3',
        'b': '047.mp3'
    };
    const timePerNote = 250;
    var notePosition = 0;
    function triggerNote(){
        let note = noteArray[notePosition];
        let duration = timePerNote;
        if(note.length>2){
            let durationPosition = 1;
            if(isNaN(note[1])){
                durationPosition = 2;
            }
            duration = parseInt(note.substr(durationPosition));
            note = note.substr(0,durationPosition);
        }
        playSound( 'piano_sounds/'+noteObject[note]);
        if(++notePosition < noteArray.length){
            setTimeout(triggerNote, duration);
        }
    }
    triggerNote();
}
// const ode_to_joy = playNotes(['e300','e300','f300','g300','g300','f300','e300','d300','c300','c300','d300','e300','e500','d130','d130']);

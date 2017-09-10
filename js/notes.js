function playSound(src){
    var player = new Audio();
    player.src = src;
    player.play();
}

let audioFiles = [];
for (i = 36; i < 47; i++) {
    audioFiles.push(`piano_sounds/0${i}.wav`)
}
audioFiles.preload = "auto";

let whiteKeys = [36, 38, 40, 41, 43, 45, 47 ];
let blackKeys = [37, 39, 0, 42, 44, 46];
let isDown = false;
for(i=0; i<whiteKeys.length;i++) {
    let currentKey = $(`#white${i+7}`)[0];
    let currentSound = `piano_sounds/0${whiteKeys[i]}.wav`;
    $(currentKey).on('mousedown', function () {
        playSound(currentSound);
        $(currentKey).css("opacity", 1);
        isDown = true;
    }).on('mouseup', function () {
        $(currentKey).css("opacity", 0.6);
        isDown = false;
    }).on('mouseleave', function () {
        $(currentKey).css("opacity", 0.6);
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
    let currentSound = `piano_sounds/0${blackKeys[i]}.wav`;
    $(currentKey).on('mousedown', function () {
        playSound(currentSound);
        $(currentKey).addClass("black_key_select");
        isDown = true;
    }).on('mouseup', function () {
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
        'c': '036.wav',
        'c#': '037.wav',
        'd': '038.wav',
        'd#': '039.wav',
        'e': '040.wav',
        'f': '041.wav',
        'f#': '042.wav',
        'g': '043.wav',
        'g#':'044.wav',
        'a': '045.wav',
        'a#': '046.wav',
        'b': '047.wav'
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

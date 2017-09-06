function playSound(src){
    const player = new Audio();
    player.src = src;
    player.onended = function(){
        console.log('player done playing')
    };
    player.play();
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
        'b': '046.wav'
    }
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
// playNotes(['e300','e300','f300','g300','g300','f300','e300','d300','c300','c300','d300','e300','e500','d130','d130'])

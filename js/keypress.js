let allowed = false;
$(window).keydown(function(e){
    if(allowed) {
        if (e.keyCode === 69) {
            playSound(`piano_sounds/0${whiteKeys[0]}.wav`);
            $("#white7").css("opacity", 1);
        } else if (e.keyCode === 82) {
            playSound(`piano_sounds/0${whiteKeys[1]}.wav`);
            $("#white8").css("opacity", 1);
        } else if (e.keyCode === 84) {
            playSound(`piano_sounds/0${whiteKeys[2]}.wav`);
            $("#white9").css("opacity", 1);
        } else if (e.keyCode === 89) {
            playSound(`piano_sounds/0${whiteKeys[3]}.wav`);
            $("#white10").css("opacity", 1);
        } else if (e.keyCode === 85) {
            playSound(`piano_sounds/0${whiteKeys[4]}.wav`);
            $("#white11").css("opacity", 1);
        } else if (e.keyCode === 73) {
            playSound(`piano_sounds/0${whiteKeys[5]}.wav`);
            $("#white12").css("opacity", 1);
        } else if (e.keyCode === 79) {
            playSound(`piano_sounds/0${whiteKeys[6]}.wav`);
            $("#white13").css("opacity", 1);
        } else if (e.keyCode === 52) {
            playSound(`piano_sounds/0${blackKeys[0]}.wav`);
            $("#black8").addClass("black_key_select");
        } else if (e.keyCode === 53) {
            playSound(`piano_sounds/0${blackKeys[1]}.wav`);
            $("#black9").addClass("black_key_select");
        } else if (e.keyCode === 55) {
            playSound(`piano_sounds/0${blackKeys[3]}.wav`);
            $("#black11").addClass("black_key_select");
        }else if (e.keyCode === 56) {
            playSound(`piano_sounds/0${blackKeys[4]}.wav`);
            $("#black12").addClass("black_key_select");
        }else if (e.keyCode === 57) {
            playSound(`piano_sounds/0${blackKeys[5]}.wav`);
            $("#black13").addClass("black_key_select");
        }
    }
});
$(window).keyup(function(e){
    if(allowed) {
        if (e.keyCode === 69) {
            $("#white7").css("opacity", 0.6);
        } else if (e.keyCode === 82) {
            $("#white8").css("opacity", 0.6);
        } else if (e.keyCode === 84) {
            $("#white9").css("opacity", 0.6);
        } else if (e.keyCode === 89) {
            $("#white10").css("opacity", 0.6);
        } else if (e.keyCode === 85) {
            $("#white11").css("opacity", 0.6);
        } else if (e.keyCode === 73) {
            $("#white12").css("opacity", 0.6);
        } else if (e.keyCode === 79) {
            $("#white13").css("opacity", 0.6);
        } else if (e.keyCode === 52) {
            $("#black8").removeClass("black_key_select");
        } else if (e.keyCode === 53) {
            $("#black9").removeClass("black_key_select");
        } else if (e.keyCode === 55) {
            $("#black11").removeClass("black_key_select");
        } else if (e.keyCode === 56) {
            $("#black12").removeClass("black_key_select");
        } else if (e.keyCode === 57) {
            $("#black13").removeClass("black_key_select");
        }
    }
});

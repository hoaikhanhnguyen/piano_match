let allowed = true;
$(window).keydown(function(e){
    if(e.keyCode ===69 && allowed === true){
        playSound(`piano_sounds/0${whiteKeys[0]}.wav`);
        $("#white7").css("opacity", 1);
    }else if(e.keyCode ===82 && allowed === true){
        playSound(`piano_sounds/0${whiteKeys[1]}.wav`);
        $("#white8").css("opacity", 1);
    }else if(e.keyCode ===84 && allowed === true){
        playSound(`piano_sounds/0${whiteKeys[2]}.wav`);
        $("#white9").css("opacity", 1);
    }else if(e.keyCode ===89 && allowed === true){
        playSound(`piano_sounds/0${whiteKeys[3]}.wav`);
        $("#white10").css("opacity", 1);
    }else if(e.keyCode ===85 && allowed === true){
        playSound(`piano_sounds/0${whiteKeys[4]}.wav`);
        $("#white11").css("opacity", 1);
    }else if(e.keyCode ===73 && allowed === true){
        playSound(`piano_sounds/0${whiteKeys[5]}.wav`);
        $("#white12").css("opacity", 1);
    }else if(e.keyCode ===79 && allowed === true){
        playSound(`piano_sounds/0${whiteKeys[6]}.wav`);
        $("#white13").css("opacity", 1);
    }
    allowed = false;
});
$(window).keyup(function(e){
    if(e.keyCode ===69){
        $("#white7").css("opacity", 0.6);
        allowed = true;
    }else if (e.keyCode === 82) {
        $("#white8").css("opacity", 0.6);
    }else if(e.keyCode ===84){
        $("#white9").css("opacity", 0.6);
    }else if(e.keyCode ===89){
        $("#white10").css("opacity", 0.6);
    }else if(e.keyCode ===85){
        $("#white11").css("opacity", 0.6);
    }else if(e.keyCode ===73){
        $("#white12").css("opacity", 0.6);
    }else if(e.keyCode ===79){
        $("#white13").css("opacity", 0.6);
    }
    allowed = true;
});

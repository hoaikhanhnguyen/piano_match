function Keyboard() {


//White Keys
    this.create_white_keys = function(){
        for (i = 0; i < 24; i++) {
            $(".white_keyboard").append($("<div>").addClass("white_key").attr("id",`white${i}`).addClass("key"));
        }
    };


    const key = [3, 4];
    let current = 0;
    let skip_key = 1;
    this.create_black_keys = function() {
        for (i = 1; i < 24; i++) {
            if (skip_key === key[current]) {
                console.log('             ');
                $(".black_keyboard").append($("<div>").addClass("skip_key"));
                current = 1 - current;
                skip_key = 1;
            } else {
                $(".black_keyboard").append($("<div>").addClass("black_key").attr("id", `black${i}`).addClass("key"));
                skip_key++;
            }
        }
    }
}
let piano = new Keyboard();
piano.create_white_keys();
piano.create_black_keys();
// $("#white7").text('C');
console.log("polla");
console.log("gorda");
console.log("UwU");

enum State {
    STATS, BREEDING, CATCHING, TYPE_COMPATIBILITY, FORMS
}

var stateNames = ["Stats", "Breed", "Catch", "Typing", "Forms"];

var state = State.STATS;

var screenQueries :jQuery[] | undefined;
var $displayScreen :jQuery | undefined;

$(document).ready(function() {

    screenQueries = [$("#stats"), $("#breeding"), $("#catching"), $("#typeCompatibility"), $("#forms")];
    $displayScreen = $("#displayScreen");

    updateScreensWithState(state);
    
    $("#displayL").click(function() {
        state = state == 0 ? 4 : (state - 1);
        updateScreensWithState(state);
    });
    
    $("#displayR").click(function() {
        state = state == 4 ? 0 : (state + 1);
        updateScreensWithState(state);
    }); 
});

function updateScreensWithState(state :State) {
    if(!screenQueries || !$displayScreen)
            return;


    for(let i = 0; i < screenQueries.length; i++) {
        let prevState = state == 0 ? (screenQueries.length - 1) : (state - 1);
        if(i == state) {
            screenQueries[i].css("transform", "translateX(0) scaleX(1)");
        } else if(i == prevState) {
            screenQueries[i].css("transform", "translateX(-150px) scaleX(0)");
        } else {
            screenQueries[i].css("transform", "translateX(180px) scaleX(0)");
        }
    }

    $displayScreen.text(stateNames[state]);
}
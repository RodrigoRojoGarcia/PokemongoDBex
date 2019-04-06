console.log("polla");
console.log("gorda");
console.log("UwU");
var State;
(function (State) {
    State[State["STATS"] = 0] = "STATS";
    State[State["BREEDING"] = 1] = "BREEDING";
    State[State["CATCHING"] = 2] = "CATCHING";
    State[State["TYPE_COMPATIBILITY"] = 3] = "TYPE_COMPATIBILITY";
    State[State["FORMS"] = 4] = "FORMS";
})(State || (State = {}));
var stateNames = ["Stats", "Breed", "Catch", "Typing", "Forms"];
var state = State.STATS;
var screenQueries;
var $displayScreen;
$(document).ready(function () {
    screenQueries = [$("#stats"), $("#breeding"), $("#catching"), $("#typeCompatibility"), $("#forms")];
    $displayScreen = $("#displayScreen");
    updateScreensWithState(state);
    $("#displayL").click(function () {
        state = state == 0 ? 4 : (state - 1);
        updateScreensWithState(state);
    });
    $("#displayR").click(function () {
        state = state == 4 ? 0 : (state + 1);
        updateScreensWithState(state);
    });
});
function updateScreensWithState(state) {
    if (!screenQueries || !$displayScreen)
        return;
    for (var i = 0; i < screenQueries.length; i++) {
        var prevState = state == 0 ? (screenQueries.length - 1) : (state - 1);
        if (i == state) {
            screenQueries[i].css("transform", "translateX(0) scaleX(1)");
        }
        else if (i == prevState) {
            screenQueries[i].css("transform", "translateX(-150px) scaleX(0)");
        }
        else {
            screenQueries[i].css("transform", "translateX(180px) scaleX(0)");
        }
    }
    $displayScreen.text(stateNames[state]);
}
//# sourceMappingURL=main.js.map
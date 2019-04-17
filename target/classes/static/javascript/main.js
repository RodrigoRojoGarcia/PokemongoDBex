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
var stateNames = ["Stats", "Breed", "Catch", "Types", "Forms"];
var state = State.STATS;
var screenQueries;
var $displayScreen;
var search;
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
    Connection.getByCondition([], function (docs) { return updateGrid(docs); });
    // Connection.ajaxGet("query").done(docs => updateGrid(docs as any));
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
function updateGrid(pokemonList) {
    var $grid = $("#grid");
    $grid.empty();
    var _loop_1 = function (pokemon) {
        Connection.ajaxGet("images/icons/" + pokemon.pokedex_number + ".png")
            .done(function () {
            return $grid.append("<div id=\"pkicon" + pokemon.pokedex_number + "\"><img src=\"images/icons/" + pokemon.pokedex_number + ".png\"/></div>");
        }).fail(function () {
            return $grid.append("<div id=\"pkicon" + pokemon.pokedex_number + "\"><img src=\"images/icons/susti.png\"/></div>");
        });
    };
    for (var _i = 0, pokemonList_1 = pokemonList; _i < pokemonList_1.length; _i++) {
        var pokemon = pokemonList_1[_i];
        _loop_1(pokemon);
    }
}
//# sourceMappingURL=main.js.map
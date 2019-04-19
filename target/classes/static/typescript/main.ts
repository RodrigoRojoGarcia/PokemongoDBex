


$(document).ready(function() {

    ScreenManager.doQueries();
    ScreenManager.updateScreensWithState();
    
    UIManager.assignInput();
    
    Connection.getByCondition([], docs => ScreenManager.updateGrid(docs));
    Connection.getPokemon(723, pokemon => console.log("El Pokémon 723 es " + pokemon.name + ". Su nombre en japonés es " + pokemon.japanese_name));
});



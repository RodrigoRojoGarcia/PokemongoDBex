class ScreenManager {
    static updateScreensWithState() {
        if (!this.screenQueries || !this.$displayScreen)
            return;
        for (let i = 0; i < this.screenQueries.length; i++) {
            let prevState = State.get() == 0 ? (this.screenQueries.length - 1) : (State.get() - 1);
            if (i == State.get()) {
                this.screenQueries[i].css("transform", "translateX(0) scaleX(1)");
            }
            else if (i == prevState) {
                this.screenQueries[i].css("transform", "translateX(-150px) scaleX(0)");
            }
            else {
                this.screenQueries[i].css("transform", "translateX(180px) scaleX(0)");
            }
        }
        this.$displayScreen.text(State.getName(State.get()));
    }
    static updateGrid(pokemonList) {
        var $grid = $("#grid");
        pokemonList.sort((p1, p2) => p1.pokedex_number - p2.pokedex_number);
        var divMap = new Map();
        for (let pokemon of pokemonList) {
            let onclick = "onclick=\"ScreenManager.setPokemon(" + pokemon.pokedex_number + ")\"";
            Connection.ajaxGet("images/icons/" + pokemon.pokedex_number + ".png")
                .done(() => divMap.set(pokemon.pokedex_number, "<div id=\"pkicon" + pokemon.pokedex_number + "\" " + onclick + "><img src=\"images/icons/" + pokemon.pokedex_number + ".png\" class=\"gridImage\"/></div>")).fail(() => divMap.set(pokemon.pokedex_number, "<div id=\"pkicon" + pokemon.pokedex_number + "\" " + onclick + "><img src=\"images/icons/susti.png\"/></div>")).then(() => {
                if (divMap.size == pokemonList.length)
                    ScreenManager.updateGridAux($grid, divMap);
            });
        }
    }
    static updateGridAux($grid, divMap) {
        let keySet = [];
        for (let key of divMap.keys()) {
            keySet.push(key);
        }
        keySet.sort((k1, k2) => k1 - k2);
        $grid.empty();
        for (let key of keySet) {
            $grid.append(divMap.get(key));
        }
        if (ScreenManager.$loading)
            ScreenManager.$loading.hide();
    }
    static doQueries() {
        ScreenManager.screenQueries = [$("#stats"), $("#breeding"), $("#catching"), $("#typeCompatibility"), $("#forms")];
        ScreenManager.$displayScreen = $("#displayScreen");
        ScreenManager.$image = $("#image");
        ScreenManager.$loading = $("#loading");
    }
    static setPokemon(id, listener) {
        var that = this;
        Connection.getPokemon(id, pokemon => {
            that.pokemon = pokemon;
            var selected = "susti.png";
            if (pokemon.images.length > 0) {
                let baseImage = pokemon.pokedex_number + ".png";
                let indexOfBaseImage = pokemon.images.indexOf(baseImage);
                if (indexOfBaseImage != -1)
                    selected = pokemon.images[indexOfBaseImage];
                else
                    selected = pokemon.images[0];
            }
            Connection.ajaxGet("/images/pokemon/" + selected)
                .done(() => {
                if (that.$image)
                    that.$image.attr("src", "/images/pokemon/" + selected);
            }).fail(() => {
                if (that.$image)
                    that.$image.attr("src", "/images/pokemon/susti.png");
            });
            if (listener)
                listener(pokemon);
        });
    }
    static getPokemon() {
        return this.pokemon;
    }
}
//# sourceMappingURL=screenmanager.js.map
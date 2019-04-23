class UIManager {
    static doQueries() {
        this.$lowerArea = $("#lowerArea");
        this.$higherArea = $("#upperArea");
        this.$lowerScreen = $("#lowerScreen");
        this.$higherScreen = $("#upperScreen");
        this.$imageBackground = $("#imageBackground");
        this.$configButton = $("#configButton");
        this.$orderButton = $("#orderButton");
        this.$typeOfOrderButtonToggle = $("#typeOfOrderButtonToggle");
        this.$addPokemonButton = $("#addPokemonButton");
        this.$filterTypes = [
            $("#filterType-bug"), $("#filterType-dark"), $("#filterType-dragon"),
            $("#filterType-electric"), $("#filterType-fairy"), $("#filterType-fighting"),
            $("#filterType-fire"), $("#filterType-flying"), $("#filterType-ghost"),
            $("#filterType-grass"), $("#filterType-ground"), $("#filterType-ice"),
            $("#filterType-normal"), $("#filterType-poison"), $("#filterType-psychic"),
            $("#filterType-rock"), $("#filterType-steel"), $("#filterType-water")
        ];
        this.$filterGenerations = [
            $("#filterGen-1"),
            $("#filterGen-2"),
            $("#filterGen-3"),
            $("#filterGen-4"),
            $("#filterGen-5"),
            $("#filterGen-6"),
            $("#filterGen-7"),
            $("#filterGen-Custom")
        ];
        this.$filterLegendary = $("#filterLegendary");
        this.$filterPseudolegendary = $("#filterPseudolegendary");
    }
    static assignInput() {
        $("#displayL").click(UIManager.nextState);
        $("#displayR").click(UIManager.previousState);
        $("#typeLeft").click(UIManager.nextCompatibility);
        $("#typeRight").click(UIManager.previousCompatibility);
        if (this.$typeOfOrderButtonToggle)
            this.$typeOfOrderButtonToggle.click(UIManager.nextOrder);
        if (this.$orderButton)
            this.$orderButton.click(UIManager.toggleOrderType);
        if (this.$filterTypes) {
            for (let filterJQuery of this.$filterTypes) {
                filterJQuery.click(() => UIManager.filterByType(filterJQuery));
            }
        }
        if (this.$filterGenerations) {
            for (let filterJQuery of this.$filterGenerations) {
                filterJQuery.click(() => UIManager.filterByGeneration(filterJQuery));
            }
        }
        if (this.$filterLegendary) {
            let that = this;
            this.$filterLegendary.click(() => {
                if (that.$filterLegendary)
                    UIManager.filterByLegendary(that.$filterLegendary);
            });
        }
        if (this.$filterPseudolegendary) {
            let that = this;
            this.$filterPseudolegendary.click(() => {
                if (that.$filterPseudolegendary)
                    UIManager.filterByPseudolegendary(that.$filterPseudolegendary);
            });
        }
    }
    static applyServerSettings() {
        var that = this;
        Connection.getAllConfigAttributes(function (reponse) {
            that.updateUIColor(reponse.color);
            that.updateUIPattern(reponse.pattern);
            that.updateUIBackground(reponse.background);
        });
    }
    static nextState() {
        State.nextState();
        ScreenManager.updateScreensWithState();
    }
    static previousState() {
        State.previousState();
        ScreenManager.updateScreensWithState();
    }
    static nextCompatibility() {
        Compatibility.nextCompatibility();
        ScreenManager.updateTypeCompatibilityScreen();
    }
    static previousCompatibility() {
        Compatibility.previousCompatibility();
        ScreenManager.updateTypeCompatibilityScreen();
    }
    static nextOrder() {
        OrderType.nextOrder();
        if (UIManager.$typeOfOrderButtonToggle)
            UIManager.waitForImageToDownloadThenUpdateCss(UIManager.$typeOfOrderButtonToggle, "images/interface/Button_Neutro_" + OrderType.getName() + ".png");
        var search = UIManager.getSearch();
        var pokemonList = ScreenManager.getPokemonList();
        ScreenManager.updateSortLambda();
        if (search && pokemonList)
            ScreenManager.orderPokemonList(pokemonList);
    }
    static toggleOrderType() {
        OrderType.toggleOrderType();
        if (UIManager.$orderButton)
            UIManager.waitForImageToDownloadThenUpdateCss(UIManager.$orderButton, "images/interface/Button_Neutro_" + OrderType.getTypeName() + ".png");
        var search = UIManager.getSearch();
        var pokemonList = ScreenManager.getPokemonList();
        ScreenManager.updateSortLambda();
        if (search && pokemonList)
            ScreenManager.orderPokemonList(pokemonList);
    }
    static updateUIColor(color) {
        if (this.$lowerArea)
            this.waitForImageToDownloadThenUpdateCss(this.$lowerArea, "images/interface/Interface_Lower_" + color + ".png");
        if (this.$higherArea)
            this.waitForImageToDownloadThenUpdateCss(this.$higherArea, "images/interface/Interfaz_Higher_" + color + ".png");
        Connection.sendConfigAttribute("color", color);
    }
    static updateUIPattern(pattern) {
        if (this.$lowerScreen)
            this.waitForImageToDownloadThenUpdateCss(this.$lowerScreen, "images/interface/Pattern_" + pattern + ".png");
        if (this.$higherScreen)
            this.waitForImageToDownloadThenUpdateCss(this.$higherScreen, "images/interface/Pattern_" + pattern + ".png");
        Connection.sendConfigAttribute("pattern", pattern);
    }
    static updateUIBackground(background) {
        if (this.$imageBackground)
            this.waitForImageToDownloadThenUpdateCss(this.$imageBackground, "images/interface/Background_" + background + ".png");
        Connection.sendConfigAttribute("background", background);
    }
    static waitForImageToDownloadThenUpdateCss(query, url) {
        var img = new Image();
        img.src = url;
        img.onload = () => query.css("background-image", "url('../" + url + "')");
    }
    static setSearch(s) {
        this.search = s;
        Connection.getByMultipleConditions(this.search, docs => ScreenManager.updateGrid(docs));
    }
    static addToSearch(s) {
        if (s instanceof Array) {
            this.search.push(s);
        }
        else {
            if (this.search.length == 0) {
                this.search.push([s]);
            }
            else {
                for (let condition of this.search) {
                    condition.push(s);
                }
            }
        }
        Connection.getByMultipleConditions(this.search, docs => ScreenManager.updateGrid(docs));
    }
    static joinToSearch(s) {
        var newSearch = [];
        for (let elem of s) {
            for (let query of this.search) {
                let newQuery = query.slice(0);
                newQuery.push(elem);
                newSearch.push(newQuery);
            }
        }
        this.search = newSearch;
    }
    static getSearch() {
        return this.search;
    }
    static clearSearch() {
        this.search = [];
    }
    static removeFromSearch(field) {
        let orToBeRemoved = [];
        for (let or of this.search) {
            let andToBeRemoved = [];
            for (let and of or) {
                if (and.field == field) {
                    andToBeRemoved.push(and);
                }
            }
            for (let and of andToBeRemoved) {
                or.splice(or.indexOf(and), 1);
            }
            if (or.length == 0) {
                orToBeRemoved.push(or);
            }
        }
        for (let or of orToBeRemoved) {
            this.search.splice(this.search.indexOf(or), 1);
        }
    }
    static setFilterTypesImages() {
        if (!this.$filterTypes)
            return;
        for (let typeJQuery of this.$filterTypes) {
            var id = typeJQuery.attr('id');
            var fileName = id.split('-')[1];
            UIManager.waitForImageToDownloadThenUpdateCss(typeJQuery, "../images/types/" + fileName + ".png");
        }
    }
    static filterByType(typeJQuery) {
        ScreenManager.showLoading(true);
        var id = typeJQuery.attr('id');
        if (this.$filterTypes)
            this.$filterTypes[0].parent().children().removeClass("selected");
        var type = id.split('-')[1];
        typeJQuery.addClass("selected");
        UIManager.removeFromSearch(PokemonFields.type1);
        UIManager.removeFromSearch(PokemonFields.type2);
        if (this.search.length != 0) {
            UIManager.joinToSearch([{ field: PokemonFields.type1, value: type }, { field: PokemonFields.type2, value: type }]);
        }
        else {
            UIManager.addToSearch([{ field: PokemonFields.type1, value: type }]);
            UIManager.addToSearch([{ field: PokemonFields.type2, value: type }]);
        }
    }
    static filterByGeneration(genJQuery) {
        ScreenManager.showLoading(true);
        var id = genJQuery.attr('id');
        if (this.$filterGenerations)
            this.$filterGenerations[0].parent().children().removeClass("selected");
        var custom = (id.split('-')[1]);
        genJQuery.addClass("selected");
        UIManager.removeFromSearch(PokemonFields.custom);
        UIManager.removeFromSearch(PokemonFields.generation);
        if (custom == "Custom") {
            UIManager.addToSearch({ field: PokemonFields.custom, value: true });
        }
        else {
            var gen = parseInt(custom);
            UIManager.addToSearch({ field: PokemonFields.generation, value: gen });
        }
    }
    static filterByLegendary(legJQuery) {
        ScreenManager.showLoading(true);
        var legen = legJQuery.children().text().split('=')[1] == "true";
        legJQuery.children().text("Legendary=" + (legen ? "false" : "true"));
        legJQuery.addClass("selected");
        UIManager.removeFromSearch(PokemonFields.is_legendary);
        UIManager.addToSearch({ field: PokemonFields.is_legendary, value: legen ? 0 : 1 });
    }
    static filterByPseudolegendary(pseudolegJQuery) {
        ScreenManager.showLoading(true);
        var pseudolegen = pseudolegJQuery.children().text().split('=')[1] == "true";
        pseudolegJQuery.children().text("Pseudolegendary=" + (pseudolegen ? "false" : "true"));
        pseudolegJQuery.addClass("selected");
        UIManager.removeFromSearch(PokemonFields.pseudolegendary);
        UIManager.addToSearch({ field: PokemonFields.pseudolegendary, value: pseudolegen });
    }
}
UIManager.search = [];
//# sourceMappingURL=uimanager.js.map
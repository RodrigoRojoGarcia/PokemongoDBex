class UIManager {
    static doQueries() {
        UIManager.$lowerArea = $("#lowerArea");
        UIManager.$higherArea = $("#upperArea");
        UIManager.$lowerScreen = $("#lowerScreen");
        UIManager.$higherScreen = $("#upperScreen");
        UIManager.$imageBackground = $("#imageBackground");
        UIManager.$configButton = $("#configButton");
        UIManager.$orderButton = $("#orderButton");
        UIManager.$typeOfOrderButtonToggle = $("#typeOfOrderButtonToggle");
        UIManager.$addPokemonButton = $("#addPokemonButton");
        UIManager.$resetFilterButton = $("#resetFilterButton");
        UIManager.$filterName = $("#pokemonNameFilterField");
        UIManager.$filterTypes = [
            $("#filterType-bug"), $("#filterType-dark"), $("#filterType-dragon"),
            $("#filterType-electric"), $("#filterType-fairy"), $("#filterType-fighting"),
            $("#filterType-fire"), $("#filterType-flying"), $("#filterType-ghost"),
            $("#filterType-grass"), $("#filterType-ground"), $("#filterType-ice"),
            $("#filterType-normal"), $("#filterType-poison"), $("#filterType-psychic"),
            $("#filterType-rock"), $("#filterType-steel"), $("#filterType-water")
        ];
        UIManager.$filterGenerations = [
            $("#filterGen-1"),
            $("#filterGen-2"),
            $("#filterGen-3"),
            $("#filterGen-4"),
            $("#filterGen-5"),
            $("#filterGen-6"),
            $("#filterGen-7"),
            $("#filterGen-Custom")
        ];
        UIManager.$filterLegendary = $("#filterLegendary");
        UIManager.$filterPseudolegendary = $("#filterPseudolegendary");
        UIManager.$configScreen = $("#configScreen");
        UIManager.$colorConfigButton = [
            $("#color_red"),
            $("#color_yellow"),
            $("#color_green"),
            $("#color_blue"),
            $("#color_purple"),
            $("#color_blackblue"),
            $("#color_orangewhite")
        ];
        UIManager.$patterConfigButton = [
            $("#pattern_Hill"),
            $("#pattern_LineV"),
            $("#pattern_S"),
            $("#pattern_SCircle"),
            $("#pattern_Square"),
            $("#pattern_X")
        ];
        UIManager.$backgroundConfigButton = [$("#background_Beach"), $("#background_Hills")];
        UIManager.$returnConfigButton = $("#returnConfigButton");
    }
    static assignInput() {
        $("#displayL").click(UIManager.nextState);
        $("#displayR").click(UIManager.previousState);
        $("#typeLeft").click(UIManager.nextCompatibility);
        $("#typeRight").click(UIManager.previousCompatibility);
        if (UIManager.$typeOfOrderButtonToggle)
            UIManager.$typeOfOrderButtonToggle.click(UIManager.nextOrder);
        if (UIManager.$orderButton)
            UIManager.$orderButton.click(UIManager.toggleOrderType);
        if (UIManager.$resetFilterButton)
            UIManager.$resetFilterButton.click(UIManager.removeAllFilters);
        if (UIManager.$filterName) {
            UIManager.$filterName.change(UIManager.filterByName);
        }
        if (UIManager.$filterTypes) {
            for (let filterJQuery of UIManager.$filterTypes) {
                filterJQuery.click(() => UIManager.filterByType(filterJQuery));
            }
        }
        if (UIManager.$filterGenerations) {
            for (let filterJQuery of UIManager.$filterGenerations) {
                filterJQuery.click(() => UIManager.filterByGeneration(filterJQuery));
            }
        }
        if (UIManager.$filterLegendary) {
            let that = UIManager;
            UIManager.$filterLegendary.click(() => {
                if (that.$filterLegendary)
                    UIManager.filterByLegendary();
            });
        }
        if (UIManager.$filterPseudolegendary) {
            let that = UIManager;
            UIManager.$filterPseudolegendary.click(() => {
                if (that.$filterPseudolegendary)
                    UIManager.filterByPseudolegendary();
            });
        }
        if (UIManager.$configButton)
            UIManager.$configButton.click(() => UIManager.showConfigScreen(true));
        if (UIManager.$colorConfigButton) {
            let that = UIManager;
            for (let colorConfig of UIManager.$colorConfigButton) {
                colorConfig.click(() => {
                    var color = colorConfig.attr('id').split('_')[1];
                    that.updateUIColor(color);
                });
            }
        }
        if (UIManager.$patterConfigButton) {
            let that = UIManager;
            for (let patternConfig of UIManager.$patterConfigButton) {
                patternConfig.click(() => {
                    var pattern = patternConfig.attr('id').split('_')[1];
                    that.updateUIPattern(pattern);
                });
            }
        }
        if (UIManager.$backgroundConfigButton) {
            let that = UIManager;
            for (let backgroundConfig of UIManager.$backgroundConfigButton) {
                backgroundConfig.click(() => {
                    var background = backgroundConfig.attr('id').split('_')[1];
                    that.updateUIBackground(background);
                });
            }
        }
        if (UIManager.$returnConfigButton) {
            UIManager.$returnConfigButton.click(() => UIManager.showConfigScreen(false));
        }
    }
    static applyServerSettings() {
        var that = UIManager;
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
        if (UIManager.$lowerArea)
            UIManager.waitForImageToDownloadThenUpdateCss(UIManager.$lowerArea, "images/interface/Interface_Lower_" + color + ".png");
        if (UIManager.$higherArea)
            UIManager.waitForImageToDownloadThenUpdateCss(UIManager.$higherArea, "images/interface/Interfaz_Higher_" + color + ".png");
        Connection.sendConfigAttribute("color", color);
    }
    static updateUIPattern(pattern) {
        if (UIManager.$lowerScreen)
            UIManager.waitForImageToDownloadThenUpdateCss(UIManager.$lowerScreen, "images/interface/Pattern_" + pattern + ".png");
        if (UIManager.$higherScreen)
            UIManager.waitForImageToDownloadThenUpdateCss(UIManager.$higherScreen, "images/interface/Pattern_" + pattern + ".png");
        Connection.sendConfigAttribute("pattern", pattern);
    }
    static updateUIBackground(background) {
        if (UIManager.$imageBackground)
            UIManager.waitForImageToDownloadThenUpdateCss(UIManager.$imageBackground, "images/interface/Background_" + background + ".png");
        Connection.sendConfigAttribute("background", background);
    }
    static waitForImageToDownloadThenUpdateCss(query, url) {
        var img = new Image();
        img.src = url;
        img.onload = () => query.css("background-image", "url('../" + url + "')");
    }
    static setSearch(s) {
        UIManager.search = s;
    }
    static addToSearch(s) {
        if (s instanceof Array) {
            UIManager.search.push(s);
        }
        else {
            if (UIManager.search.length == 0) {
                UIManager.search.push([s]);
            }
            else {
                for (let condition of UIManager.search) {
                    condition.push(s);
                }
            }
        }
    }
    static joinToSearch(s) {
        var newSearch = [];
        for (let elem of s) {
            for (let query of UIManager.search) {
                let newQuery = query.slice(0);
                newQuery.push(elem);
                newSearch.push(newQuery);
            }
        }
        UIManager.search = newSearch;
    }
    static getSearch() {
        return UIManager.search;
    }
    static clearSearch() {
        UIManager.search = [];
    }
    static removeFromSearch(field) {
        let orToBeRemoved = [];
        for (let or of UIManager.search) {
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
            UIManager.search.splice(UIManager.search.indexOf(or), 1);
        }
    }
    static removeDuplicatesFromSearch() {
        if (!UIManager.search)
            return;
        var that = UIManager;
        var newSearch = [];
        var selected;
        while (UIManager.search.length > 0) {
            selected = UIManager.search.shift();
            newSearch.push(selected);
            let duplicates = [];
            for (let remainingQuery of UIManager.search) {
                let match = [];
                selected.forEach(() => match.push(false));
                for (let singleQuerySelected of selected) {
                    for (let singleQueryRemaining of remainingQuery) {
                        if (singleQuerySelected.field == singleQueryRemaining.field && singleQuerySelected.value && singleQueryRemaining.value) {
                            match[selected.indexOf(singleQuerySelected)] = true;
                        }
                    }
                }
                if (match.every(e => e)) {
                    duplicates.push(remainingQuery);
                }
            }
            duplicates.forEach(d => that.search.splice(that.search.indexOf(d), 1));
        }
        UIManager.search = newSearch;
    }
    static setFilterTypesImages() {
        if (!UIManager.$filterTypes)
            return;
        for (let typeJQuery of UIManager.$filterTypes) {
            var id = typeJQuery.attr('id');
            var fileName = id.split('-')[1];
            UIManager.waitForImageToDownloadThenUpdateCss(typeJQuery, "../images/types/" + fileName + ".png");
        }
    }
    static removeAllFilters() {
        ScreenManager.showLoading(true);
        UIManager.clearSearch();
        if (UIManager.$filterName)
            UIManager.$filterName.val("");
        $("#filtersScreen *").removeClass("selected");
        Connection.getByMultipleConditions(UIManager.search, docs => ScreenManager.updateGrid(docs));
    }
    static filterByName() {
        if (!UIManager.$filterName)
            return;
        ScreenManager.showLoading(true);
        UIManager.removeFromSearch(PokemonFields.name);
        var value = UIManager.$filterName.val();
        if (value != "") {
            UIManager.addToSearch({ field: PokemonFields.name, value: { $regex: value, $options: "i" } });
        }
        Connection.getByMultipleConditions(UIManager.search, docs => ScreenManager.updateGrid(docs));
    }
    static filterByType(typeJQuery) {
        ScreenManager.showLoading(true);
        var id = typeJQuery.attr('id');
        if (UIManager.$filterTypes)
            UIManager.$filterTypes[0].parent().children().removeClass("selected");
        var type = id.split('-')[1];
        UIManager.removeFromSearch(PokemonFields.type1);
        UIManager.removeFromSearch(PokemonFields.type2);
        UIManager.removeDuplicatesFromSearch();
        if (UIManager.currentTypeFilter != type) {
            typeJQuery.addClass("selected");
            if (UIManager.search.length != 0) {
                UIManager.joinToSearch([{ field: PokemonFields.type1, value: type }, { field: PokemonFields.type2, value: type }]);
            }
            else {
                UIManager.addToSearch([{ field: PokemonFields.type1, value: type }]);
                UIManager.addToSearch([{ field: PokemonFields.type2, value: type }]);
            }
            UIManager.currentTypeFilter = type;
        }
        else {
            UIManager.currentTypeFilter = "";
        }
        Connection.getByMultipleConditions(UIManager.search, docs => ScreenManager.updateGrid(docs));
    }
    static filterByGeneration(genJQuery) {
        ScreenManager.showLoading(true);
        var id = genJQuery.attr('id');
        if (UIManager.$filterGenerations)
            UIManager.$filterGenerations[0].parent().children().removeClass("selected");
        var custom = (id.split('-')[1]);
        UIManager.removeFromSearch(PokemonFields.custom);
        UIManager.removeFromSearch(PokemonFields.generation);
        UIManager.removeDuplicatesFromSearch();
        if (custom == "Custom") {
            if (UIManager.currentGenerationFilter != 8) {
                UIManager.addToSearch({ field: PokemonFields.custom, value: true });
                genJQuery.addClass("selected");
                UIManager.currentGenerationFilter = 8;
            }
            else {
                UIManager.currentGenerationFilter = 0;
            }
        }
        else {
            var gen = parseInt(custom);
            if (UIManager.currentGenerationFilter != gen) {
                UIManager.addToSearch({ field: PokemonFields.generation, value: gen });
                genJQuery.addClass("selected");
                UIManager.currentGenerationFilter = gen;
            }
            else {
                UIManager.currentGenerationFilter = 0;
            }
        }
        Connection.getByMultipleConditions(UIManager.search, docs => ScreenManager.updateGrid(docs));
    }
    static filterByLegendary() {
        ScreenManager.showLoading(true);
        UIManager.legendaryFilter = !UIManager.legendaryFilter;
        if (UIManager.legendaryFilter) {
            UIManager.pseudolegendaryFilter = false;
            if (UIManager.$filterLegendary)
                UIManager.$filterLegendary.addClass("selected");
            if (UIManager.$filterPseudolegendary)
                UIManager.$filterPseudolegendary.removeClass("selected");
            UIManager.removeFromSearch(PokemonFields.pseudolegendary);
            UIManager.addToSearch({ field: PokemonFields.is_legendary, value: 1 });
        }
        else {
            if (UIManager.$filterLegendary)
                UIManager.$filterLegendary.removeClass("selected");
            UIManager.removeFromSearch(PokemonFields.is_legendary);
        }
        UIManager.removeDuplicatesFromSearch();
        Connection.getByMultipleConditions(UIManager.search, docs => ScreenManager.updateGrid(docs));
    }
    static filterByPseudolegendary() {
        ScreenManager.showLoading(true);
        UIManager.pseudolegendaryFilter = !UIManager.pseudolegendaryFilter;
        if (UIManager.pseudolegendaryFilter) {
            UIManager.legendaryFilter = false;
            if (UIManager.$filterLegendary)
                UIManager.$filterLegendary.removeClass("selected");
            if (UIManager.$filterPseudolegendary)
                UIManager.$filterPseudolegendary.addClass("selected");
            UIManager.removeFromSearch(PokemonFields.is_legendary);
            UIManager.addToSearch({ field: PokemonFields.pseudolegendary, value: true });
        }
        else {
            if (UIManager.$filterPseudolegendary)
                UIManager.$filterPseudolegendary.removeClass("selected");
            UIManager.removeFromSearch(PokemonFields.pseudolegendary);
        }
        UIManager.removeDuplicatesFromSearch();
        Connection.getByMultipleConditions(UIManager.search, docs => ScreenManager.updateGrid(docs));
    }
    static showConfigScreen(show) {
        if (UIManager.$configScreen) {
            if (show) {
                UIManager.$configScreen.show();
            }
            UIManager.$configScreen.removeClass(show ? "loadingHidden" : "loadingShown");
            UIManager.$configScreen.addClass(show ? "loadingShown" : "loadingHidden");
            if (!show) {
                setTimeout(function () {
                    if (UIManager.$configScreen) {
                        UIManager.$configScreen.hide();
                    }
                }, 200);
            }
        }
    }
}
UIManager.search = [];
UIManager.currentTypeFilter = "";
UIManager.currentGenerationFilter = 0;
UIManager.legendaryFilter = false;
UIManager.pseudolegendaryFilter = false;
//# sourceMappingURL=uimanager.js.map
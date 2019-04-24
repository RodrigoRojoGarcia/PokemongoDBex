

class UIManager {

    private static $lowerArea? :jQuery;

    private static $higherArea? :jQuery;

    private static $lowerScreen? :jQuery;

    private static $higherScreen? :jQuery;

    private static $imageBackground? :jQuery;

    private static $configButton? :jQuery;

    private static $orderButton? :jQuery;

    private static $typeOfOrderButtonToggle? :jQuery;

    private static $addPokemonButton? :jQuery;

    private static search :MongoQuery[][] = [];

    private static $resetFilterButton? :jQuery;

    private static $filterName? :jQuery;

    private static $filterTypes? :jQuery[];

    private static $filterGenerations? :jQuery[];

    private static $filterLegendary? :jQuery;

    private static $filterPseudolegendary? :jQuery;

    private static $configScreen? :jQuery;

    private static $colorConfigButton? :jQuery[];

    private static $patterConfigButton? :jQuery[];

    private static $backgroundConfigButton? :jQuery[];

    private static $returnConfigButton :jQuery;

    private static currentTypeFilter = "";

    private static currentGenerationFilter = 0;

    private static legendaryFilter = false;

    private static pseudolegendaryFilter = false;

    public static doQueries(){

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
            $("#filterType-bug"),$("#filterType-dark"),$("#filterType-dragon"),
            $("#filterType-electric"),$("#filterType-fairy"),$("#filterType-fighting"),
            $("#filterType-fire"),$("#filterType-flying"),$("#filterType-ghost"),
            $("#filterType-grass"),$("#filterType-ground"),$("#filterType-ice"),
            $("#filterType-normal"),$("#filterType-poison"),$("#filterType-psychic"),
            $("#filterType-rock"),$("#filterType-steel"),$("#filterType-water")
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

        UIManager.$backgroundConfigButton = [$("#background_Beach"),$("#background_Hills")];

        UIManager.$returnConfigButton = $("#returnConfigButton");
    }

    public static assignInput(){
        $("#displayL").click(UIManager.nextState);
        $("#displayR").click(UIManager.previousState);

        $("#typeLeft").click(UIManager.nextCompatibility);
        $("#typeRight").click(UIManager.previousCompatibility);

        if(UIManager.$typeOfOrderButtonToggle)
            UIManager.$typeOfOrderButtonToggle.click(UIManager.nextOrder);

        if(UIManager.$orderButton)
            UIManager.$orderButton.click(UIManager.toggleOrderType);

        if(UIManager.$resetFilterButton)
            UIManager.$resetFilterButton.click(UIManager.removeAllFilters);

        if(UIManager.$filterName) {
            UIManager.$filterName.change(UIManager.filterByName);
        }
        
        if(UIManager.$filterTypes){
            for(let filterJQuery of UIManager.$filterTypes){
                filterJQuery.click(() => UIManager.filterByType(filterJQuery));
            }
        }

        if(UIManager.$filterGenerations){
            for(let filterJQuery of UIManager.$filterGenerations){
                filterJQuery.click(()=>UIManager.filterByGeneration(filterJQuery));
            }
        }

        if(UIManager.$filterLegendary) {
            let that = UIManager;
            UIManager.$filterLegendary.click(() => {
                if(that.$filterLegendary)
                    UIManager.filterByLegendary()
            });
        }
        
        if(UIManager.$filterPseudolegendary) {
            let that = UIManager;
            UIManager.$filterPseudolegendary.click(() => {
                if(that.$filterPseudolegendary)
                    UIManager.filterByPseudolegendary()
            });
        }

        if(UIManager.$configButton)
            UIManager.$configButton.click(() => UIManager.showConfigScreen(true));

        
        if(UIManager.$colorConfigButton){
            let that = UIManager;
            for(let colorConfig of UIManager.$colorConfigButton){
                colorConfig.click(() => {
                    var color = colorConfig.attr('id').split('_')[1];
                    that.updateUIColor(color);
                });
            }
        }
        if(UIManager.$patterConfigButton){
            let that = UIManager;
            for(let patternConfig of UIManager.$patterConfigButton){
                patternConfig.click(() => {
                    var pattern = patternConfig.attr('id').split('_')[1];
                    that.updateUIPattern(pattern);
                });
            }
        }
        if(UIManager.$backgroundConfigButton){
            let that = UIManager;
            for(let backgroundConfig of UIManager.$backgroundConfigButton){
                backgroundConfig.click(() => {
                    var background = backgroundConfig.attr('id').split('_')[1];
                    that.updateUIBackground(background);
                });
            }
        }
        if(UIManager.$returnConfigButton) {
            UIManager.$returnConfigButton.click(() => UIManager.showConfigScreen(false));
        }
    }

    public static applyServerSettings() {
        var that = UIManager;
        Connection.getAllConfigAttributes(function(reponse) {
            that.updateUIColor(reponse.color);
            that.updateUIPattern(reponse.pattern);
            that.updateUIBackground(reponse.background);
        });
    }

    private static nextState(){
        State.nextState();
        ScreenManager.updateScreensWithState();
    }
    
    private static previousState(){
        State.previousState();
        ScreenManager.updateScreensWithState();
    }

    private static nextCompatibility(){
        Compatibility.nextCompatibility();
        ScreenManager.updateTypeCompatibilityScreen();
    }

    private static previousCompatibility(){
        Compatibility.previousCompatibility();
        ScreenManager.updateTypeCompatibilityScreen();
    }

    private static nextOrder(){
        OrderType.nextOrder();
        if(UIManager.$typeOfOrderButtonToggle)
            UIManager.waitForImageToDownloadThenUpdateCss(UIManager.$typeOfOrderButtonToggle, "images/interface/Button_Neutro_"+OrderType.getName()+".png");
        var search = UIManager.getSearch();
        var pokemonList = ScreenManager.getPokemonList();
        ScreenManager.updateSortLambda();
        if(search && pokemonList)
            ScreenManager.orderPokemonList(pokemonList);
    }
    private static toggleOrderType(){
        OrderType.toggleOrderType();
        if(UIManager.$orderButton)
            UIManager.waitForImageToDownloadThenUpdateCss(UIManager.$orderButton,"images/interface/Button_Neutro_"+OrderType.getTypeName()+".png");
        var search = UIManager.getSearch();
        var pokemonList = ScreenManager.getPokemonList();
        ScreenManager.updateSortLambda();
        if(search && pokemonList)
            ScreenManager.orderPokemonList(pokemonList);
    }
    
    public static updateUIColor(color: string){

        if(UIManager.$lowerArea)
            UIManager.waitForImageToDownloadThenUpdateCss(UIManager.$lowerArea, "images/interface/Interface_Lower_" + color + ".png");

        if(UIManager.$higherArea)
            UIManager.waitForImageToDownloadThenUpdateCss(UIManager.$higherArea, "images/interface/Interfaz_Higher_" + color + ".png");
        
        Connection.sendConfigAttribute("color", color);
    }

    public static updateUIPattern(pattern: string){

        if(UIManager.$lowerScreen)
            UIManager.waitForImageToDownloadThenUpdateCss(UIManager.$lowerScreen, "images/interface/Pattern_" + pattern + ".png");

        if(UIManager.$higherScreen)
            UIManager.waitForImageToDownloadThenUpdateCss(UIManager.$higherScreen, "images/interface/Pattern_" + pattern + ".png");
    
        Connection.sendConfigAttribute("pattern", pattern);
    }

    public static updateUIBackground(background: string){
        
        if(UIManager.$imageBackground)
            UIManager.waitForImageToDownloadThenUpdateCss(UIManager.$imageBackground, "images/interface/Background_" + background + ".png")

        
        Connection.sendConfigAttribute("background", background);
    }

    private static waitForImageToDownloadThenUpdateCss(query :jQuery, url :string) {
        var img = new Image();
        img.src = url;
        img.onload = () => query.css("background-image", "url('../" + url + "')");
    }

    public static setSearch(s :MongoQuery[][]){
        UIManager.search = s;
    }

    public static addToSearch(s :MongoQuery | MongoQuery[]) {
        if(s instanceof Array) {
            UIManager.search.push(s);
        } else {
            if(UIManager.search.length == 0) {
                UIManager.search.push([s]);
            } else {
                for(let condition of UIManager.search) {
                    condition.push(s);
                }
            } 
        }    
    }

    public static joinToSearch(s :MongoQuery[]) {
        var newSearch = [];
        for(let elem of s) {
            for(let query of UIManager.search) {
                let newQuery = query.slice(0);
                newQuery.push(elem);
                newSearch.push(newQuery);
            }
        }
        UIManager.search = newSearch;
    }
    
    public static getSearch(){
        return UIManager.search;
    }

    public static clearSearch() {
        UIManager.search = [];
    }

    public static removeFromSearch(field :PokemonFields) {
        let orToBeRemoved = [];
        for(let or of UIManager.search) {
            let andToBeRemoved = [];
            for(let and of or) {
                if(and.field == field) {
                    andToBeRemoved.push(and);
                }
            }
            for(let and of andToBeRemoved) {
                or.splice(or.indexOf(and), 1);
            }
            if(or.length == 0) {
                orToBeRemoved.push(or);
            }
        }
        for(let or of orToBeRemoved) {
            UIManager.search.splice(UIManager.search.indexOf(or), 1);
        }
    }

    public static removeDuplicatesFromSearch() {
        if(!UIManager.search)
            return;
        var that = UIManager;
        var newSearch :MongoQuery[][] = [];
        var selected :MongoQuery[];

        while(UIManager.search.length > 0) {
            selected = (UIManager.search.shift() as MongoQuery[]);
            newSearch.push(selected);
            let duplicates :MongoQuery[][] = [];
            for(let remainingQuery of UIManager.search) {
                let match :boolean[] = [];
                selected.forEach(() => match.push(false));
                
                for(let singleQuerySelected of selected) {
                    for(let singleQueryRemaining of remainingQuery) {
                        if(singleQuerySelected.field == singleQueryRemaining.field && singleQuerySelected.value && singleQueryRemaining.value) {
                            match[selected.indexOf(singleQuerySelected)] = true;
                        }
                    }
                }

                if(match.every(e => e)) {
                    duplicates.push(remainingQuery);
                }
            }

            duplicates.forEach(d => that.search.splice(that.search.indexOf(d), 1));
        }

        UIManager.search = newSearch;
    }

    public static setFilterTypesImages(){
        if(!UIManager.$filterTypes)
            return;
        for(let typeJQuery of UIManager.$filterTypes){
            var id = typeJQuery.attr('id');
            var fileName = id.split('-')[1];
            UIManager.waitForImageToDownloadThenUpdateCss(typeJQuery,"../images/types/"+fileName+".png");
        }
    }

    public static removeAllFilters() {
        ScreenManager.showLoading(true);
        UIManager.clearSearch();
        if(UIManager.$filterName)
            UIManager.$filterName.val("");
        $("#filtersScreen *").removeClass("selected");
        Connection.getByMultipleConditions(UIManager.search, docs => ScreenManager.updateGrid(docs));
    }

    public static filterByName() {
        if(!UIManager.$filterName)
            return;

        ScreenManager.showLoading(true);
        UIManager.removeFromSearch(PokemonFields.name);
        var value = UIManager.$filterName.val() as string;
        if(value != "") {
            UIManager.addToSearch({field: PokemonFields.name, value: {$regex: value, $options: "i"}});
        }
        Connection.getByMultipleConditions(UIManager.search, docs => ScreenManager.updateGrid(docs));
    }

    public static filterByType(typeJQuery :jQuery) {
        ScreenManager.showLoading(true);
        var id = typeJQuery.attr('id');
        if(UIManager.$filterTypes)
            UIManager.$filterTypes[0].parent().children().removeClass("selected");
        var type = id.split('-')[1];
        UIManager.removeFromSearch(PokemonFields.type1);
        UIManager.removeFromSearch(PokemonFields.type2);
        UIManager.removeDuplicatesFromSearch();
        if(UIManager.currentTypeFilter != type) {
            typeJQuery.addClass("selected");
            if(UIManager.search.length != 0) {
                UIManager.joinToSearch([{field: PokemonFields.type1, value: type}, {field: PokemonFields.type2, value: type}]);
            } else {
                UIManager.addToSearch ( [{field: PokemonFields.type1, value: type}] );
                UIManager.addToSearch ( [{field: PokemonFields.type2, value: type}] );
            }
            UIManager.currentTypeFilter = type;
        } else {
            UIManager.currentTypeFilter = "";
        }
        Connection.getByMultipleConditions(UIManager.search, docs => ScreenManager.updateGrid(docs));
    }

    public static filterByGeneration(genJQuery :jQuery){
        ScreenManager.showLoading(true);
        var id = genJQuery.attr('id');
        if(UIManager.$filterGenerations)
            UIManager.$filterGenerations[0].parent().children().removeClass("selected");
        var custom = (id.split('-')[1]);
        
        UIManager.removeFromSearch(PokemonFields.custom);
        UIManager.removeFromSearch(PokemonFields.generation);
        UIManager.removeDuplicatesFromSearch();
        if(custom == "Custom"){
            if(UIManager.currentGenerationFilter != 8) {
                UIManager.addToSearch({field: PokemonFields.custom, value: true});
                genJQuery.addClass("selected");
                UIManager.currentGenerationFilter = 8;
            } else {
                UIManager.currentGenerationFilter = 0;
            }
        }else{
            var gen = parseInt(custom);
            if(UIManager.currentGenerationFilter != gen) {
                UIManager.addToSearch({field: PokemonFields.generation, value: gen});
                genJQuery.addClass("selected");
                UIManager.currentGenerationFilter = gen;
            } else {
                UIManager.currentGenerationFilter = 0;
            }         
        }
        Connection.getByMultipleConditions(UIManager.search, docs => ScreenManager.updateGrid(docs));
    }

    public static filterByLegendary() {
        ScreenManager.showLoading(true);

        UIManager.legendaryFilter = !UIManager.legendaryFilter;
        if(UIManager.legendaryFilter) {
            UIManager.pseudolegendaryFilter = false;
            if(UIManager.$filterLegendary)
                UIManager.$filterLegendary.addClass("selected");
            if(UIManager.$filterPseudolegendary)
                UIManager.$filterPseudolegendary.removeClass("selected");
            UIManager.removeFromSearch(PokemonFields.pseudolegendary);
            UIManager.addToSearch({field: PokemonFields.is_legendary, value: 1});
        } else {
            if(UIManager.$filterLegendary)
                UIManager.$filterLegendary.removeClass("selected");
            UIManager.removeFromSearch(PokemonFields.is_legendary);
        }

        UIManager.removeDuplicatesFromSearch();
        Connection.getByMultipleConditions(UIManager.search, docs => ScreenManager.updateGrid(docs));
    }

    public static filterByPseudolegendary(){
        
        ScreenManager.showLoading(true);

        UIManager.pseudolegendaryFilter = !UIManager.pseudolegendaryFilter;
        if(UIManager.pseudolegendaryFilter) {
            UIManager.legendaryFilter = false;
            if(UIManager.$filterLegendary)
                UIManager.$filterLegendary.removeClass("selected");
            if(UIManager.$filterPseudolegendary)
                UIManager.$filterPseudolegendary.addClass("selected");
            UIManager.removeFromSearch(PokemonFields.is_legendary);
            UIManager.addToSearch({field: PokemonFields.pseudolegendary, value: true});
        } else {
            if(UIManager.$filterPseudolegendary)
                UIManager.$filterPseudolegendary.removeClass("selected");
            UIManager.removeFromSearch(PokemonFields.pseudolegendary);
        }

        UIManager.removeDuplicatesFromSearch();
        Connection.getByMultipleConditions(UIManager.search, docs => ScreenManager.updateGrid(docs));
    }

    public static showConfigScreen(show :boolean) {
        if(UIManager.$configScreen) {
            if(show) {
                UIManager.$configScreen.show();
            }
            UIManager.$configScreen.removeClass(show ? "loadingHidden" : "loadingShown");
            UIManager.$configScreen.addClass(show ? "loadingShown" : "loadingHidden");
            if(!show) {
                setTimeout(function() {
                    if(UIManager.$configScreen) {
                        UIManager.$configScreen.hide();
                    }
                }, 200);
            }
            
        }      
    }
}
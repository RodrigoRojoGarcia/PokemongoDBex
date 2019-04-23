

class ScreenManager {
    
    private static screenQueries? :jQuery[];
    
    private static $displayScreen? :jQuery;

    private static $grid? :jQuery;

    private static $image? :jQuery;

    private static $pokemonName? :jQuery;

    private static $type1? :jQuery;

    private static $type2? :jQuery;

    private static $abilities? :jQuery;

    private static $loading? :jQuery;

    private static $noconnection? :jQuery;
    
    private static baseStatsQueries? :jQuery[];

    private static $baseSteps? :jQuery;

    private static $classification? :jQuery;

    private static $male? :jQuery;

    private static $maleText? :jQuery;

    private static $female? :jQuery;

    private static $femaleText? :jQuery;

    private static $nb? :jQuery;

    private static $genderHandle? :jQuery;    
    
    private static $height? :jQuery;

    private static $weight? :jQuery;

    private static $xpGrowth? :jQuery;

    private static $happiness? :jQuery;

    private static $captureRate? :jQuery;

    private static $compatibility? :jQuery;

    private static $types? :jQuery;

    private static $forms? :jQuery;
    
    private static pokemon? :Pokemon;

    private static online = true;

    private static pingControlInterval :number;

    private static sort = (p1 :MongoQueryReponse, p2 :MongoQueryReponse) => p1.pokedex_number - p2.pokedex_number;

    private static pokemonList? :MongoQueryReponse[];

    public static updateScreensWithState() {
        if(!this.screenQueries || !this.$displayScreen)
            return;

        for(let i = 0; i < this.screenQueries.length; i++) {
            let prevState = State.get() == 0 ? (this.screenQueries.length - 1) : (State.get() - 1);
            if(i == State.get()) {
                this.screenQueries[i].css("transform", "translateX(0) scaleX(1)");
            } else if(i == prevState) {
                this.screenQueries[i].css("transform", "translateX(-150px) scaleX(0)");
            } else {
                this.screenQueries[i].css("transform", "translateX(180px) scaleX(0)");
            }
        }

        this.$displayScreen.text(State.getName(State.get()));        
    }

    public static updateGrid(pokemonList :MongoQueryReponse[]){
        this.pokemonList = pokemonList;
        ScreenManager.orderPokemonList(this.pokemonList);
    }

    public static orderPokemonList(pokemonList :MongoQueryReponse[]){
        var divMap = new Map<MongoQueryReponse, string>();
        var that = this;
        if(pokemonList.length == 0) {
            if(divMap.size == pokemonList.length && that.$grid)
                ScreenManager.updateGridAux(that.$grid, divMap);
            return;
        }
        for(let pokemon of pokemonList) {
            let onclick = "onclick=\"ScreenManager.setPokemon(" + pokemon.pokedex_number + ")\"";
            Connection.ajaxGet("images/icons/" + pokemon.pokedex_number + ".png")
            .done(() =>
                divMap.set(pokemon,
                    "<div id=\"pkicon" + pokemon.pokedex_number + "\" " + onclick + ">" +
                    "<p>" + ScreenManager.padWithZeroes(pokemon.pokedex_number, 3) + "</p>" +
                    "<img src=\"images/icons/" + pokemon.pokedex_number + ".png\" class=\"gridImage\"/>" +
                    "</div>") 
            ).fail(() =>
                divMap.set(pokemon,
                    "<div id=\"pkicon" + pokemon.pokedex_number + "\" " + onclick + ">" +
                    "<p>" + ScreenManager.padWithZeroes(pokemon.pokedex_number, 3) + "</p>" +
                    "<img src=\"images/icons/susti.png\" class=\"gridImage\"/></div>")
            ).then(() => {
                if(divMap.size == pokemonList.length && that.$grid)
                    ScreenManager.updateGridAux(that.$grid, divMap);
            });
        }
    }

    private static updateGridAux($grid :jQuery, divMap :Map<MongoQueryReponse, string>) {
        let keySet = [];
        for(let key of divMap.keys()) {
            keySet.push(key);
        }
        keySet.sort(ScreenManager.sort);
        $grid.empty();
        for(let key of keySet) {
            $grid.append(divMap.get(key) as string);
        }
        ScreenManager.showLoading(false);
    }

    public static doQueries() {
        ScreenManager.screenQueries = [$("#stats"), $("#breeding"), $("#catching"), $("#typeCompatibility"), $("#forms")];
        ScreenManager.$displayScreen = $("#displayScreen");
        ScreenManager.$grid = $("#grid");
        ScreenManager.$image = $("#image");
        ScreenManager.$loading = $("#loading");
        ScreenManager.$noconnection = $("#noconnection");
        ScreenManager.$pokemonName = $("#pokemonNameHeader");
        ScreenManager.$type1 = $("#type1");
        ScreenManager.$type2 = $("#type2");
        ScreenManager.$abilities = $("#abilities");
        ScreenManager.baseStatsQueries = [$("#HPvalue"), $("#Atkvalue"), $("#Defvalue"), $("#SpAtkvalue"), $("#SpDefvalue"), $("#Speedvalue")];
        ScreenManager.$baseSteps = $("#base-stepsText");
        ScreenManager.$male = $("#male");
        ScreenManager.$maleText = $("#maleText");
        ScreenManager.$female = $("#female");
        ScreenManager.$femaleText = $("#femaleText");
        ScreenManager.$nb = $("#non-binary");
        ScreenManager.$genderHandle = $("#genderHandle")
        ScreenManager.$height = $("#heightText");
        ScreenManager.$weight = $("#weightText");
        ScreenManager.$xpGrowth = $("#xpGrowthText");
        ScreenManager.$happiness = $("#happinessText");
        ScreenManager.$captureRate = $("#captureRateText");
        ScreenManager.$classification = $("#classificationText");
        ScreenManager.$compatibility = $("#compatibility");
        ScreenManager.$types = $("#types");
        ScreenManager.$forms = $("#forms");
    }

    public static initPingControl() {
        var that = this;
        this.pingControlInterval = setInterval(function() {
            Connection.ping("spring", function(success) {
                if(that.$noconnection) {
                    if(success) {
                        that.showNoConnection(false);
                    } else {
                        that.showNoConnection(true);
                        that.showLoading(false);
                    }
                    that.online = success;
                }
            });
        }, 1000);
        if(ScreenManager.$noconnection)
        ScreenManager.$noconnection.hide();
    }

    public static setPokemon(id :number, listener? :(pokemon :Pokemon) => void) {
        var that = this;
        Connection.getPokemon(id, pokemon => {
            that.pokemon = pokemon;
            ScreenManager.showPokemonInfo();
            that.markPokemonAsSelected();
            var selected = "susti.png";
            if(pokemon.images.length > 0) {
                let baseImage = pokemon.pokedex_number + ".png";
                let indexOfBaseImage = pokemon.images.indexOf(baseImage);
                if(indexOfBaseImage != -1)
                    selected = pokemon.images[indexOfBaseImage];
                else
                    selected = pokemon.images[0];
            }
            ScreenManager.setPokemonImage(selected);

            if(listener)
                listener(pokemon);
        });
    }

    public static getPokemon() {
        return this.pokemon;
    }

    public static showPokemonInfo(){

        if(this.pokemon){
            if(this.$pokemonName)
                this.$pokemonName.text("#"+ScreenManager.padWithZeroes(this.pokemon.pokedex_number, 3)+" "+this.pokemon.name);
            
            if(this.$type1 && this.pokemon.type1 != "")
                this.$type1.css("background-image","url('../images/types/"+this.pokemon.type1+".png')");
            if(this.$type2)
                if(this.pokemon.type2 == "") {
                    this.$type2.css("background-image","url('../images/types/none.png'");
                } else {
                    this.$type2.css("background-image","url('../images/types/"+this.pokemon.type2+".png')");
                }
        }
        
        ScreenManager.prepareStatsScreen();
        ScreenManager.prepareBreedScreen();
        ScreenManager.prepareCatchScreen();
        ScreenManager.sortTypeCompatibilities();
        ScreenManager.updateTypeCompatibilityScreen();
        ScreenManager.prepareFormsScreen();
    }

    private static padWithZeroes(num :number, minFigures :number) {
        var cur = num;
        var ret = num.toString();
        var figures = 0;

        while(figures < minFigures) {
            if(cur == 0) {
                ret = "0" + ret.toString(); 
            }
            figures++;
            cur = Math.floor(cur * 0.1);
        }

        return ret;
    }

    private static onlyTwoDecimals(num :number){
        return parseFloat((Math.round(num * 100) / 100).toFixed(2));
    }

    public static showLoading(show :boolean) {
        if(ScreenManager.$loading && ScreenManager.online) {
            ScreenManager.$loading.removeClass(show ? "loadingHidden" : "loadingShown");
            ScreenManager.$loading.addClass(show ? "loadingShown" : "loadingHidden");
            setTimeout(function() {
                if(ScreenManager.$loading) {
                    show ? ScreenManager.$loading.show() : ScreenManager.$loading.hide();
                }
            }, 200);
        }
    }

    private static showNoConnection(show :boolean) {
        if(ScreenManager.$noconnection) {
            ScreenManager.$noconnection.removeClass(show ? "loadingHidden" : "loadingShown");
            ScreenManager.$noconnection.addClass(show ? "loadingShown" : "loadingHidden");
            setTimeout(function() {
                if(ScreenManager.$noconnection) {
                    show ? ScreenManager.$noconnection.show() : ScreenManager.$noconnection.hide();
                }
            }, 200);
        }
    }
    
    private static prepareStatsScreen() {
        if(!this.pokemon)
            return;

        
        if(this.$abilities) {
            this.$abilities.empty();
            for(let i = 0; i < this.pokemon.abilities.length; i++) {
                this.$abilities.append("<div id=\"abilities"+i+"\">"+this.pokemon.abilities[i]+"</div>");
            }
        }
        var baseStats = [
            this.pokemon.hp, this.pokemon.attack, this.pokemon.defense, 
            this.pokemon.sp_attack, this.pokemon.sp_defense, this.pokemon.speed
        ]; 
        
        for(let i = 0; i < baseStats.length; i++) {
            if(this.baseStatsQueries)
                this.baseStatsQueries[i].text(""+baseStats[i]);
        }
    }

    private static prepareBreedScreen() {
        if(!this.pokemon)
            return;

        if(this.$baseSteps)
            this.$baseSteps.text("Base Steps: "+this.pokemon.base_egg_steps);

        if(this.$classification)
            this.$classification.text(this.pokemon.classfication.split("Pokémon")[0]);
        if(this.$male && this.$maleText && this.$female && this.$femaleText && this.$nb){
            if(this.pokemon.percentage_male != -1) {
                this.$nb.hide();
                this.$female.show();
                this.$male.show();
                this.$male.css("border-radius", "50px 0 0 50px");
                this.$female.css("border-radius"," 0 50px 50px 0px")
                
                var malePercentage :string= this.pokemon.percentage_male+"%";
                this.$male.width(malePercentage);
                var femalePercentage :number= ScreenManager.onlyTwoDecimals(100 - this.pokemon.percentage_male);
                var femalePercentageString :string = femalePercentage+"%";
                this.$female.width(femalePercentageString);
                this.$maleText.text(malePercentage);
                this.$femaleText.text(femalePercentageString);

                var n = Math.floor(350*this.pokemon.percentage_male/100 + 10);
                if(this.$genderHandle) {
                    this.$genderHandle.show();
                    this.$genderHandle.css("left", n);
                }

                if(this.pokemon.percentage_male > 80){
                    this.$femaleText.hide();
                    this.$male.css("border-radius","50px")
                }else{
                    this.$femaleText.show();
                }
                if(femalePercentage > 80){
                    this.$maleText.hide();
                    this.$female.css("border-radius", "50px")
                }else{
                    this.$maleText.show();
                }

            } else {
                this.$nb.show();
                this.$nb.width("100%");
                this.$male.hide();
                this.$female.hide();
                if(this.$genderHandle)
                    this.$genderHandle.hide();
            }
        }
    }

    private static prepareCatchScreen() {
        if(!this.pokemon)
            return;

        var weightString = this.pokemon.weight_kg.toString();
            var heightString = this.pokemon.height_m.toString();

            if(weightString == "") {
                weightString = "---";
            } else {
                weightString = weightString + " kg";
            }

            if(heightString == "") {
                heightString = "---";
            } else {
                heightString = heightString + " m";
            }

            if(this.$weight) {
                this.$weight.text("Weight: " + weightString);
            }

            if(this.$height) {
                this.$height.text("Height: " + heightString);
            }

            if(this.$xpGrowth) {
                this.$xpGrowth.text("Experience growth: "+this.pokemon.experience_growth);
            }

            if(this.$happiness) {
                this.$happiness.text("Base Happiness: "+this.pokemon.base_happiness);
            }
            
            if(this.$captureRate) {
                this.$captureRate.text("Capture Rate: "+this.pokemon.capture_rate);
            }
    }

    public static updateTypeCompatibilityScreen(){

        if(this.$compatibility){
            this.$compatibility.text(Compatibility.getName(Compatibility.get()));
        }

        if(!this.pokemon)
            return;

        if(this.$types) {
            this.$types.empty();
            if(Compatibility.get()==CompatibilityValue.NORMAL){
                for(let type of this.pokemon.normalComp) {
                    this.$types.append("<div id=\"type-"+type+"\"></div>");
                    $("#type-"+type).css("background-image","url('../images/types/"+type+".png')");
                }
            } else
            if(Compatibility.get()==CompatibilityValue.RESISTANT){
                for(let type of this.pokemon.resistComp){
                    this.$types.append("<div id=\"type-"+type+"\"></div>")
                    $("#type-"+type).css("background-image","url('../images/types/"+type+".png')");
                }
            }else 
            if(Compatibility.get()==CompatibilityValue.WEAK){
                for(let type of this.pokemon.weakComp){
                    this.$types.append("<div id=\"type-"+type+"\"></div>")
                    $("#type-"+type).css("background-image","url('../images/types/"+type+".png')");
                }
            }else
            if(Compatibility.get()==CompatibilityValue.IMMUNE){
                for(let type of this.pokemon.immuneComp){
                    this.$types.append("<div id=\"type-"+type+"\"></div>")
                    $("#type-"+type).css("background-image","url('../images/types/"+type+".png')");
                }
            }
        }   
    }

    private static sortTypeCompatibilities(){
        if(!this.pokemon)
            return;

        var poketypes = [
            "bug", "dark", "dragon",
            "electric","fairy","fight",
            "fire", "flying", "ghost",
            "grass","ground","ice",
            "normal","poison","psychic",
            "rock","steel","water"
        ];
        var poketypesImages = [
            "bug", "dark", "dragon",
            "electric","fairy","fighting",
            "fire", "flying", "ghost",
            "grass","ground","ice",
            "normal","poison","psychic",
            "rock","steel","water"
        ];
        this.pokemon.normalComp = [];
        this.pokemon.resistComp = [];
        this.pokemon.weakComp = [];
        this.pokemon.immuneComp = [];
        for(let i = 0; i < poketypes.length; i++){
            if((this.pokemon as any)["against_" + poketypes[i]] == 1){
                this.pokemon.normalComp.push(poketypesImages[i]);
            }else if((this.pokemon as any)["against_" + poketypes[i]] == 0){
                this.pokemon.immuneComp.push(poketypesImages[i]);
            }else if((this.pokemon as any)["against_" + poketypes[i]] < 1){
                this.pokemon.resistComp.push(poketypesImages[i]);
            }else if((this.pokemon as any)["against_" + poketypes[i]] > 1){
                this.pokemon.weakComp.push(poketypesImages[i])
            }
        }

    }

    private static prepareFormsScreen(){
        if(!this.pokemon)
            return;

        var formDivs = [];

        if(this.$forms && this.$image){
            this.$forms.empty();
            for(let filename of this.pokemon.images){
                var form = ScreenManager.getFormIdAndNameFromImageFileName(filename, this.pokemon.images.indexOf(this.pokemon.pokedex_number + "f.png") != -1);
                let onclick = "onclick=\"ScreenManager.setPokemonImage('" +filename.trim()+ "')\"";
                formDivs.push("<div id=\"form-"+form.id+"\" " +onclick+">"+form.name+"</div>");   
            }

            formDivs.sort();
            for(let div of formDivs) {
                this.$forms.append(div);
            }
            
        }
    }

    private static setPokemonImage(form :string) {
        var that = this;
        Connection.ajaxGet("/images/pokemon/"+form)
        .done(() => {
            if(that.$forms)
                that.$forms.children().removeClass("selected");
            if(that.$image && that.pokemon){
                that.$image.attr("src", "/images/pokemon/"+form);
                let id = that.getFormIdAndNameFromImageFileName(form, that.pokemon.images.indexOf(that.pokemon.pokedex_number + "f.png") != -1).id;
                $("#form-"+id).addClass("selected");
            }
        }).fail(() => {
            if(that.$image)
                that.$image.attr("src", "/images/pokemon/susti.png");
        });
    }

    private static getFormIdAndNameFromImageFileName(imageName :string, hasGenderDiff? :boolean) {
        var imgwoext = "";
        var aux = imageName.split('.');
        for(let i = 0; i < aux.length-1; i++){
            imgwoext += aux[i];
        }
        var formName = "";
        var formId = "";
        aux = imgwoext.split('-');
        for(let i = 1; i < aux.length; i++) {
            formName += aux[i].charAt(0).toUpperCase() + aux[i].slice(1);
            if(i < aux.length - 1) {
                formName += " ";
            }
            formId += aux[i];
        }
        if(formName == "") {
            if(aux[0].endsWith("f")) {
                formName = "Female";
                formId = "female";
            } else if(hasGenderDiff) {
                formName = "Male";
                formId = "male";
            } else {
                formName = "Base";
                formId = "base";
            }
        }

        return {
            id: formId,
            name: formName
        };
    }

    private static markPokemonAsSelected() {
        if(!this.$grid || !this.pokemon)
            return;

        this.$grid.children().removeClass("selected");
        $("#pkicon" + this.pokemon.pokedex_number).addClass("selected");
    }

    public static updateSortLambda(){
        this.showLoading(true);
        if(OrderType.get() == OrderValue.NUMBER) {
            ScreenManager.sort = ((p1, p2) => (p1.pokedex_number - p2.pokedex_number) * (!OrderType.getAscending() ? -1 : 1));
        } else if(OrderType.get() == OrderValue.ALPHA) {
            ScreenManager.sort = (function(p1, p2) {
                var a = p1.name.toLowerCase();
                var b = p2.name.toLowerCase();
                return (a > b ? 1 : b > a ? -1 : 0) * (!OrderType.getAscending() ? -1 : 1);
            })
            
        } else {
            ScreenManager.sort = (function(p1, p2) {
                if(p1.weight_kg == "") {
                    return -1 * (!OrderType.getAscending() ? -1 : 1);
                } else if(p2.weight_kg == "") {
                    return 1 * (!OrderType.getAscending() ? -1 : 1);
                } else {
                    return (p1.weight_kg - p2.weight_kg) * (!OrderType.getAscending() ? -1 : 1);
                }
            })
        }
    }
        
    
    public static getPokemonList(){
        return this.pokemonList;
    }
}
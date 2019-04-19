package urjc;

import java.util.HashMap;
import java.util.Map;

import org.bson.Document;

public class Pokemon {

    private String name, japaneseName, classification, type1, type2;
    private int hp, attack, defense, sp_attack, sp_defense, speed, baseTotal;
    private int weight, height, percentageMale;
    private int generation, pokedexNumber;
    private boolean legendary, custom, pseudolegendary;
    private String[] abilities;

    private int eggSteps, happiness, captureRate, experience;
    private int againstBug, againstDark, againstDragon, againstElectric, againstFairy, againstFight, againstFire, againstFlying, againstGhost, againstGrass, againstGround, againstIce, againstNormal, againstPoison, againstPsychic, againstRock, againstSteel, againstWater;

    

    public Pokemon() {}

    public Pokemon(String name, String japaneseName, String classification, String type1, String type2, 
                    int hp, int attack, int defense, int sp_attack, int sp_defense, int speed, int baseTotal, 
                    int weight, int height, int percentageMale, 
                    int generation, 
                    boolean legendary, boolean custom, boolean pseudolegendary,
                    String[] abilities, 
                    int eggSteps, int happiness, int captureRate, int experience, 
                    int againstBug, int againstDark, int againstDragon, int againstElectric, int againstFairy, int againstFight, int againstFire, int againstFlying, int againstGhost, int againstGrass, int againstGround, int againstIce, int againstNormal, int againstPoison, int againstPsychic, int againstRock, int againstSteel, int againstWater) {
        this.name = name;
        this.japaneseName = japaneseName;
        this.classification = classification;
        this.type1 = type1;
        this.type2 = type2;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.sp_attack = sp_attack;
        this.sp_defense = sp_defense;
        this.speed = speed;
        this.baseTotal = baseTotal;
        this.weight = weight;
        this.height = height;
        this.percentageMale = percentageMale;
        this.generation = generation;
        this.legendary = legendary;
        this.custom = custom;
        this.pseudolegendary = pseudolegendary;
        this.abilities = abilities;
        this.eggSteps = eggSteps;
        this.happiness = happiness;
        this.captureRate = captureRate;
        this.experience = experience;
        this.againstBug = againstBug;
        this.againstDark = againstDark;
        this.againstDragon = againstDragon;
        this.againstElectric = againstElectric;
        this.againstFairy = againstFairy;
        this.againstFight = againstFight;
        this.againstFire = againstFire;
        this.againstFlying = againstFlying;
        this.againstGhost = againstGhost;
        this.againstGrass = againstGrass;
        this.againstGround = againstGround;
        this.againstIce = againstIce;
        this.againstNormal = againstNormal;
        this.againstPoison = againstPoison;
        this.againstPsychic = againstPsychic;
        this.againstRock = againstRock;
        this.againstSteel = againstSteel;
        this.againstWater = againstWater;
    }
    
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJapaneseName() {
        return this.japaneseName;
    }

    public void setJapaneseName(String japaneseName) {
        this.japaneseName = japaneseName;
    }

    public String getNativeJapaneseName() {
        return this.japaneseName.replaceAll("[\\p{InBasic_Latin}||\\p{InLatin-1 Supplement}]", "");
    }

    public String getRomanizedJapaneseName() {
        return this.japaneseName.replaceAll("[^(\\p{InBasic_Latin}||\\p{InLatin-1 Supplement})]", "");
    }

    public String getClassification() {
        return this.classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getType1() {
        return this.type1;
    }

    public void setType1(String type1) {
        this.type1 = type1;
    }

    public String getType2() {
        return this.type2;
    }

    public void setType2(String type2) {
        this.type2 = type2;
    }

    public int getHp() {
        return this.hp;
    }

    public void setHp(int hp) {
        this.hp = hp;
    }

    public int getAttack() {
        return this.attack;
    }

    public void setAttack(int attack) {
        this.attack = attack;
    }

    public int getDefense() {
        return this.defense;
    }

    public void setDefense(int defense) {
        this.defense = defense;
    }

    public int getSp_attack() {
        return this.sp_attack;
    }

    public void setSp_attack(int sp_attack) {
        this.sp_attack = sp_attack;
    }

    public int getSp_defense() {
        return this.sp_defense;
    }

    public void setSp_defense(int sp_defense) {
        this.sp_defense = sp_defense;
    }

    public int getSpeed() {
        return this.speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    public int getBaseTotal() {
        return this.baseTotal;
    }

    public void setBaseTotal(int baseTotal) {
        this.baseTotal = baseTotal;
    }

    public int getWeight() {
        return this.weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getHeight() {
        return this.height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getPercentageMale() {
        return this.percentageMale;
    }

    public void setPercentageMale(int percentageMale) {
        this.percentageMale = percentageMale;
    }

    public int getGeneration() {
        return this.generation;
    }

    public void setGeneration(int generation) {
        this.generation = generation;
    }

    public int getPokedexNumber() {
        return this.pokedexNumber;
    }

    public void setPokedexNumber(int pokedexNumber) {
        this.pokedexNumber = pokedexNumber;
    }

    public int getLegendary() {
        return this.legendary ? 1 : 0;
    }

    public void setLegendary(int legendary) {
        this.legendary = legendary > 0;
    }

    public boolean isCustom(){
        return this.custom;
    }

    public void setCustom(boolean custom){
        this.custom = custom;
    }

    public boolean isPseudolegendary(){
        return this.pseudolegendary;
    }
    public void setPseudolegendary(boolean pseudolegendary){
        this.pseudolegendary = pseudolegendary;
    }

    public String[] getAbilities() {
        return this.abilities;
    }

    public void setAbilities(String[] abilities) {
        this.abilities = abilities;
    }

    public int getEggSteps() {
        return this.eggSteps;
    }

    public void setEggSteps(int eggSteps) {
        this.eggSteps = eggSteps;
    }

    public int getHappiness() {
        return this.happiness;
    }

    public void setHappiness(int happiness) {
        this.happiness = happiness;
    }

    public int getCaptureRate() {
        return this.captureRate;
    }

    public void setCaptureRate(int captureRate) {
        this.captureRate = captureRate;
    }

    public int getExperience() {
        return this.experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public int getAgainstBug() {
        return this.againstBug;
    }

    public void setAgainstBug(int againstBug) {
        this.againstBug = againstBug;
    }

    public int getAgainstDark() {
        return this.againstDark;
    }

    public void setAgainstDark(int againstDark) {
        this.againstDark = againstDark;
    }

    public int getAgainstDragon() {
        return this.againstDragon;
    }

    public void setAgainstDragon(int againstDragon) {
        this.againstDragon = againstDragon;
    }

    public int getAgainstElectric() {
        return this.againstElectric;
    }

    public void setAgainstElectric(int againstElectric) {
        this.againstElectric = againstElectric;
    }

    public int getAgainstFairy() {
        return this.againstFairy;
    }

    public void setAgainstFairy(int againstFairy) {
        this.againstFairy = againstFairy;
    }

    public int getAgainstFight() {
        return this.againstFight;
    }

    public void setAgainstFight(int againstFight) {
        this.againstFight = againstFight;
    }

    public int getAgainstFire() {
        return this.againstFire;
    }

    public void setAgainstFire(int againstFire) {
        this.againstFire = againstFire;
    }

    public int getAgainstFlying() {
        return this.againstFlying;
    }

    public void setAgainstFlying(int againstFlying) {
        this.againstFlying = againstFlying;
    }

    public int getAgainstGhost() {
        return this.againstGhost;
    }

    public void setAgainstGhost(int againstGhost) {
        this.againstGhost = againstGhost;
    }

    public int getAgainstGrass() {
        return this.againstGrass;
    }

    public void setAgainstGrass(int againstGrass) {
        this.againstGrass = againstGrass;
    }

    public int getAgainstGround() {
        return this.againstGround;
    }

    public void setAgainstGround(int againstGround) {
        this.againstGround = againstGround;
    }

    public int getAgainstIce() {
        return this.againstIce;
    }

    public void setAgainstIce(int againstIce) {
        this.againstIce = againstIce;
    }

    public int getAgainstNormal() {
        return this.againstNormal;
    }

    public void setAgainstNormal(int againstNormal) {
        this.againstNormal = againstNormal;
    }

    public int getAgainstPoison() {
        return this.againstPoison;
    }

    public void setAgainstPoison(int againstPoison) {
        this.againstPoison = againstPoison;
    }

    public int getAgainstPsychic() {
        return this.againstPsychic;
    }

    public void setAgainstPsychic(int againstPsychic) {
        this.againstPsychic = againstPsychic;
    }

    public int getAgainstRock() {
        return this.againstRock;
    }

    public void setAgainstRock(int againstRock) {
        this.againstRock = againstRock;
    }

    public int getAgainstSteel() {
        return this.againstSteel;
    }

    public void setAgainstSteel(int againstSteel) {
        this.againstSteel = againstSteel;
    }

    public int getAgainstWater() {
        return this.againstWater;
    }

    public void setAgainstWater(int againstWater) {
        this.againstWater = againstWater;
    }

    @Override
    public String toString() {
        return "{" +
            " name='" + getName() + "'" +
            ", japaneseName='" + getJapaneseName() + "'" +
            ", classification='" + getClassification() + "'" +
            ", type1='" + getType1() + "'" +
            ", type2='" + getType2() + "'" +
            ", hp='" + getHp() + "'" +
            ", attack='" + getAttack() + "'" +
            ", defense='" + getDefense() + "'" +
            ", sp_attack='" + getSp_attack() + "'" +
            ", sp_defense='" + getSp_defense() + "'" +
            ", speed='" + getSpeed() + "'" +
            ", baseTotal='" + getBaseTotal() + "'" +
            ", weight='" + getWeight() + "'" +
            ", height='" + getHeight() + "'" +
            ", percentageMale='" + getPercentageMale() + "'" +
            ", generation='" + getGeneration() + "'" +
            ", pokedexNumber='" + getPokedexNumber() + "'" +
            ", legendary='" + getLegendary() + "'" +
            ", custom='" + isCustom() + "'" +
            ", pseudolegendary='" + isPseudolegendary() + "'" +
            ", abilities='" + getAbilities() + "'" +
            ", eggSteps='" + getEggSteps() + "'" +
            ", happiness='" + getHappiness() + "'" +
            ", captureRate='" + getCaptureRate() + "'" +
            ", experience='" + getExperience() + "'" +
            ", againstBug='" + getAgainstBug() + "'" +
            ", againstDark='" + getAgainstDark() + "'" +
            ", againstDragon='" + getAgainstDragon() + "'" +
            ", againstElectric='" + getAgainstElectric() + "'" +
            ", againstFairy='" + getAgainstFairy() + "'" +
            ", againstFight='" + getAgainstFight() + "'" +
            ", againstFire='" + getAgainstFire() + "'" +
            ", againstFlying='" + getAgainstFlying() + "'" +
            ", againstGhost='" + getAgainstGhost() + "'" +
            ", againstGrass='" + getAgainstGrass() + "'" +
            ", againstGround='" + getAgainstGround() + "'" +
            ", againstIce='" + getAgainstIce() + "'" +
            ", againstNormal='" + getAgainstNormal() + "'" +
            ", againstPoison='" + getAgainstPoison() + "'" +
            ", againstPsychic='" + getAgainstPsychic() + "'" +
            ", againstRock='" + getAgainstRock() + "'" +
            ", againstSteel='" + getAgainstSteel() + "'" +
            ", againstWater='" + getAgainstWater() + "'" +
            "}";
    }
    
    public Document toDocument() {
        Map<String, Object> map = new HashMap<>();
        map.put("" + PokemonFields.name, this.name);
        map.put("" + PokemonFields.japanese_name, this.japaneseName);
        map.put("" + PokemonFields.abilities, this.abilities);
        map.put("" + PokemonFields.against_bug, this.againstBug);
        map.put("" + PokemonFields.against_dark, this.againstDark);
        map.put("" + PokemonFields.against_dragon, this.againstDragon);
        map.put("" + PokemonFields.against_electric, this.againstElectric);
        map.put("" + PokemonFields.against_fairy, this.againstFairy);
        map.put("" + PokemonFields.against_fight, this.againstFight);
        map.put("" + PokemonFields.against_fire, this.againstFire);
        map.put("" + PokemonFields.against_flying, this.againstFlying);
        map.put("" + PokemonFields.against_ghost, this.againstGhost);
        map.put("" + PokemonFields.against_grass, this.againstGrass);
        map.put("" + PokemonFields.against_ground, this.againstGround);
        map.put("" + PokemonFields.against_ice, this.againstIce);
        map.put("" + PokemonFields.against_normal, this.againstNormal);
        map.put("" + PokemonFields.against_poison, this.againstPoison);
        map.put("" + PokemonFields.against_psychic, this.againstPsychic);
        map.put("" + PokemonFields.against_rock, this.againstRock);
        map.put("" + PokemonFields.against_steel, this.againstSteel);
        map.put("" + PokemonFields.against_water, this.againstWater);
        map.put("" + PokemonFields.base_egg_steps, this.eggSteps);
        map.put("" + PokemonFields.base_happiness, this.happiness);
        map.put("" + PokemonFields.base_total, this.baseTotal);
        map.put("" + PokemonFields.capture_rate, this.captureRate);
        map.put("" + PokemonFields.classification, this.classification);
        map.put("" + PokemonFields.defense, this.defense);
        map.put("" + PokemonFields.xp_growth, this.experience);
        map.put("" + PokemonFields.height, this.height);
        map.put("" + PokemonFields.hp, this.hp);
        map.put("" + PokemonFields.percentage_male, this.percentageMale);
        map.put("" + PokemonFields.pokedex_number, this.pokedexNumber);
        map.put("" + PokemonFields.sp_attack, this.sp_attack);
        map.put("" + PokemonFields.sp_defense, this.sp_defense);
        map.put("" + PokemonFields.speed, this.speed);
        map.put("" + PokemonFields.type1, this.type1);
        map.put("" + PokemonFields.type2, this.type2);
        map.put("" + PokemonFields.weight, this.weight);
        map.put("" + PokemonFields.generation, this.generation);
        map.put("" + PokemonFields.is_legendary, this.legendary);
        return new Document(map);
    }
}
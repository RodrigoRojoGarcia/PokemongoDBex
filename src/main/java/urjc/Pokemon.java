package urjc;

public class Pokemon {

    private String name, japaneseName, classification, type1, type2;
    private int hp, attack, defense, sp_attack, sp_defense, speed, baseTotal;
    private int weight, height, percentageMale;
    private int generation, pokedexNumber;
    private boolean legendary;
    private String[] abilities;

    private int eggSteps, happiness, captureRate, experience;
    private int againstBug, againstDark, againstDragon, againstElectric, againstFairy, againstFight, againstFire, againstFlying, againstGhost, againstGrass, againstGround, againstIce, againstNormal, againstPoison, againstPsychic, againstRock, againstSteel, againstWater;

    public Pokemon() {}

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
        return this.pokedexNumber + " " + this.name;
    }
}
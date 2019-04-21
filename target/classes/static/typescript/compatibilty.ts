enum CompatibilityValue {
    NORMAL, RESISTANT, WEAK, IMMUNE
}

class Compatibility {
    private static compatibilityNames = ["Normal against:","Resistant against:", "Weak against:", "Immune against:"];

    private static current = CompatibilityValue.NORMAL;

    public static get(){
        return this.current;
    }
    public static nextCompatibility(){
        this.current = this.current == 0 ? this.compatibilityNames.length - 1 : (this.current - 1);
    }

    public static previousCompatibility(){
        this.current = this.current == this.compatibilityNames.length - 1 ? 0 : (this.current + 1);
    }

    public static getName(compatibility :CompatibilityValue){
        return this.compatibilityNames[compatibility];
    }

    public static getAmount(){
        return this.compatibilityNames.length;
    }
}
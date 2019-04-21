var CompatibilityValue;
(function (CompatibilityValue) {
    CompatibilityValue[CompatibilityValue["NORMAL"] = 0] = "NORMAL";
    CompatibilityValue[CompatibilityValue["RESISTANT"] = 1] = "RESISTANT";
    CompatibilityValue[CompatibilityValue["WEAK"] = 2] = "WEAK";
    CompatibilityValue[CompatibilityValue["IMMUNE"] = 3] = "IMMUNE";
})(CompatibilityValue || (CompatibilityValue = {}));
class Compatibility {
    static get() {
        return this.current;
    }
    static nextCompatibility() {
        this.current = this.current == 0 ? this.compatibilityNames.length - 1 : (this.current - 1);
    }
    static previousCompatibility() {
        this.current = this.current == this.compatibilityNames.length - 1 ? 0 : (this.current + 1);
    }
    static getName(compatibility) {
        return this.compatibilityNames[compatibility];
    }
    static getAmount() {
        return this.compatibilityNames.length;
    }
}
Compatibility.compatibilityNames = ["Normal against:", "Resistant against:", "Weak against:", "Immune against:"];
Compatibility.current = CompatibilityValue.NORMAL;
//# sourceMappingURL=compatibilty.js.map
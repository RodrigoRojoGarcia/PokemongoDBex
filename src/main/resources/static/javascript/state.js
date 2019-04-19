var StateValue;
(function (StateValue) {
    StateValue[StateValue["STATS"] = 0] = "STATS";
    StateValue[StateValue["BREEDING"] = 1] = "BREEDING";
    StateValue[StateValue["CATCHING"] = 2] = "CATCHING";
    StateValue[StateValue["TYPE_COMPATIBILITY"] = 3] = "TYPE_COMPATIBILITY";
    StateValue[StateValue["FORMS"] = 4] = "FORMS";
})(StateValue || (StateValue = {}));
class State {
    static get() {
        return this.current;
    }
    static nextState() {
        this.current = this.current == 0 ? this.stateNames.length - 1 : (this.current - 1);
    }
    static previousState() {
        this.current = this.current == this.stateNames.length - 1 ? 0 : (this.current + 1);
    }
    static getName(state) {
        return this.stateNames[state];
    }
    static getAmount() {
        return this.stateNames.length;
    }
}
State.stateNames = ["Stats", "Breed", "Catch", "Types", "Forms"];
State.current = StateValue.STATS;
//# sourceMappingURL=state.js.map
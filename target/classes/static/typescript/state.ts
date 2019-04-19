enum StateValue {
    STATS, BREEDING, CATCHING, TYPE_COMPATIBILITY, FORMS
}

class State {
    
    private static stateNames = ["Stats", "Breed", "Catch", "Types", "Forms"]; 

    private static current = StateValue.STATS;

    public static get(){
        return this.current;
    }
    
    public static nextState(){
        this.current = this.current == 0 ? this.stateNames.length - 1 : (this.current - 1);
    }
    
    public static previousState(){
        this.current = this.current == this.stateNames.length - 1 ? 0 : (this.current + 1);        
    }

    public static getName(state :StateValue){
        return this.stateNames[state];
    }

    public static getAmount() {
        return this.stateNames.length;
    }
}
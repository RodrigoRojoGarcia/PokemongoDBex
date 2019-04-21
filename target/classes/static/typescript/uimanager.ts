

class UIManager {
    private search? :MongoQuery[][];

    public static assignInput(){
        $("#displayL").click(UIManager.nextState);
        $("#displayR").click(UIManager.previousState);

        $("#typeLeft").click(UIManager.nextCompatibility);
        $("#typeRight").click(UIManager.previousCompatibility);
        
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
    


}
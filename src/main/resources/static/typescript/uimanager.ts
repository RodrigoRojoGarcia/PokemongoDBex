

class UIManager {
    private search? :MongoQuery[][];

    public static assignInput(){
        $("#displayL").click(UIManager.nextState);
        $("#displayR").click(UIManager.previousState);
        
    }

    private static nextState(){
        State.nextState();
        ScreenManager.updateScreensWithState();
    }
    
    private static previousState(){
        State.previousState();
        ScreenManager.updateScreensWithState();
    }
    


}
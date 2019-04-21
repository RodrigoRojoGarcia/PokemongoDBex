class UIManager {
    static assignInput() {
        $("#displayL").click(UIManager.nextState);
        $("#displayR").click(UIManager.previousState);
        $("#typeLeft").click(UIManager.nextCompatibility);
        $("#typeRight").click(UIManager.previousCompatibility);
    }
    static nextState() {
        State.nextState();
        ScreenManager.updateScreensWithState();
    }
    static previousState() {
        State.previousState();
        ScreenManager.updateScreensWithState();
    }
    static nextCompatibility() {
        Compatibility.nextCompatibility();
        ScreenManager.updateTypeCompatibilityScreen();
    }
    static previousCompatibility() {
        Compatibility.previousCompatibility();
        ScreenManager.updateTypeCompatibilityScreen();
    }
}
//# sourceMappingURL=uimanager.js.map
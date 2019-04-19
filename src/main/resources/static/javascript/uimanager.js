class UIManager {
    static assignInput() {
        $("#displayL").click(UIManager.nextState);
        $("#displayR").click(UIManager.previousState);
    }
    static nextState() {
        State.nextState();
        ScreenManager.updateScreensWithState();
    }
    static previousState() {
        State.previousState();
        ScreenManager.updateScreensWithState();
    }
}
//# sourceMappingURL=uimanager.js.map
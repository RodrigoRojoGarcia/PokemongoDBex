$(document).ready(function() {
    ScreenManager.doQueries();
    ScreenManager.updateScreensWithState();
    ScreenManager.updateTypeCompatibilityScreen();
    ScreenManager.initPingControl();
    
    UIManager.assignInput();
    
    Connection.getByCondition([], docs => ScreenManager.updateGrid(docs));
});
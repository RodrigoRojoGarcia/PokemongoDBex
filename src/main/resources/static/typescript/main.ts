$(document).ready(function() {
    ScreenManager.doQueries();
    ScreenManager.updateScreensWithState();
    
    UIManager.assignInput();
    
    Connection.getByCondition([], docs => ScreenManager.updateGrid(docs));
});
$(document).ready(function () {
    ScreenManager.doQueries();
    UIManager.doQueries();
    UIManager.setFilterTypesImages();
    UIManager.setSearch([[]]);
    ScreenManager.updateScreensWithState();
    ScreenManager.updateTypeCompatibilityScreen();
    ScreenManager.initPingControl();
    UIManager.assignInput();
    UIManager.applyServerSettings();
    var search = UIManager.getSearch();
    if (search)
        Connection.getByMultipleConditions(search, docs => ScreenManager.updateGrid(docs));
});
//# sourceMappingURL=main.js.map
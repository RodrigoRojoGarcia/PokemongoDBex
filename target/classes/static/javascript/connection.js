var Connection = /** @class */ (function () {
    function Connection() {
    }
    Connection.getCount = function (callback) {
        Connection.ajaxGet("pokemon/count")
            .done(function (count) { return callback(count); });
    };
    Connection.getByCondition = function (queries, listener) {
        var ret;
        if (queries.length == 0) {
            ret = Connection.ajaxGet("query");
        }
        else {
            ret = Connection.ajaxPost("query", [queries]);
        }
        ret.done(function (value) { return listener(value); });
    };
    Connection.getByMultipleConditions = function (queries, listener) {
        var ret;
        if (queries.length == 0 || queries[0].length == 0) {
            ret = Connection.ajaxGet("query");
        }
        else {
            ret = Connection.ajaxPost("query", queries);
        }
        ret.done(function (value) { return listener(value); });
    };
    Connection.ajaxGet = function (url) {
        return Connection.StaticJQuery.ajax({
            method: "GET",
            url: "http://" + location.host + "/" + url
        });
    };
    Connection.ajaxPost = function (url, data) {
        var send;
        var contentType;
        if (typeof (data) != "string") {
            send = JSON.stringify(data);
            contentType = "application/json";
        }
        else {
            send = data;
            contentType = "text/plain";
        }
        return Connection.StaticJQuery.ajax({
            method: "POST",
            url: "http://" + location.host + "/" + url,
            data: send,
            processData: true,
            headers: {
                "Content-Type": contentType
            }
        });
    };
    Connection.StaticJQuery = /** @class */ (function () {
        function class_1() {
        }
        class_1.ajax = function (query) {
            return $.ajax(query);
        };
        ;
        return class_1;
    }());
    return Connection;
}());
//# sourceMappingURL=connection.js.map
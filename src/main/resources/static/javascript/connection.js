class Connection {
    static getCount(callback) {
        Connection.ajaxGet("query/count")
            .done(count => callback(count))
            .fail(() => console.error("No se ha podido acceder al servidor para obtener el número de Pokémon."));
    }
    static getByCondition(queries, listener) {
        var ret;
        if (queries.length == 0) {
            ret = Connection.ajaxGet("query");
        }
        else {
            ret = Connection.ajaxPost("query", [queries]);
        }
        ret.done(value => listener(value))
            .fail(() => console.error("No se ha podido acceder al servidor para realizar la consulta."));
    }
    static getByMultipleConditions(queries, listener) {
        var ret;
        if (queries.length == 0 || queries[0].length == 0) {
            ret = Connection.ajaxGet("query");
        }
        else {
            ret = Connection.ajaxPost("query", queries);
        }
        ret.done(value => listener(value))
            .fail(() => console.error("No se ha podido acceder al servidor para realizar la consulta."));
    }
    static getPokemon(id, listener) {
        Connection.ajaxGet("query/" + id)
            .done(pokemon => listener(pokemon))
            .fail(() => console.error("No se ha podido acceder al servidor para obtener al Pokémon " + id));
    }
    static getAllConfigAttributes(listener) {
        Connection.ajaxGet("xml")
            .done(r => listener(r))
            .fail(() => console.error("No se ha podido acceder al servidor para obtener la configuración."));
    }
    static sendConfigAttribute(attrib, data, listener) {
        Connection.ajaxPost("xml/" + attrib + "/" + data, "")
            .done(() => {
            if (listener)
                listener();
        })
            .fail(() => console.error("No se ha podido acceder al servidor para cambiar la configuración."));
    }
    static ping(target, listener) {
        Connection.ajaxGet("ping/" + target)
            .done(r => listener(r == "succ"))
            .fail(r => listener(false));
    }
    static ajaxGet(url) {
        return Connection.StaticJQuery.ajax({
            method: "GET",
            url: "http://" + location.host + "/" + url
        });
    }
    static ajaxPost(url, data) {
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
    }
}
Connection.StaticJQuery = class {
    static ajax(query) {
        return $.ajax(query);
    }
    ;
};
//# sourceMappingURL=connection.js.map
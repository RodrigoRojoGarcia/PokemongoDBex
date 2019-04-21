
type MongoQueryReponse = {pokedex_number :number, is_legendary :number};

class Connection {

    public static getCount(callback :(count :number) => void) {
        Connection.ajaxGet("query/count")
        .done(count => callback(count))
        .fail(() => console.error("No se ha podido acceder al servidor para obtener el número de Pokémon."));
    }

    public static getByCondition(queries :MongoQuery[], listener :(value :MongoQueryReponse[]) => void) {
        var ret :jqXHR;
        if(queries.length == 0) {
            ret = Connection.ajaxGet("query");
        } else {
            ret = Connection.ajaxPost("query", [queries]);
        }
        ret.done(value => listener(value))
        .fail(() => console.error("No se ha podido acceder al servidor para realizar la consulta."));
    }

    public static getByMultipleConditions(queries: MongoQuery[][], listener :(docs :MongoQueryReponse[]) => void) {
        var ret :jqXHR;
        if(queries.length == 0 || queries[0].length == 0) {
            ret = Connection.ajaxGet("query")
        } else {
            ret = Connection.ajaxPost("query", queries)
        }
        ret.done(value => listener(value))
        .fail(() => console.error("No se ha podido acceder al servidor para realizar la consulta."));
    }

    public static getPokemon(id :number, listener :(pokemon :Pokemon) => void) {
        Connection.ajaxGet("query/" + id)
        .done(pokemon => listener(pokemon))
        .fail(() => console.error("No se ha podido acceder al servidor para obtener al Pokémon " + id));
    }

    public static ping(target : "spring" | "mongo", listener :(success :boolean) => void) {
        Connection.ajaxGet("ping/" + target)
        .done(r => listener(r == "succ"))
        .fail(r => listener(false));
    }

    public static ajaxGet(url :string) {
        return Connection.StaticJQuery.ajax({
            method: "GET",
            url: "http://" + location.host + "/" + url
        })
    }

    public static ajaxPost(url :string, data :object | string) {
        var send :string;
        var contentType :"application/json" | "text/plain";
        if(typeof(data) != "string") {
            send = JSON.stringify(data);
            contentType = "application/json"
        } else {
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
        })
    }

    private static StaticJQuery = class {
        public static ajax(query :{method :REST, url :string, data? :string, processData? :boolean, headers? :{"Content-Type" :"application/json" | "text/plain"}}) {
            return ($ as any).ajax(query) as jqXHR;
        };
    }

}

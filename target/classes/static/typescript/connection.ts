
type MongoQueryReponse = {pokedex_number :number, name :string, weight_kg :number | "", is_legendary :0 | 1, pseudolegendary :boolean};

type ConfigAttribute = "color" | "pattern" | "background"; 

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

    public static getAllConfigAttributes(listener :(attributes :{color :string, pattern :string, background :string}) => void) {
        Connection.ajaxGet("xml")
        .done(r => listener(r))
        .fail(() => console.error("No se ha podido acceder al servidor para obtener la configuración."));
    }

    public static sendConfigAttribute(attrib :ConfigAttribute, data :string, listener? :() => void) {
        Connection.ajaxPost("xml/" + attrib + "/" + data, "")
        .done(() => {
            if(listener)
                listener()
            })
        .fail(() => console.error("No se ha podido acceder al servidor para cambiar la configuración."));
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

    public static ajaxPost(url :string, data :object | string | HTMLFormElement) {
        var send :string;
        var contentType :"application/json" | "text/plain" | "multipart/form-data";
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

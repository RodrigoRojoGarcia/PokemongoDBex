declare function $(element :HTMLDocument | string) :jQuery;

declare class jQuery {
    /** Ejecutar cuando el documento esté listo */
    ready(listener :() => void) :void;
    /** Devuelve el hijo en la posición `index` dentro del elemento de la consulta, como elemento HTML */
    get(index? :number) :HTMLElement | HTMLElement[] | undefined;
    /** Devuelve una consulta referida al primer hijo */
    first() :jQuery;
    /** Devuelve una consulta referida al último hijo */
    last() :jQuery;
    /** Ejecutar al hacer click */
    click(listener :() => void) :void;
    /** Devuelve o modifica el contenido sin interpretarlo como HTML */
    text(content? :string) :string;
    /** Devuelve o modifica el contenido interpretándolo como HTML */
    html(content? :string) :string;
    /** Modifica un par clave-valor del atributo style */
    css(key :string, value :string) :void;
    /** Devuelve o modifica el valor de un elemento de formulario */
    val(content? :string | number | boolean) :string | number | boolean;
    /** Devuelve o modifica el valor del atributo especificado */
    attr(attribute :string, value? :string) :string;
    /** Añade una clase de CSS al elemento de la consulta */
    addClass(cl :string) :void;
    /** Elimina una clase de CSS al elemento de la consulta */
    removeClass(cl :string) :void;
    /** Alterna una clase de CSS al elemento de la consulta (la elimina si ya está, la añade si no) */
    toggleClass(cl :string) :void;
    /** Devuelve una nueva consulta referida a todos los hijos en profundidad del elemento de la consulta actual */
    children() :jQuery;
    /** Devuelve una nueva consulta referida a los hijos de primer nivel del elemento de la consulta actual */
    find() :jQuery;
    /** Elimina el atributo hidden */
    show() :void;
    /** Añade el atributo hidden */
    hide() :void;
}

declare class jqXHR {
    /** Ejecutar si la petición ha sido respondida correctamente */
    done(callback :(data :string, status? :string, request? :jqXHR) => void) :jqXHR;
    /** Ejecutar si ha habido algún problema al ejecutar la petición */
    fail(callback :(request? :jqXHR, status? :string, errorThrown? :string) => void) :jqXHR;
    /** Ejecutar cuando los callbacks de las funciones anteriores se han ejecutado */
    then(callback :(data? :string, status? :string, request? :jqXHR) => void) :jqXHR;
}

declare type REST = "GET" | "PUT" | "POST" | "DELETE";
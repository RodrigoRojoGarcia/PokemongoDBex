package urjc;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


import org.bson.BsonDocument;
import org.bson.BsonString;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pokemon")
public class QueryTester {
    
    @GetMapping("/count")
    public static long countPokemon() {
        return Program.getPokedex().countDocuments();
    }

    @GetMapping("/generation/{gen}")
    public static Collection<Pokemon> getPokemonByGeneration(@PathVariable int gen) {
        //? ¿¿Cómo devuelves esto al cliente??
        return null; // Program.getPokedex().find(new BsonDocument("generation", new BsonInt32(gen)));
        //? Y no me vale hacer un for para guardar en una lista todos los documentos y devolver esa lista
        //? Eso es ineficiente as fuck y se carga por completo el punto de las bases de datos en línea

        //? Además, hay que convertir los documentos devueltos por MongoDB a objetos Pokemon que Spring Boot pueda devolver
    }

    @GetMapping("/type/{type}")
    public static Collection<Pokemon> getPokemonByType(@PathVariable String type) {
        List<BsonDocument> choices = new ArrayList<>();
        choices.add(new BsonDocument("type1", new BsonString(type)));
        choices.add(new BsonDocument("type2", new BsonString(type)));
        return null; // Program.getPokedex().find(new BsonDocument("$or", new BsonArray(choices)));
    }
}
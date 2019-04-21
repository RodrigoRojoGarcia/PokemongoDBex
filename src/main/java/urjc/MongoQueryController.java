package urjc;

import java.util.Collection;
import java.util.List;
import java.util.ArrayList;

import com.mongodb.client.FindIterable;
import com.mongodb.client.model.Projections;

import org.bson.Document;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/query")
public class MongoQueryController {

    public static int nextId = -1;

    @GetMapping
    public Collection<Document> getAll() {
        List<Document> ret;
        ret = Program.getPokedex().find().projection(
            Projections.fields(Projections.include("pokedex_number","is_legendary"), Projections.exclude("_id"))).into(new ArrayList<Document>());
        return ret;
    }

    @GetMapping("/count")
    public long getCount() {
        return Program.getPokedex().countDocuments();
    }

    @PostMapping
    public Collection<Document> getNumbers(@RequestBody MongoQuery[][] queries) {
        List<Document> orList = new ArrayList<>();
        List<Document> andList = new ArrayList<>();
        List<Document> ret;

        for(MongoQuery[] orQuery : queries){
            andList = new ArrayList<>();
            for(MongoQuery andQuery : orQuery){
                andList.add(new Document(andQuery.getField(), andQuery.getValue()));
            }
            orList.add(new Document("$and", andList));
        }
        ret = Program.getPokedex().find(new Document("$or", orList)).projection(
            Projections.fields(Projections.include("pokedex_number","is_legendary"), Projections.exclude("_id"))).into(new ArrayList<Document>());
        ret.sort((d1, d2) -> ((Integer) d1.get("pokedex_number")) - ((Integer) d2.get("pokedex_number")));
        return ret;
    }
    
    @GetMapping("/{id}")
    public Document getPokemonById(@PathVariable int id){
        return Program.getPokedex().find(new Document("pokedex_number", id)).first();
    }
    
    @PostMapping("/new")
    public ResponseEntity<Pokemon> createNewPokemon(@RequestBody Pokemon pokemon){
        if(nextId == -1) {
            nextId = (int) Program.getPokedex().countDocuments() + 1;
        } else {
            nextId++;
        }
        pokemon.setPokedexNumber(nextId);
        Program.getPokedex().insertOne(pokemon.toDocument());
        return null;
    }


    // private static Collection<Document> iterableToCollection(FindIterable<Document> iterable) {
    //     List<Document> ret = new ArrayList<>();
    //     for (Document document : iterable) {
    //         ret.add(document);
    //     }
    //     return ret;
    // }
}
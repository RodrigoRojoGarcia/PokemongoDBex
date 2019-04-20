package urjc;

import java.io.File;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.bson.BsonArray;
import org.bson.BsonDocument;
import org.bson.BsonString;
import org.bson.Document;

public class AuxiliaryMethods {

    public static void fixAbilities() {
        int fixed = 0;
        for(Document document : Program.getPokedex().find()) {
            if(document.get("abilities").getClass() == java.util.ArrayList.class)
                continue;
            
            String abilitiesString = (String) document.get("abilities");
            abilitiesString = abilitiesString.substring(1, abilitiesString.length() - 1);
            String[] abilitiesArray = abilitiesString.split("'");
            List<BsonString> abilities = new ArrayList<>();

            for(int i = 0; i < abilitiesArray.length; i++) {
                if(i % 2 == 1) {
                    abilities.add(new BsonString(abilitiesArray[i]));
                }
            }

            Program.getPokedex().updateOne(new BsonDocument("name", new BsonString((String) document.get("name"))),
                new BsonDocument("$set", new BsonDocument("abilities", new BsonArray(abilities))));

            System.out.println("Fixeados " + fixed++);
        }
    }

    public static void setAllCustom() {
        Program.getPokedex().updateMany(new Document(), new Document("$set", new Document("custom", false)));
    }

    public static void setPseudolegendaries() {
        List<Document> conditions = new ArrayList<>();
        conditions.add(new Document("experience_growth", new Document("$gte", 1250000)));
        conditions.add(new Document("base_total", new Document("$gte", 600)));
        conditions.add(new Document("is_legendary", new Document("$lt", 1)));
        Program.getPokedex().updateMany(new Document("$and", conditions), new Document("$set", new Document("pseudolegendary", true)));
    }

    public static void setImageData() {
        File folder = new File("src/main/resources/static/images/pokemon");
        File[] listOfImages = folder.listFiles();
        for(File image : listOfImages) {
            String filename = image.getName().split("\\.")[0];
            String[] pokemonV = filename.split("-");
            try {
                int pokemon = Integer.parseInt(pokemonV[0].split("f")[0]);
            
                Object imagesArrayObject = Program.getPokedex().find(new Document("pokedex_number", pokemon)).first().get("images");
                
                @SuppressWarnings("unchecked")
                Set<String> imagesArray = imagesArrayObject != null ?
                    new HashSet<>((List<String>) imagesArrayObject) :
                    new HashSet<>();
                
                imagesArray.add(image.getName());
                Program.getPokedex().updateOne(new Document("pokedex_number", pokemon), new Document("$set", new Document("images", imagesArray)));
                System.out.println("Escaneando imagen " + image.getName() + ". Añadiéndolo a " + Program.getPokedex().find(new Document("pokedex_number", pokemon)).first().get("name"));
            } catch(NumberFormatException e) {
                System.out.println("No hay ningún Pokémon en la base de datos cuyo número sea \"" + pokemonV[0].split("f")[0] + "\"");
            }
            
        }
    }

    public static void setNonBinaryGender() {
        Program.getPokedex().updateMany(new Document("" + PokemonFields.percentage_male, ""), new Document("$set", new Document("" + PokemonFields.percentage_male, -1)));
    }
}
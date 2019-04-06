package urjc;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Program 
{
    private static MongoClient client;
    private static MongoDatabase database;
    private static XMLManager xmlManager;

    public static void main( String[] args )
    {
        SpringApplication.run(Program.class);
        System.out.println("¡Servidor listo!");
        client = new MongoClient("localhost:27017");
        database = client.getDatabase("pokedex");

        //crear xml prueba
        xml();

    }

    public static MongoCollection<Document> getPokedex() {
        return database.getCollection("pokemon");
    }

    public static void databaseClose() {
        client.close();
    }

    public static void xml() {
        xmlManager = new XMLManager();
        xmlManager.createXML();
        xmlManager.readXML();
        xmlManager.updateXML(100, 200, "blue", "unicornio98");
        xmlManager.readXML();
    }
    
    // En caso de necesitar reimportar el CSV, usar este método para convertir los strings de habilidades en arrays
    /* public static void fixAbilities() {

        int fixed = 0;
        for(Document document : database.getCollection("pokemon").find()) {
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

            database.getCollection("pokemon").updateOne(new BsonDocument("name", new BsonString((String) document.get("name"))),
                new BsonDocument("$set", new BsonDocument("abilities", new BsonArray(abilities))));

            System.out.println("Fixeados " + fixed++);
        }
    } */
}
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

        client = new MongoClient("localhost:27017");
        database = client.getDatabase("pokedex");
        System.out.println("¡Servidor listo!");
        // crear xml prueba
        // xml();
    }

    public static MongoCollection<Document> getPokedex() {
        return database.getCollection("pokemon");
    }

    public static void databaseClose() {
        client.close();
    }

    public static MongoClient getClient() {
        return Program.client;
    }

    public static void xml() {
        xmlManager = new XMLManager();
        xmlManager.createXML();
        xmlManager.readXML();
        xmlManager.updateXML(100, 200, "blue", "keldeo98");
        xmlManager.readXML();
    }
}
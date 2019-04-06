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
    public static void main( String[] args )
    {
        SpringApplication.run(Program.class);
        System.out.println("¡Servidor listo!");
        MongoClient mongo = new MongoClient("localhost:27017");
        MongoDatabase database = mongo.getDatabase("pokedex");

        MongoCollection<Document> pokedex = database.getCollection("pokemon");
        System.out.println("BULBASAUR: " + pokedex.find(new Document("name", "Bulbasaur")).first());

        mongo.close();
    }
}

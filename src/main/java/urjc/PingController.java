package urjc;

import org.bson.Document;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ping")
public class PingController {

    @GetMapping("/spring")
    public String pingSpring() {
        return "succ";
    }

    @GetMapping("/mongo")
    public String pingMongo() {
        String ret = "fail";
        if(Program.getPokedex().find(new Document("pokedex_number", 151)).first().get("name").equals("Mew")) {
            ret = "succ";
        }
        return ret;
    }
}
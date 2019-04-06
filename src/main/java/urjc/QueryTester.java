package urjc;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pokemon")
public class QueryTester {
    
    @GetMapping("/count")
    public static long countPokemon() {
        return Program.getPokedex().countDocuments();
    }
}
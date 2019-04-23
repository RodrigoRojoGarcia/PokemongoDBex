package urjc;

import org.jdom.Document;
import org.jdom.Element;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/xml")
public class ConfigController {

    @SuppressWarnings("unused")
    private static class ConfigControllerReponse {
        private String color;
        private String pattern;
        private String background;
        
        public ConfigControllerReponse() {};

        public ConfigControllerReponse(String color, String pattern, String background) {
            this.color = color;
            this.pattern = pattern;
            this.background = background;
        };

        public String getColor(){
            return color;
        }

        public String getPattern(){
            return pattern;
        }

        public String getBackground(){
            return background;
        }

        public void setColor(String color){
            this.color = color;
        }

        public void setPattern(String pattern){
            this.pattern = pattern;
        }

        public void setBackground(String background){
            this.background = background;
        }

    }

    @GetMapping
    public static ConfigControllerReponse getAll() {
        Element root = XMLManager.getDoc("config.xml").getRootElement();
        return new ConfigControllerReponse(root.getChildText("color"), root.getChildText("pattern"), root.getChildText("background"));
    }

    @GetMapping("/color")
    public static String getPokedexColor(){
        Document doc = XMLManager.getDoc("config.xml");
        String color = doc.getRootElement().getChildText("color");
        return color;
    }

    @GetMapping("/pattern")
    public static String getPokedexPattern(){
        Document doc = XMLManager.getDoc("config.xml");
        String pattern = doc.getRootElement().getChildText("pattern");
        return pattern;
    }

    @GetMapping("/background")
    public static String getPokedexBackground(){
        Document doc = XMLManager.getDoc("config.xml");
        String background = doc.getRootElement().getChildText("background");
        return background;
    }

    @PostMapping("/color/{color}")
    public static void setPokedexColor(@PathVariable String color){
        Document doc = XMLManager.getDoc("config.xml");
        XMLManager.updateXML(color, doc.getRootElement().getChildText("pattern"),
            doc.getRootElement().getChildText("background"));
    }

    @PostMapping("/pattern/{pattern}")
    public static void setPokedexPattern(@PathVariable String pattern){
        Document doc = XMLManager.getDoc("config.xml");
        XMLManager.updateXML(doc.getRootElement().getChildText("color"), pattern,
            doc.getRootElement().getChildText("background"));
    }

    @PostMapping("/background/{background}")
    public static void setPokedexBackground(@PathVariable String background){
        Document doc = XMLManager.getDoc("config.xml");
        XMLManager.updateXML(doc.getRootElement().getChildText("color"), doc.getRootElement().getChildText("pattern"),
            background);
    }

    @PostMapping
    public static void createConfig(@RequestBody Config config) {
        XMLManager.updateXML(config.getColor(), config.getPattern(), config.getBackground());
    }
    
}

package urjc;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

import java.io.File;
import java.io.FileOutputStream;

public class XMLManager {
    private final static String path = System.getProperty("user.dir") + "/src/main/resources/static/";
    private final static String relativePath = "src/main/resources/static/";

    public XMLManager(){

    }

    //Metodo que crea el fichero XML
    public static void readXML(){
        try{
            Document doc = getDoc("config.xml");
            Element root = doc.getRootElement();

            //Muestra los elementos dentro de la configuracion del xml
            
            System.out.println("Color : " + root.getChildText("color"));
            System.out.println("Pattern : " + root.getChildText("pattern"));
            System.out.println("Background : " + root.getChildText("background"));
            

        } catch(Exception e){
            System.out.println(e.getMessage());
        }
    }

    

    public static void createXML(){
        try{
            File configFile = new File(relativePath + "config.xml");
            if(!configFile.exists()) {
                Element config = new Element("config");
                Document doc = new Document(config); //Establece el config como raiz
                Config conf = new Config();
                //Introducir elementos en el xml dentro de config(raiz)
                config.addContent(new Element("color").setText(conf.getColor()));
                config.addContent(new Element("pattern").setText(conf.getPattern()));
                config.addContent(new Element("background").setText(conf.getBackground()));

                XMLOutputter xmlOutput = new XMLOutputter();

                //Crea el fichero con los datos
                xmlOutput.setFormat(Format.getPrettyFormat());
                xmlOutput.output(doc, new FileOutputStream(configFile));
            }

        } catch (Exception e) {

            System.out.println(e.getMessage());
        }
    }

    public static void updateXML(String c, String p, String b){
        try{
            Document doc = getDoc("config.xml");
            Element config = doc.getRootElement();
            
            //Coger los hijos de la raiz
            
            Element color = config.getChild("color");
            Element pattern = config.getChild("pattern");
            Element background = config.getChild("background");

            
           
            //Cambiar el contenido
            
            color.setText(c);
            pattern.setText(p);
            background.setText(b);
            
     
            XMLOutputter xmlOutput = new XMLOutputter();

            //Crea el fichero con los datos
            xmlOutput.setFormat(Format.getPrettyFormat());
            xmlOutput.output(doc, new FileOutputStream(new File(relativePath + "config.xml")));

        } catch(Exception e){
            System.out.println(e.getMessage());
        }
    }
    //Metodo que te devuelve el documento
    public static Document getDoc(String file){
        Document doc = null;
        try{
            SAXBuilder builder = new SAXBuilder();
            File xml = new File(path+file);

            doc = (Document) builder.build(xml);
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        
        return doc;
    }
}
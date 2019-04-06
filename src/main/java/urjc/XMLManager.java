package urjc;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

import java.io.File;
import java.io.FileOutputStream;

public class XMLManager {
    private final String path = System.getProperty("user.dir") + "/src/main/resources/static/";
    private final String relativePath = "src/main/resources/static/";

    public XMLManager(){

    }

    //Metodo que crea el fichero XML
    public void readXML(){
        try{
            Document doc = getDoc("config.xml");
            Element root = doc.getRootElement();

            //Muestra los elementos dentro de la configuracion del xml
            System.out.println("Screen Width: " + root.getChildText("width"));
            System.out.println("Screen Height : " + root.getChildText("height"));
            System.out.println("Color : " + root.getChildText("color"));
            System.out.println("UserName : " + root.getChildText("userName"));

        } catch(Exception e){
            System.out.println(e.getMessage());
        }
    }

    public void createXML(){
        try{
            Element config = new Element("config");
            Document doc = new Document(config); //Establece el config como raiz
            
            //Introducir elementos en el xml dentro de config(raiz)
            config.addContent(new Element("width").setText("640"));
            config.addContent(new Element("height").setText("480"));
            config.addContent(new Element("color").setText("red"));
            config.addContent(new Element("userName").setText(""));

            XMLOutputter xmlOutput = new XMLOutputter();

            //Crea el fichero con los datos
            xmlOutput.setFormat(Format.getPrettyFormat());
            xmlOutput.output(doc, new FileOutputStream(new File(relativePath + "config.xml")));


        } catch (Exception e) {

            System.out.println(e.getMessage());
        }
    }

    public void updateXML(int w, int h, String c, String u){
        try{
            Document doc = getDoc("config.xml");
            Element config = doc.getRootElement();
            
            //Coger los hijos de la raiz
            Element width = config.getChild("width");        
            Element height = config.getChild("height");
            Element color = config.getChild("color");
            Element userName = config.getChild("userName");
           
            //Cambiar el contenido
            width.setText(Integer.toString(w));
            height.setText(Integer.toString(h));
            color.setText(c);
            userName.setText(u);
     
            XMLOutputter xmlOutput = new XMLOutputter();

            //Crea el fichero con los datos
            xmlOutput.setFormat(Format.getPrettyFormat());
            xmlOutput.output(doc, new FileOutputStream(new File(relativePath + "config.xml")));

        } catch(Exception e){
            System.out.println(e.getMessage());
        }
    }
    //Metodo que te devuelve el documento
    private Document getDoc(String file){
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
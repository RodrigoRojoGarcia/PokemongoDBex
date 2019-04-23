package urjc;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

//CLASE DE LAS CONFIGURACIONES, AÑADIR LAS QUE SE QUIERA

@XmlRootElement(name = "config")
@XmlType(propOrder = { "width", "height", "color", "userName"})

public class Config {
    
    private String color;
    private String pattern;
    private String background;

    public Config (){
        pattern = "LineV";
        background = "Hills";
        color = "red";
    }

    @XmlElement(name = "pattern")
    public String getPattern(){
        return pattern;
    }

    public void setPattern(String pattern){
        this.pattern = pattern;
    }


    @XmlElement(name = "color")
    public String getColor(){
        return color;
    }

    public void setColor(String color){
        this.color = color;
    }

    @XmlElement(name = "background")
    public String getBackground(){
        return background;
    }

    public void setBackground(String background){
        this.background = background;
    }



}
package urjc;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

//CLASE DE LAS CONFIGURACIONES, AÑADIR LAS QUE SE QUIERA

@XmlRootElement(name = "config")
@XmlType(propOrder = { "width", "height", "color", "userName"})

public class Config {
    private int width;
    private int height;
    private String color;
    private String userName;

    public Config (){
        width = 640;
        height = 480;
        color = "red";
    }

    @XmlElement(name = "width")
    public int getWidth(){
        return width;
    }

    public void setWidth(int width){
        this.width = width;
    }

    @XmlElement(name = "height")
    public int getHeight(){
        return height;
    }

    public void setHeight(int height){
        this.height = height;
    }

    @XmlElement(name = "color")
    public String getColor(){
        return color;
    }

    public void setColor(String color){
        this.color = color;
    }

    @XmlElement(name = "userName")
    public String getUserName(){
        return userName;
    }

    public void setUserName(String userName){
        this.userName = userName;
    }


}
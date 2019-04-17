package urjc;

public class MongoQuery {

    private String field;
    private Object value;

    public MongoQuery() {}

    public MongoQuery(String field, Object value){
        this.field = field;
        this.value = value;
    }

    public String getField(){
        return this.field;
    }

    public Object getValue(){
        return this.value;
    }

    public void setField(String field){
        this.field = field;
    }
    public void setValue(Object value){
        this.value = value;
    }

    
    
    /* int pokedex_number;
    int is_legendary;
    String type1, type2;

    public MongoQuery() {

    }

    public MongoQuery(int pokedex_number, int is_legendary, String type1, String type2) {
        this.pokedex_number = pokedex_number;
        this.is_legendary = is_legendary;
        this.type1 = type1;
        this.type2 = type2;
    }


    public int getPokedex_number() {
        return pokedex_number;
    }

    public void setPokedex_number(int pokedex_number) {
        this.pokedex_number = pokedex_number;
    }

    public int getLegendary() {
        return is_legendary;
    }

    public void setLegendary(int is_legendary) {
        this.is_legendary = is_legendary;
    }

    public String getType1(){
        return type1;
    }

    public void setType1(String type1){
        this.type1 = type1;
    }

    public String getType2(){
        return type2;
    }

    public void setType2(String type2){
        this.type2 = type2;
    } */
}
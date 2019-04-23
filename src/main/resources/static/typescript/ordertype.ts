enum OrderValue {
    NUMBER, ALPHA, WEIGHT
}

class OrderType {
    private static orderNames = ["Number","Alfabetical","OrdPeso"];

    private static orderTypeNames = ["Asc", "Desc"];

    private static current = OrderValue.NUMBER;

    private static ascending = true;

    public static get(){
        return this.current;
    }
    public static getAscending(){
        return this.ascending;
    }

    public static nextOrder(){
        this.current = this.current == this.orderNames.length - 1 ? 0 : (this.current + 1);

    }
    public static toggleOrderType(){
        this.ascending = !this.ascending;
    }
    public static getName(){
        return this.orderNames[this.current];
    }
    public static getTypeName(){
        if(this.ascending){
            return this.orderTypeNames[0];
        }else{
            return this.orderTypeNames[1];
        }
    }
}
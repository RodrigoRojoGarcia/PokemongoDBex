var OrderValue;
(function (OrderValue) {
    OrderValue[OrderValue["NUMBER"] = 0] = "NUMBER";
    OrderValue[OrderValue["ALPHA"] = 1] = "ALPHA";
    OrderValue[OrderValue["WEIGHT"] = 2] = "WEIGHT";
})(OrderValue || (OrderValue = {}));
class OrderType {
    static get() {
        return this.current;
    }
    static getAscending() {
        return this.ascending;
    }
    static nextOrder() {
        this.current = this.current == this.orderNames.length - 1 ? 0 : (this.current + 1);
    }
    static toggleOrderType() {
        this.ascending = !this.ascending;
    }
    static getName() {
        return this.orderNames[this.current];
    }
    static getTypeName() {
        if (this.ascending) {
            return this.orderTypeNames[0];
        }
        else {
            return this.orderTypeNames[1];
        }
    }
}
OrderType.orderNames = ["Number", "Alfabetical", "OrdPeso"];
OrderType.orderTypeNames = ["Asc", "Desc"];
OrderType.current = OrderValue.NUMBER;
OrderType.ascending = true;
//# sourceMappingURL=ordertype.js.map
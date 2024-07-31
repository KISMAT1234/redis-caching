export class Product {
    // id:string;
    // name:string;
    // price: number;

    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

export class Order {
    products = []

    addProduct(product) {
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    removeProducts(productsId){
        this.products = this.products.filter(product => product.id.toString()!== productsId);
    }

    calculatePricing(){

    }
    generateInvoice(){

    }
    processPayment(){
        
    }
}

import { Product,Order } from "./order.js";

const product1 = new Product('1','Laptop', 100)
const product2 = new Product('2','Mobile', 50)

const order = new Order();
order.addProduct(product2)
order.addProduct(product1)

order.generateInvoice()
order.processPayment()
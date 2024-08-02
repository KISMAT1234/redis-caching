import { Product,Order } from "./order.js";
import priceCalculator from "./priceCalculator.js";

const product1 = new Product('1','Laptop', 100)
const product2 = new Product('2','Mobile', 50)

const order = new Order();
const pricing = new priceCalculator()

let total = pricing.calculatePricing(order.getProducts())
order.addProduct(product2)
order.addProduct(product1)
order.generateInvoice()
order.processPayment()
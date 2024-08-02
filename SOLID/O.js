class PaymentProcessor {

    constructor(paymentProcessor) { 
        this.processor = paymentProcessor; 
    }

    processPayment(amount, paymentType){
        console.log(amount,`amount value ${amount} by payment type ${paymentType}`); 
    }
}

const processor = new PaymentProcessor()
processor.processPayment(100,'paypal')

class PaymentProcessor {
    processPayment(amount){
        console.log(amount,'amount value')
    }
}

const processor = new PaymentProcessor()
processor.processPayment(100)

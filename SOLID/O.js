// ***************** BAD WAY *************************

// class PaymentProcessor {

//     processPayment(amount, paymentType){
//      if(paymentType === 'esewa'){
//     console.log('payment of ',paymentType)
// } 
// else if(paymentType === 'khalti'){
//     console.log('payment of ',paymentType)
// } 
// else if(paymentType === 'imepay'){
//     console.log('payment of ',paymentType)
// } else {
//     throw new Error('Unknown payment error')
// }
//     }
// }
// const processor = new PaymentProcessor()
// processor.processPayment(100,'esewa')









// ********************* GOOD WAY *************************

class PaymentProcessor {

    constructor(paymentProcessor) { 
       this.processor = paymentProcessor; 
    } 

    processPayment(amount){
        this.processor.processPayment(amount) 
    }
}

class EsewaProcessor {
    processPayment(amount){
       console.log('processing esewa payment in esewa worth',amount)
    }
}

class KhaltiProcessor {
    processPayment(amount){
       console.log('processing khalti payment in esewa worth',amount)
    }
}



const Esewa  = new EsewaProcessor()
const Khalti = new KhaltiProcessor()
const processor = new PaymentProcessor(Khalti)
processor.processPayment(100)

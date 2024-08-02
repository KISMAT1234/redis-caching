class priceCalculator {
    calculatePricing(products) {
    return this.products.reduce((total, product) => total + product.price, 0)
    
    }
}
export default  priceCalculator
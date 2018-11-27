function finalPrice(price) {
    let finalPrice = ""
    for (var a = 0; a < price.length; a++) {
        if (Number.isInteger(parseInt(price[a]))) {
            finalPrice += price[a].toString()
        }
    }
    return finalPrice
}

export default finalPrice
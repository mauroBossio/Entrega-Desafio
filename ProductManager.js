const fs = require('fs/promises');
const path = require('path');

class ProductManager {

    constructor(filename) {
        this.filename = filename
        this.filepath = path.join(__dirname, this.filename)
        this.products = []
    }

    async getProducts() {
        const data = await fs.readFile(this.filepath, 'utf-8')
        this.products = JSON.parse(data)

        return this.products
    }
}

module.exports = ProductManager
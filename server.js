const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager('productos.json');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('hola mundo')
})

app.get('/productos', async (req, res) => {
    const { limit } = req.query;
    console.log(`Buscando ${limit || 'todos los'} productos`);
    const products = await productManager.getProducts();

    let filtrados = products;

    if (limit) {
        filtrados = filtrados.slice(0, parseInt(limit));
    }

    res.send(filtrados);
});

app.get("/productos/:id", async (req, res) => {
    const products = await productManager.getProducts();

    const { id } = req.params

    for (const p of products) {
        if (p.id == id) {
            res.send(p)
            return
        }
    }
})


const port = 3000

app.listen(port, () => {
    console.log(`Express Server listening at http://localhost:${port}`);
})
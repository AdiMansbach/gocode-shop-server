//file system so I can use readFile
const fs = require('fs');

const express = require("express"); //lib from express from node_modules

const app = express();

//read the request params whenever they are exist
app.use(express.json());

const {v4: uuidv4} = require('uuid');

const {readFile, writeFile, findById} = require("./utils");

//What to do when a request is coming
//req = request from client
//res = response to client
//definitions for route and callback
//
app.get("/", (req, res) => {
    console.log('hello');
    res.send('Hi');
});

//get products
//example for params: http://localhost:8080/products/?title=Joh&min=10&max=30&category=jewelery
app.get("/products", (req, res) => {
    readFile((err, data) => {
        if (err){
            writeFile(data, (err) => {
                res.send([]);
            });
        }
        else{
            const {title, min, max, category} = req.query;
            let products = JSON.parse(data);
            if (title){
                products = products.filter((product) => 
                    product.title ? 
                    product.title.toLowerCase().includes(title.toLowerCase()) 
                    : false);
            }
            if (category){
                products = products.filter((product) => 
                    product.category ? 
                    product.category.toLowerCase() === category.toLowerCase()
                    : false);
            }
            if(min){
                products = products.filter((product) => 
                    product.price ? 
                    product.price > min
                    : false);
            }
            if(max){
                products = products.filter((product) => 
                    product.price ? 
                    product.price < max
                    : false);
            }
            res.send(products);
        }
    });
    console.log('products');
});

//get product according id
app.get("/products/:id", (req, res) => {
    const {id} = req.params;
    console.log('id ' + id);
    readFile((err, data) => {
        if (err){
            writeFile(data, (err) => {
                res.send([]);
            });
        }
        else{
            const {title, min, max, category} = req.query;
            let products = JSON.parse(data);
            if (title){
                products = products.filter((product) => 
                    product.title ? 
                    product.title.toLowerCase().includes(title.toLowerCase()) 
                    : false);
            }
            if (category){
                products = products.filter((product) => 
                    product.category ? 
                    product.category.toLowerCase() === category.toLowerCase()
                    : false);
            }
            if(min){
                products = products.filter((product) => 
                    product.price ? 
                    product.price > min
                    : false);
            }
            if(max){
                products = products.filter((product) => 
                    product.price ? 
                    product.price < max
                    : false);
            }
            console.log('products')
            //The + sign converts id to string
            const product = findById(products, id, true);
            console.log('product ' + JSON.stringify(product))
            res.send(product)
        }
    });
    console.log('products');
});

//add new product
app.post("/products", (req, res) => {
    const {title} = req.body;
    console.log('title ' + title)
 
    readFile((err, data) => {
        const products = JSON.parse(data);
        const newProduct = {
            id: uuidv4(),
            title: title,
        };

        console.log('newProduct ' + JSON.stringify(newProduct))
        products.push(newProduct);

        writeFile(JSON.stringify(products), (err, data) => {
             res.send("OK")
        });
    })
 });
 
//update product
//{"title":"aaa"}
app.put("/products/:id", (req, res) => {
    const {id} = req.params;
    const {title} = req.query; // if it's in the line of params
    //const {title} = req.body;
    console.log('title ' + title);
    readFile((req, data) => {
        const products = JSON.parse(data);
        const product = findById(products, id, true);
        console.log('product ' + JSON.stringify(product))
        if (product){
            product.title = title;
            writeFile(JSON.stringify(products), (err, data) => {
                res.send("OK")
            });
        }
    });
});

//delete product
app.delete("/products/:id", (req, res) => {
    try{
        const {id} = req.params;
        console.log('id ' + id)
        readFile((err, data) => {
            const products = JSON.parse(data);
            const productIndex = products.findIndex(product => product.id === +id);
            console.log('productIndex ' + productIndex)
            if (productIndex > -1){
                products.splice(productIndex, 1);
                writeFile(JSON.stringify(products), (err, data) => {
                    res.send("OK")
                });
                console.log('products ' + JSON.stringify(products))
            }
            else{
                res.send("Not Found");
            }
        });
    }
    catch{
        res.send("Not Found");
    }
});

app.listen(8080);
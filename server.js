//file system so I can use readFile
const fs = require('fs');

const express = require("express"); //lib from express from node_modules

const app = express();
//What to do when a request is coming
//req = request from client
//res = response to client
//definitions for route and callback
//
app.get("/", (req, res) => {
    console.log('hello');
    res.send('Hi');
});

app.get("/products", (req, res) => {
    fs.readFile("./products.json", "utf8", (err, data) => {
        if (err){
            res.send('error!')
        }
        else{
            console.log(err)
            res.send(JSON.parse(data))
        }
    })
    console.log('products');
});

app.get("/products/:id", (req, res) => {
    const {id} = req.params;
    console.log('id ' + id);
    fs.readFile("./products.json", "utf8", (err, data) => {
        const products = JSON.parse(data);
        //The + sign converts id to string
        const product = products.find((product) => product.id === +id);
        res.send(product)
    })
    console.log('products');
});

app.listen(8080);
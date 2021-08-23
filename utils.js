const fs = require('fs');

const file = "./products.json";
// const { module } = require("module");

function readFile(callback){
    fs.readFile(file, "utf8", callback);
}

function writeFile(data, callback){
    fs.writeFile(file, data, callback);
}

function findById(list, id, toParse){
    if (toParse){
        return list.find((item) => item.id === +id);
    }
    else{
        return list.find((item) => item.id === id);
    }
}

module.exports = {
    readFile,
    writeFile, 
    findById,
    num
}
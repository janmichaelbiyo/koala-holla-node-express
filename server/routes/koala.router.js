const express = require('express');
const router = express.Router();
let koalas = require('../Data/Koala_Data.js');

// DB CONNECTION



// GET
router.get('/', (req, res) => {
    res.send(koalas);
});


// POST
router.post('/',(req,res)=>{
    const newKoala=req.body;
    const lastId=koalas[koalas.length-1].id;
    newKoala.id=lastId +1;

    console.log(newKoala);
    koalas.push(newKoala);
    res.sendStatus(200);
})

// PUT


// DELETE

module.exports = router;
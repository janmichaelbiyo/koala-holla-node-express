const express = require('express');
const router = express.Router();
const pool = require('../database/pool');
// let koalas = require('../Data/Koala_Data.js');




// DB CONNECTION



// GET
// router.get('/', (req, res) => {
//     res.send(koalas);
// });

router.get('/', (req, res) => {
    const queryKoala = `SELECT * FROM "koalas";`;

    pool
    .query(queryKoala)
    .then((result) => {
       
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('whats going on', error)
        res.sendStatus(500);
    });
});


// POST
// router.post('/',(req,res)=>{
//     const newKoala=req.body;
//     const lastId=koalas[koalas.length-1].id;
//     newKoala.id=lastId +1;

//     console.log(newKoala);
//     koalas.push(newKoala);
//     res.sendStatus(200);
// })

router.post('/',(req, res)=>{
    const newKoalaSql = req.body;
    const queryKoala = `INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes" )
    VALUES
    ($1, $2, $3, $4, $5);`;
    const queryInfo = [
        newKoalaSql.name,
        newKoalaSql.gender,
        newKoalaSql.age,
        newKoalaSql.ready_to_transfer,
        newKoalaSql.notes
        
    ]


    pool
    .query(queryKoala, queryInfo)
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('this is not a drill issues!!!', error);
        res.sendStatus(500);
    })
   
});

// PUT

router.put('/:id' , (req,res) => { 
    const id = req.params.id; 
    const koalaData = req.body;
    const queryKoala = `UPDATE "koalas" SET "ready_to_transfer" = 'Y'  WHERE "id"= $1;`;


    pool
    .query (queryKoala, [id])
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('this is going to go well', error);
        res.sendStatus(500);
    });
});



// DELETE

router.delete('/:id', (req, res) => {
    const queryDeleteKoala = `DELETE FROM "koalas" WHERE "id" =${req.params.id}`;

    pool
        .query(queryDeleteKoala)
        .then((result) => {
                res.send(result.rows);
        })
        .catch((error) => {
            console.log('time to get going bud', error);

            res.sendStatus(500);
        })
})


module.exports = router;
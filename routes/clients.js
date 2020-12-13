const express = require('express');
const Client = require('../models/clients_model');
const router = express.Router('mongoose');

router.post('/', async(req, res) => {
    const client = new Client({
        name: req.body.name,
        whatsappNo: req.body.whatsappNo,
        email: req.body.email,
        officeAddress: req.body.officeAddress
    })

    try{
        const a1 = await client.save()
        res.status(201).json(a1);
    }catch(err){
        res.send("Error: " + err);
    }
});

router.get('/', async(req, res) => {
    try{
        const clients = await Client.find()
        res.json(clients);
    }catch(err){
        res.send('Error: ' + err);
    }
})

router.get('/:id', async(req, res) => {
    try{
        const client = await Client.findById(req.params.id)
        res.json(client);
    }catch(err){
        res.send('Error: ' + err);
    }
})

router.patch('/:id', async(req, res) => {
    try{
        const client = await Client.findById(req.params.id)
        client.name = req.body.name
        client.whatsappNo = req.body.whatsappNo
        client.email = req.body.email
        client.officeAddress = req.body.officeAddress

        const a1 = await client.save()
        res.json(a1);
    }catch(err){
        res.send('Error: ' + err);
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const client = await Client.findById(req.params.id)
        const a1 = await client.remove()
        res.status(200).json({
            message: "Request Client was DELETED",
            id: req.params.id,
            client
        })
    }catch(err){
        res.send('Error: ' + err);
    }
});



module.exports = router;

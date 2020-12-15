const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const express = require('express');
const Client = require('../models/clients_model');
const {validate} = require('../models/clients_model');
const router = express.Router('mongoose');

router.post('/', auth, async(req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
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

router.get('/', auth, async(req, res) => {
    try{
        const clients = await Client.find()
        res.json(clients);
    }catch(err){
        res.send('Error: ' + err);
    }
})

router.get('/:id', auth, async(req, res) => {
    try{
        const client = await Client.findById(req.params.id)
        res.json(client);
    }catch(err){
        res.status(404).send('The client with the given ID was not found. ' + err);
    }
})

router.patch('/:id', auth, async(req, res) => {
    try{
        const client = await Client.findById(req.params.id)
        client.name = req.body.name
        client.whatsappNo = req.body.whatsappNo
        client.email = req.body.email
        client.officeAddress = req.body.officeAddress

        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const a1 = await client.save()
        res.json(a1);
    }catch(err){
        res.status(404).send('The client with the given ID was not found. ' + err);
    }
})

router.delete('/:id', [auth, admin], async(req, res) => {
    try{
        const client = await Client.findById(req.params.id)
        const a1 = await client.remove()
        res.status(200).json({
            message: "Request Client was DELETED",
            id: req.params.id,
            name: client.name
        })
    }catch(err){
        res.status(404).send('The client with the given ID was not found. ' + err);
    }
});



module.exports = router;

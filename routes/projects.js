const express = require('express');
const Project = require('../models/projects_model');
const {validate} = require('../models/projects_model');
const Client = require('../models/clients_model');
const Vendor = require("../models/vendors_model");
const router = express.Router('mongoose');

router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const client = await Client.findById(req.body.client);
    if (!client) return res.status(400).send('Invalid Client.');

    const vendor = await Vendor.findById(req.body.vendor);
    if (!vendor) return res.status(400).send('Invalid Vendor.');

    const project = new Project({
        name: req.body.name,
        client: req.body.client,
        vendor: req.body.vendor,
        actualCost: req.body.actualCost,
        vendorCost: req.body.vendorCost,
        advance: req.body.advance,
        months: req.body.months,
        deadline: req.body.deadline
    })

    try{
        const c1 = await project.save()
        res.json(c1).send();
    }catch(err){
        res.send("Error: " + err);
    }
});

router.get('/', async(req, res) => {
    try{
        const projects = await Project.find()
        res.json(projects);
    }catch(err){
        res.send('Error: ' + err);
    }
})

router.get('/:id', async(req, res) => {
    try{
        const project = await Project.findById(req.params.id);
        res.json(project);
    }catch(err){
        res.status(404).send('The project with the given ID was not found. ' + err);
    }
})

router.patch('/:id', async(req, res) => {
    try{
        const project = await Project.findById(req.params.id)
        project.name = req.body.name
        project.client = req.body.client
        project.vendor = req.body.vendor
        project.actualCost = req.body.actualCost
        project.vendorCost = req.body.vendorCost
        project.advance = req.body.advance
        project.months = req.body.months
        project.deadline = req.body.deadline
        
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        const c1 = await project.save()
        res.json(c1);
    }catch(err){
        res.status(404).send('The project with the given ID was not found. ' + err);
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const project = await Project.findById(req.params.id)
        const c1 = await project.remove()
        res.status(200).json({
            message: "Request Project was DELETED",
            id: req.params.id,
            name: project.name
        })
    }catch(err){
        res.status(404).send('The project with the given ID was not found. ' + err);
    }
});


module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Supplier = require("../models/supplier.model");
const Employee = require("../models/employee.model");

const formDataBody = multer();

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /suppliers"
    });
});

//Get Next Registration Number
router.get("/get-next-regno", (req, res, next) => {

    function pad(num, size) {
        while (num.length < size) num = "0" + num;
        return "S" + num;
    }

    Supplier
        .find({}, { supplierid: 1, _id: 0 })
        .exec()
        .then(doc => {
            const supplieridarray = doc.map(x => {
                return parseInt(x.supplierid.slice(1))
            })

            const nextsupplierid = pad(String(Math.max(...supplieridarray) + 1), 4);

            res.status(200).json({
                message: "Handeling GET requests to /get-next-regno",
                nextsupplierid: nextsupplierid
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

})

//Create a supplier
router.post("/create-supplier", formDataBody.fields([]), (req, res, next) => {

    console.log("Body: ", req.body);
    console.log("Added Date: ", req.body.addeddate);

    const addeddate = new Date(req.body.addeddate).toISOString().split('T')[0];

    const supplier = new Supplier({
        _id: new mongoose.Types.ObjectId(),
        supplierid: req.body.supplierid,
        name: req.body.name,
        abbreviation: req.body.abbreviation,
        address: req.body.address,
        title: req.body.title,
        contactperson: req.body.contactperson,
        addedby: req.body.addedby,
        addeddate: addeddate,
        contactnumber: req.body.contactnumber,
        email: req.body.email,
    });

    supplier
        .save()
        .then(result => {
            res.status(201).json({
                message: "Handeling POST requests to /suppliers/create-supplier, SUPPLIER SAVED",
                type: 'success',
                alert: `${result.name} added`,
                addedSupplier: result
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not add supplier`,
            });
            console.log("Error: ", err)
        })
});

//Get all table supplier data
router.get("/get-all-supplier-table-data", (req, res, next) => {

    Supplier
        .find()
        .exec()
        .then(doc => {

            const tbody = doc.map(x => ({
                "supplierid": x.supplierid,
                "name": x.name,
                "abbreviation": x.abbreviation,
                "contactperson": x.title + ' ' + x.contactperson,
                "contactnumber": x.contactnumber,
            }))

            res.status(201).json({
                message: "Handeling GET requests to /get-all-supplier-table-data",
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})

//Get supplier data by Supplier ID
router.get("/:supplierid", (req, res, next) => {
    const id = req.params.supplierid;

    Supplier
        .findOne({ supplierid: id })
        .exec()
        .then(doc => {

            const supplier = {
                'supplierid': doc.supplierid,
                'name': doc.name,
                'abbreviation': doc.abbreviation,
                'address': doc.address,
                'title': doc.title,
                'contactperson': doc.contactperson,
                'addedby': doc.addedby,
                'addeddate': doc.addeddate,
                'contactnumber': doc.contactnumber,
                'email': doc.email,
            }

            res.status(200).json({
                message: "Handeling GET requests to /:supplierid",
                supplier: supplier
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})

//Update supplier data by Supplier ID
router.post("/update-by-id/:supplierid", formDataBody.fields([]), (req, res, next) => {
    console.log("UPDATE: ", req.body);

    Supplier
        .findOneAndUpdate({ supplierid: req.params.supplierid }, req.body, { new: true })
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Handling POST requests to /suppliers/update-by-id/:supplierid, SUPPLIER UPDATED",
                type: 'success',
                alert: `${doc.name} updated`,
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update supplier`,
            });
            console.log(err);
        });
});

module.exports = router;
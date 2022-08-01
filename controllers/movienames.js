const express = require("express")
const movie = require('../models/user_schema')
const errorHandler = require("../helpers/errorhandler")

// creating movies
exports.newmovienames = async function (req, res) {
    console.log("Inside post fun");

    var Actor_name = req.body.Actor_name; //Extract title from input form
    var mov_name = req.body.mov_name;

    if (Actor_name == null || Actor_name == '') {
        return res.json("Null value cannot be inserted");
    }
    if (mov_name == null || mov_name == '') {
        return res.json("Null value cannot be inserted");
    }

    movie.find({ $and: [{ Actor_name: Actor_name }, { mov_name: mov_name }] }, function (err, data) {
        if (err) {
            console.log(err);
            errorHandler(err)
        }
        if (data.length > 0) {
            return res.json("This has already been saved");
        }
        var movieObject = new movie(req.body)

        try {
            movie.create(movieObject); // saves data to collections
            return res.json("data inserted"); //send back data to postman
        }
        catch (err) {
            console.log("Inside error block of mongo insert ", err);
            errorHandler(err)
        }
    })

}
// get details about movies
exports.getmovienames = async function (req, res) {

    var mov_name = req.query.mov_name;
    var Actor_name = req.query.Actor_name

    let query = {}
    if (req.query.mov_name || req.query.Actor_name) {
        query.mov_name = req.query.mov_name;
        query.Actor_name = req.query.Actor_name;

    }
    // let Movie = movie.find(query);
    movie.find({ $or: [{ mov_name: mov_name }, { Actor_name: Actor_name }] }, function (err, val) {
        try {
            if (val.length == 0)// wrong id
            {
                return res.send("data does not exists")
            }
            else {
                return res.send(val);
            }
        }
        catch (err) {

            errorHandler(err);
        }
    })

}

//update data of movies
exports.getupdatedmovies = async function (req, res) {
    const data = {
        mov_name: req.body.mov_name,
        Actor_name: req.body.Actor_name,
        Release_date: req.body.Release_date,
        Renumeration: req.body.Renumeration
    }
    //var id=req.body.id
    if (!data) {
        return res.json("nothing found")
    }
    else {
        var newdata = req.body
        var id = req.params.id
        var options = { new: true }
        const result = await movie.findByIdAndUpdate(id, newdata, options)
            .then(data => {
                if (!data) {
                    res.send("cannot update")
                }
                else {
                    return res.send(result)
                }
            })

           .catch(err => {
                console.log("inside catch")
                res.send(err)

            })
    }
}

//delete data of movies

exports.deletedmovies = async function (req, res) {
    const id = req.params.id
    movie.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.send("Wrong ID and not exists")
            }
            else {
                res.send("Deleted Successfully");
            }
        })
        .catch(err => {
            errorHandler(err);
        })


}

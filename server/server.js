const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/calendar-of-activities-db', {
    useMongoClient: true
})

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')

let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

const Activity = mongoose.model('Activity', {
    name: String,
    dt_start: Date,
    dt_end: Date,
    local: String,
    users: [],
    vehicles: [],
    resources: []
})

app.get('/activities', (req, res, next) => {
    Activity.find({}, null, {
        sort: {
            _id: -1
        }
    }, (error, activities) => {
        if (error) return next(error)
        res.send(activities)
    })
})

app.param('id', (req, res, next) => { // OPTIONALLY: you can use middleware to fetch activity object
    Activity.findById(req.params.id, (error, activity) => {
        req.activity = activity
        next()
    })
})

app.get('/activities/:id', (req, res, next) => {
    Activity.findById(req.params.id, (error, activity) => {
        if (error) return next(error)
        res.send(activity.toJSON())
    })
})

app.post('/activities', (req, res, next) => {
    let newActivity = new Activity(req.body)
    newActivity.save((error, results) => {
        if (error) return next(error)
        res.send(results)
    })
})

app.put('/activities/:id', (req, res, next) => {
    Activity.findById(req.params.id, (error, activity) => {      
        if (error) return next(error)
        if (req.body.name) activity.name = req.body.name
        if (req.body.dt_start) activity.dt_start = req.body.dt_start
        if (req.body.dt_end) activity.dt_end = req.body.dt_end
        if (req.body.local) activity.local = req.body.local
        if (req.body.users) activity.users = req.body.users
        if (req.body.vehicles) activity.vehicles = req.body.vehicles
        if (req.body.resources) activity.resources = req.body.resources
        activity.save((error, results) => {
            res.send(results)
        })
    })
})

app.delete('/activities/:id', (req, res, next) => {
    Activity.findById(req.params.id, (error, activity) => {
        if (error) return next(error)
        activity.remove((error, results) => {
            if (error) return next(error)
            res.send(results)
        })
    })
})

app.use(errorhandler())

app.listen(3000)
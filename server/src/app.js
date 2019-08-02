const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var Issue = require("../models/issues");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// DB Setup
var mongoose = require('mongoose');

var DATABASE_URL = process.env.DATABASE_URL || 'http://localhost'
mongoose.connect(`mongodb://${DATABASE_URL}/issues`, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', function (error) {
  // If first connect fails because server-database isn't up yet, try again.
  // This is only needed for first connect, not for runtime reconnects.
  // See: https://github.com/Automattic/mongoose/issues/5169
  if (error.message && error.message.match(/failed to connect to server .* on first connect/)) {
    setTimeout(function () {
      mongoose.connect(`mongodb://${DATABASE_URL}/issues`, { useNewUrlParser: true }).catch(() => {
        // empty catch avoids unhandled rejections
      });
    }, 20 * 1000);
  } else {
    // Some other error occurred.  Log it.
    console.error(new Date(), String(error));
  }
});

db.once("open", function(callback){
  console.log("Connection Succeeded");
});

// SERVER Setup
app.get('/issues', (req, res) => {
  Issue.find({}, 'title description', function (error, issues) {
    if (error) { console.error(error); }
    res.send({
      issues: issues
    })
  }).sort({_id:-1})
});


// Issue Endpoints
app.post('/issues', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var new_issue = new Issue({
    title: title,
    description: description
  })

  new_issue.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Issue saved successfully!'
    })
  })
})

// Fetch single issue
app.get('/issue/:id', (req, res) => {
  var db = req.db;
  Issue.findById(req.params.id, 'title description', function (error, issue) {
    if (error) { console.error(error); }
    res.send(issue)
  })
})

// Update a issue
app.put('/issues/:id', (req, res) => {
  var db = req.db;
  Issue.findById(req.params.id, 'title description', function (error, issue) {
    if (error) { console.error(error); }

    issue.title = req.body.title
    issue.description = req.body.description
    issue.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a issue
app.delete('/issues/:id', (req, res) => {
  var db = req.db;
  Issue.remove({
    _id: req.params.id
  }, function(err, issue){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})


app.listen(process.env.PORT || 8081)

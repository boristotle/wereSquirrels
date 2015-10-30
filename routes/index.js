var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/wereSquirrels')
var mongo = require('mongodb').ObjectId

var wereSquirrels = db.get('weresquirrels');
var uniBears = db.get('unibears')
var colonies = db.get('colonies');
var duels = db.get('duels');

// Display all colonies, and results of every duel
router.get('/', function(req, res, next) {
  return colonies.find({}, function(err, colonies){
  }).then(function(colonies){
    var col1 = colonies[0]._id;
    var col2 = colonies[1]._id;
    var col3 = colonies[2]._id;
    var col4 = colonies[3]._id
    Promise.all([
      duels.find({wonColony: {$in: [col1] } }),
      duels.find({wonColony: {$in: [col2] } }),
      duels.find({wonColony: {$in: [col3] } }),
      duels.find({wonColony: {$in: [col4] } }),
      ]).then(function(duels){
        duelsArr = [];
      duelsArr.push(duels[0].length);
      duelsArr.push(duels[1].length);
      duelsArr.push(duels[2].length);
      duelsArr.push(duels[3].length);
      // console.log(colonies)
      // console.log(duels)
      res.render('index', {wins: duelsArr , colonies: colonies})
    })
  })
});


router.get('/colony/:id', function(req, res, next){
  wereSquirrels.find({colony: mongo.ObjectId(req.params.id) }).then(function(squirrels){
    uniBears.find({colony: mongo.ObjectId(req.params.id)}, function(err, bears){
      var squirrelsArr = [];
      for (var i = 0; i < squirrels.length; i++) {
      squirrelsArr.push(squirrels[i].name, squirrels[i].duels);
    }
          console.log(squirrelsArr);
      // console.log(bears)
      res.render('show', {bears: bears, squirrels: squirrels})
})
  })
})

router.get('/weresquirrelStats', function(req, res, next){
  return wereSquirrels.find({}).then(function(squirrels){
      var promise = [];
    // console.log(squirrels)
    squirrels.forEach(function(squirrel){ 
    promise.push(colonies.findOne({_id: squirrel.colony}))
    })
    Promise.all(promise)
    .then(function(colonies){
      // console.log(colonies)
      // console.log(squirrels)
      res.render('wereSquirrelStats', {squirrels: squirrels, colonies: colonies})
    })
  })
})

router.get('/createDuel', function(req, res, next){
  res.render('createDuel', {winner: [] , loser: []})
})

randomNum = function() {
  return Math.floor(Math.random() * 100 + 0)
}

router.post('/', function(req, res, next){
  var ID = duels.id();
  Promise.all([
    colonies.find({_id: req.body.opponent1}),
    colonies.find({_id: req.body.opponent2}),
    ])
  .then(function(bothColonies){
    // console.log(bothColonies)
    var theColony = bothColonies.map(function(col){
      return col[0]._id;
    })
    console.log(theColony)
      return wereSquirrels.find({colony: {$in: theColony } } ).then(function(squirrels){
      // console.log(squirrels)
      Promise.all([
        duels.insert({_id: ID, wonColony: null, lostColony: null}),
        wereSquirrels.update({ _id: squirrels[0]._id}, { $push: {duels: {$each: [{_id: ID, garlic: randomNum() , meat: randomNum() }]} } }),
        wereSquirrels.update({ _id: squirrels[1]._id}, { $push: {duels: {$each: [{_id: ID, garlic: randomNum() , meat: randomNum() }]} } }),
        wereSquirrels.update({ _id: squirrels[2]._id}, { $push: {duels: {$each: [{_id: ID, garlic: randomNum() , meat: randomNum() }]} } }),
        wereSquirrels.update({ _id: squirrels[3]._id}, { $push: {duels: {$each: [{_id: ID, garlic: randomNum() , meat: randomNum() }]} } }),
        ]).then(function(data){
          // console.log(data)
          // console.log(squirrels[0].duels)
          var team1 = (squirrels[0].duels[squirrels[0].duels.length - 1].garlic) + (squirrels[0].duels[squirrels[0].duels.length - 1].meat) +
          (squirrels[1].duels[squirrels[1].duels.length - 1].garlic) + (squirrels[1].duels[squirrels[1].duels.length - 1].meat)
          
          var team2 = (squirrels[2].duels[squirrels[2].duels.length - 1].garlic) + (squirrels[2].duels[squirrels[2].duels.length - 1].meat) +
          (squirrels[3].duels[squirrels[3].duels.length - 1].garlic) + (squirrels[3].duels[squirrels[3].duels.length - 1].meat)
                      // console.log('team1: ' + team1, 'team2: ' + team2)
            var winner,
                loser;
            if (team1 > team2) {
              winner = squirrels[0].colony;
              loser = squirrels[2].colony;
            }
            else {
              winner = squirrels[2].colony;
              loser = squirrels[0].colony;
            }
          duels.update({_id: ID}, {wonColony: winner, lostColony: loser}).then(function(){
            duels.findOne({_id: ID}, function(err, data){
              // console.log(data.wonColony)
            }).then(function(data){
              colonies.find({_id: {$in: [data.wonColony] }}, function(err, data){
                var winner = data[0].name;
                // console.log(winner)
                res.render('createDuel', {winner: data[0].name})
              })
            })
          })



        })
     })
  })
})


module.exports = router;
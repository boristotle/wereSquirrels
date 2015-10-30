var db = require('monk')('localhost/wereSquirrels')

var wereSquirrels = db.get('weresquirrels');
var uniBears = db.get('unibears')
var colonies = db.get('colonies');
var duels = db.get('duels');


var uniBear1Id = uniBears.id();
var uniBear2Id = uniBears.id();
var uniBear3Id = uniBears.id();
var uniBear4Id = uniBears.id();
var uniBear5Id = uniBears.id();
var uniBear6Id = uniBears.id();
var uniBear7Id = uniBears.id();
var uniBear8Id = uniBears.id();


var wereSquirrel1Id = wereSquirrels.id();
var wereSquirrel2Id = wereSquirrels.id();
var wereSquirrel3Id = wereSquirrels.id();
var wereSquirrel4Id = wereSquirrels.id();
var wereSquirrel5Id = wereSquirrels.id();
var wereSquirrel6Id = wereSquirrels.id();
var wereSquirrel7Id = wereSquirrels.id();
var wereSquirrel8Id = wereSquirrels.id();

var colony1Id = colonies.id();
var colony2Id = colonies.id();
var colony3Id = colonies.id();
var colony4Id = colonies.id();

var duel1_2 = duels.id();
var duel1_3 = duels.id();
var duel1_4 = duels.id();
var duel2_3 = duels.id();
var duel2_4 = duels.id();
var duel3_4 = duels.id();


Promise.all([
  colonies.insert({name: 'Colony1', _id: colony1Id, honey: 1000, peanuts: 3000}),
  colonies.insert({name: 'Colony2', _id: colony2Id, honey: 850, peanuts: 2000}),
  colonies.insert({name: 'Colony3', _id: colony3Id, honey: 2000, peanuts: 2000}),
  colonies.insert({name: 'Colony4', _id: colony4Id, honey: 1100, peanuts: 1500}),
  ])


Promise.all([
  uniBears.insert({_id: uniBear1Id, name: 'UB1', honey: 300, colony: colony1Id, contractLength: 300}),
  uniBears.insert({_id: uniBear2Id, name: 'UB2', honey: 100, colony: colony1Id, contractLength: 100}),
  uniBears.insert({_id: uniBear3Id, name: 'UB3', honey: 500, colony: colony2Id, contractLength: 500}),
  uniBears.insert({_id: uniBear4Id, name: 'UB4', honey: 70, colony: colony2Id, contractLength: 70}),
  uniBears.insert({_id: uniBear5Id, name: 'UB5', honey: 365, colony: colony3Id, contractLength: 365}),
  uniBears.insert({_id: uniBear6Id, name: 'UB6', honey: 60, colony: colony3Id, contractLength: 60}),
  uniBears.insert({_id: uniBear7Id, name: 'UB7', honey: 1000, colony: colony4Id, contractLength: 1000}),
  uniBears.insert({_id: uniBear8Id, name: 'UB8', honey: 400, colony: colony4Id, contractLength: 400}),
  ])



Promise.all([
  wereSquirrels.insert({_id: wereSquirrel1Id, name: 'WS1', peanuts: 50, colony: colony1Id, contractLength: 50, duels: [{_id: duel1_2, garlic: 34, meat: 3},{_id: duel1_3, garlic: 22, meat: 0 },{_id: duel1_4, garlic: 100, meat: 10}]}),
  wereSquirrels.insert({_id: wereSquirrel2Id, name: 'WS2', peanuts: 95, colony: colony1Id, contractLength: 95, duels: [{_id: duel1_2, garlic: 22, meat: 4},{_id: duel1_3, garlic: 24, meat: 0},{_id: duel1_4, garlic: 76, meat: 14}]}),
  wereSquirrels.insert({_id: wereSquirrel3Id, name: 'WS3', peanuts: 150, colony: colony2Id, contractLength: 150, duels: [{_id: duel1_2, garlic: 19, meat: 8},{_id: duel2_3, garlic: 27, meat: 0},{_id: duel2_4, garlic: 99, meat: 6}]}),
  wereSquirrels.insert({_id: wereSquirrel4Id, name: 'WS4', peanuts: 20, colony: colony2Id, contractLength: 20, duels: [{_id: duel1_2, garlic: 4, meat: 2},{_id: duel2_3, garlic: 38, meat: 0},{_id: duel2_4, garlic: 88, meat: 12}]}),
  wereSquirrels.insert({_id: wereSquirrel5Id, name: 'WS5', peanuts: 115, colony: colony3Id, contractLength: 115, duels: [{_id: duel1_3, garlic: 23, meat: 1},{_id: duel2_3, garlic: 49, meat: 0 },{_id: duel3_4, garlic: 54, meat: 9}]}),
  wereSquirrels.insert({_id: wereSquirrel6Id, name: 'WS6', peanuts: 200, colony: colony3Id, contractLength: 200, duels: [{_id: duel1_3, garlic: 32, meat: 9},{_id: duel2_3, garlic: 25, meat: 0},{_id: duel3_4, garlic: 86, meat: 11}]}),
  wereSquirrels.insert({_id: wereSquirrel7Id, name: 'WS7', peanuts: 275, colony: colony4Id, contractLength: 275, duels: [{_id: duel1_4, garlic: 16, meat: 6},{_id: duel2_4, garlic: 15, meat: 0 },{_id: duel3_4, garlic: 98, meat: 4}]}),
  wereSquirrels.insert({_id: wereSquirrel8Id, name: 'WS8', peanuts: 20, colony: colony4Id, contractLength: 20, duels: [{_id: duel1_4, garlic: 12, meat: 6},{_id: duel2_4, garlic: 13, meat: 0 },{_id: duel3_4, garlic: 77, meat: 7}]}),
  ])

Promise.all([
  duels.insert({_id: duel1_2, wonColony: colony1Id, lostColony: colony2Id}),
  duels.insert({_id: duel1_3, wonColony: colony3Id, lostColony: colony1Id}),
  duels.insert({_id: duel1_4, wonColony: colony1Id, lostColony: colony4Id}),
  duels.insert({_id: duel2_3, wonColony: colony3Id, lostColony: colony2Id}),
  duels.insert({_id: duel2_4, wonColony: colony2Id, lostColony: colony4Id}),
  duels.insert({_id: duel3_4, wonColony: colony4Id, lostColony: colony3Id}),
  ])

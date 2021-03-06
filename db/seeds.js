const mongoose = require('mongoose');
const env = require('../config/env');
const Promise = require('bluebird');
mongoose.Promise = Promise;
mongoose.connect(env.db);
//const rp = require('request-promise');
//const crypto = require('crypto');
const api = require('marvel-api');

// require character.js model
const Character = require('../models/character');
// drop collection of characters
Character.collection.drop();


const Comic = require('../models/comic');
Comic.collection.drop();

const Video = require('../models/video');
Video.collection.drop();

// grabbing api keys
var marvel = api.createClient({
  publicKey: '20d83b857dd7975d3714f224fb445b28',
  privateKey: '55029630f5701122fec81d07d7045d8bf4464694'
  // publicKey: process.env.MARVEL_API_PUBLIC,
  // privateKey: process.env.MARVEL_API_PRIVATE
});

// find all characters from Marvel site
marvel
.characters
.findAll(100)
// .findAll(100)
.then(characters => {
  // loop through characters name/image/description
  // log the data you recieve from site
  return Promise.map(characters.data, (character) => {
    return Character.create({
      name: character.name,
      description: character.description,
      image: `${character.thumbnail.path}/portrait_xlarge.jpg` || 'no image'
    });
  });
})
.then(characters => {
  console.log(`${characters.length} characters were created`);

  return marvel.comics.findAll(100);
})
.then(comics => {
  return Promise.map(comics.data, (comic) => {
    return Comic.create({
      title: comic.title,
      issueNumber: comic.issueNumber,
      description: comic.description,
      image: comic.thumbnail.path || 'no image'
    });
  });
})
.then(comics => {
  console.log(`${comics.length} comics were created`);
  return Video.create([
    {
      name: 'Guardians of the Galaxy trailer 2',
      video: 'jQFIu9InG7Q'
    },
    {
      name: 'Hulk vs Thor',
      video: 'JL2dxGQhtbE'
    },
    {
      name: 'Captain America vs Iron Man',
      video: 'zG0VMbcwshA'
    },
    {
      name: 'Deadpool',
      video: 'tLmStxxzhkI'
    },
    {
      name: 'Captain America Civil War | AIRPORT BATTLE - Fight Scenes HD Marvel',
      video: 'l_-Bn9-zY-Q'
    }
  ])
  .then(videos => {
    console.log(`${videos.length} were created`);
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    // close connection to stop adding stuff
    mongoose.connection.close();
  });
});

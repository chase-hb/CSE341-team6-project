const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');
dotenv.config();


async function getAll (req, res, next){
  try{
  
  const dbQuery = await mongodb.getDb().db().collection('tvShows').find();

  console.log("--Getting all Tv Shows--")
  res.setHeader('Content-Type', 'application/json');
  const resultArray = await dbQuery.toArray();

  res.status(200).json(resultArray);

} catch (e){
  res.status(500).json(e);
  }

}



async function getSingle (req, res, next){

  try{

    const showId = new ObjectId(req.params.id);
    const dbQuery = await mongodb.getDb().db().collection('tvShows').find({ _id: showId });

    
    //console.log( await result.toArray() );

    console.log("--Getting one Tv Show--")
    res.setHeader('Content-Type', 'application/json');
    const resultArray = await dbQuery.toArray();
    res.status(200).json(resultArray[0]);

  } catch (e){
  res.status(500).json(e);
  }

  // await responseHandler(dbQuery, res);

}

async function addShow (req, res, next){

  console.log("--Creating Tv Show Item--")
  try{
    const dbQuery = await mongodb.getDb().db().collection('tvShows').insertOne({
      title: req.body.title,
      seasonReleaseYear: req.body.seasonReleaseYear,
      rating: req.body.rating,
      season: req.body.season,
      genre: req.body.genre
    });


    if (dbQuery.acknowledged){
      console.log("Tv Show with ID: " + dbQuery.insertedId + " added.")
      res.status(201).json(dbQuery)
    } else{
      console.log("ERROR! Tv Show creation failed.")
      res.status(500).json(dbQuery)
    }

  } catch (e){
  res.status(400).json(e);
  }

}



async function updateShow (req, res, next){

  
  console.log("--Updating Tv Show '" + showId + "' --")
  try{
    const showId = new ObjectId(req.params.id);
    const dbQuery = await mongodb.getDb().db().collection('tvShows').replaceOne({ _id: showId }, {
      title: req.body.title,
      seasonReleaseYear: req.body.seasonReleaseYear,
      rating: req.body.rating,
      season: req.body.season,
      genre: req.body.genre
    });

    if (dbQuery.acknowledged){
      if(dbQuery.matchedCount > 0){
        console.log("Found " + dbQuery.matchedCount + " matches.");
        console.log(dbQuery.modifiedCount + " item(s) modified.")
        res.status(201).json(dbQuery)
      } else{
        console.log("Sorry, no matches found for ID: " + showId);
        console.log("No modifications made.")
        res.status(204).send();
      }
      
    } else{
      console.log("ERROR! Tv Show update failed.")
      res.status(500).json(dbQuery)
    }

  } catch (e){
  res.status(400).json(e);
  }
  
  

}


async function deleteShow (req, res, next){

  try{

    const showId = new ObjectId(req.params.id);
    const dbQuery = await mongodb.getDb().db().collection('tvShows').deleteOne({ _id: showId }, true);

    console.log("--Deleting Tv Show Item '" + showId + "' --");

    if (dbQuery.deletedCount > 0){
      console.log(dbQuery.deletedCount + " item(s) removed");
      res.status(204).send();
    } else if (dbQuery.acknowledged){
      console.log("ERROR! Delete process did not succeed. Maybe that ID doesn't exist?");
      res.status(400).json(dbQuery);
    } else{
      console.log("ERROR! Delete process did not succeed.");
      res.status(500).json(dbQuery);
    }

  } catch (e){
  res.status(500).json(e);
  }

}

module.exports = { getAll, getSingle, addShow, updateShow, deleteShow};


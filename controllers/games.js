const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');
dotenv.config();


async function getAll (req, res, next){
  try{
  
  const dbQuery = await mongodb.getDb().db("videoRentals").collection("videoGames").find();

  console.log("--Getting all Video Games--")
  res.setHeader('Content-Type', 'application/json');
  const resultArray = await dbQuery.toArray();

  res.status(200).json(resultArray);

} catch (e){
  res.status(500).json(e);
  }

}



async function getSingle (req, res, next){

  try{

    const gameId = new ObjectId(req.params.id);
    const dbQuery = await mongodb.getDb().db("videoRentals").collection("videoGames").find({ _id: gameId });

    
    //console.log( await result.toArray() );

    console.log("--Getting one Video Game--")
    res.setHeader('Content-Type', 'application/json');
    const resultArray = await dbQuery.toArray();
    res.status(200).json(resultArray[0]);

  } catch (e){
  res.status(500).json(e);
  }

  // await responseHandler(dbQuery, res);

}

async function addGame (req, res, next){

  console.log("--Creating Video Game Item --")
  try{
    const dbQuery = await mongodb.getDb().db("videoRentals").collection("videoGames").insertOne({
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      platform: req.body.platform,
      rating: req.body.rating,
      multiplayer: req.body.multiplayer,
      genre: req.body.genre
    });


    if (dbQuery.acknowledged){
      console.log("Video Game with ID: " + dbQuery.insertedId + " added.")
      res.status(201).json(dbQuery)
    } else{
      console.log("ERROR! Video Game creation failed.")
      res.status(500).json(dbQuery)
    }

  } catch (e){
  res.status(400).json(e);
  }

}



async function updateGame (req, res, next){

  
  console.log("--Updating Game '" + gameId + "' --")
  try{
    const gameId = new ObjectId(req.params.id);
    const dbQuery = await mongodb.getDb().db("videoRentals").collection("videoGames").replaceOne({ _id: gameId }, {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      platform: req.body.platform,
      rating: req.body.rating,
      multiplayer: req.body.multiplayer,
      genre: req.body.genre
    });

    if (dbQuery.acknowledged){
      if(dbQuery.matchedCount > 0){
        console.log("Found " + dbQuery.matchedCount + " matches.");
        console.log(dbQuery.modifiedCount + " item(s) modified.")
        res.status(201).json(dbQuery)
      } else{
        console.log("Sorry, no matches found for ID: " + gameId);
        console.log("No modifications made.")
        res.status(204).send();
      }
      
    } else{
      console.log("ERROR! Video Game update failed.")
      res.status(500).json(dbQuery)
    }

  } catch (e){
  res.status(400).json(e);
  }
  
  

}


async function deleteGame (req, res, next){

  try{

    const gameId = new ObjectId(req.params.id);
    const dbQuery = await mongodb.getDb().db("videoRentals").collection("videoGames").deleteOne({ _id: gameId }, true);

    console.log("--Deleting Video Game '" + gameId + "' --");

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

module.exports = { getAll, getSingle, addGame, updateGame, deleteGame};


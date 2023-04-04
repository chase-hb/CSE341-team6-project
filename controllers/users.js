const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');
dotenv.config();


async function getAll (req, res, next){
  try{
  
  const dbQuery = await mongodb.getDb().db("videoRentals").collection('users').find();

  console.log("--Getting all Users--")
  res.setHeader('Content-Type', 'application/json');
  const resultArray = await dbQuery.toArray();

  res.status(200).json(resultArray);

} catch (e){
  res.status(500).json(e);
  }

}



async function getSingle (req, res, next){

  try{

    const userId = new ObjectId(req.params.id);
    const dbQuery = await mongodb.getDb().db("videoRentals").collection('users').find({ _id: userId });

    
    //console.log( await result.toArray() );

    console.log("--Getting one User--")
    res.setHeader('Content-Type', 'application/json');
    const resultArray = await dbQuery.toArray();
    res.status(200).json(resultArray[0]);

  } catch (e){
  res.status(500).json(e);
  }

  // await responseHandler(dbQuery, res);

}

async function addUser (req, res, next){

  console.log("--Creating User--")
  try{
    const dbQuery = await mongodb.getDb().db("videoRentals").collection('users').insertOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username
    });


    if (dbQuery.acknowledged){
      console.log("User with ID: " + dbQuery.insertedId + " added.")
      res.status(201).json(dbQuery)
    } else{
      console.log("ERROR! User creation failed.")
      res.status(500).json(dbQuery)
    }

  } catch (e){
  res.status(400).json(e);
  }

}



async function updateUser (req, res, next){

  
  console.log("--Updating Tv Show '" + showId + "' --")
  try{
    const userId = new ObjectId(req.params.id);
    const dbQuery = await mongodb.getDb().db("videoRentals").collection('users').replaceOne({ _id: userId }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username
    });

    if (dbQuery.acknowledged){
      if(dbQuery.matchedCount > 0){
        console.log("Found " + dbQuery.matchedCount + " matches.");
        console.log(dbQuery.modifiedCount + " item(s) modified.")
        res.status(201).json(dbQuery)
      } else{
        console.log("Sorry, no matches found for ID: " + userId);
        console.log("No modifications made.")
        res.status(204).send();
      }
      
    } else{
      console.log("ERROR! User update failed.")
      res.status(500).json(dbQuery)
    }

  } catch (e){
  res.status(400).json(e);
  }
  
  

}


async function deleteUser (req, res, next){

  try{

    const userId = new ObjectId(req.params.id);
    const dbQuery = await mongodb.getDb().db("videoRentals").collection('users').deleteOne({ _id: userId }, true);

    console.log("--Deleting User '" + userId + "' --");

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

module.exports = { getAll, getSingle, addUser, updateUser, deleteUser};
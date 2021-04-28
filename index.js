const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 5055;

// console.log(process.env.DB_USER);

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rmnsf.mongodb.net/${process.env.DB_Name} ${process.env.DB_Name1}?retryWrites=true&w=majority`;
//console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log('Connection error' , err);
  const eventCollection = client.db("gsmBdWebsite").collection("mobiles");
  const eventCollection2 = client.db("gsmInfo").collection("person");




app.get("/products" , (req , res)=>{
  eventCollection.find()
  .toArray((err , items)=>{
    res.send(items)
    //console.log( 'From database -', items);
  })
})


////////////////////////////////////// products wirh key/////////////////////


app.get("/products/:id" , (req , res)=>{
  eventCollection.find({id : req.params.id})
  .toArray((err , items)=>{
    res.send(items[0])
    //console.log( 'From database -', items);
  })
})



////////////////////////////////////// products wirh key ends /////////////////////


 
app.post('/Admin' , (req, res) => {

  const newEvent = req.body;
  console.log('adding new event' , newEvent);
  eventCollection.insertOne(newEvent)
  .then(result => {
      console.log("inserted count",result.insertedCount);
      res.send(result.insertedCount > 0)
  })
})



app.post ('/Cart' , (req , res)=>{
   const newBooking = req.body;
   eventCollection2.insertOne(newBooking)
   .then(result => {
     res.send(result.insertedCount > 0);
   })
   console.log(newBooking);
})

app.get('/Orderd' , (req,res)=>{
  //console.log(req.query.email);
  eventCollection2.find({email: req.query.email})
  .toArray((err , documents)=>{
    res.send(documents)
  })
})





});










app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
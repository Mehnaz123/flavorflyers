const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const connectToMongoDB =require("./Db")
const PORT = process.env.PORT || 5000;
connectToMongoDB();
app.use(express.json())
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.post('/post', function(req, res) {

  res.send(req.body);
  // Do something with the user data, e.g., save to database
  

});

app.use('/api',require('./routes/login'))
app.use('/api',require('./routes/creatUser'))
app.use('/api',require('./routes/displayData'))
app.get('/api', function(req, res){
  res.send("hellow mj");
});


app.listen(PORT , ()=>{
  console.log(`listening on port ${PORT}`)
})
  

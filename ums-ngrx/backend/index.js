const express = require('express')
const monogoDB = require('./config/mongoose')
const userRoute =require('./routes/userRoute')
const adminRoute=require('./routes/adminRoute')
const cors = require('cors')
const cookieParser= require('cookie-parser')
const path =require('path')
const app = express()

console.log('backend running..................');

app.use(express.static(path.join(__dirname,'public')))
app.use(cors({
    credentials:true,
    origin:['http://localhost:4200']
}))
app.use(cookieParser())
app.use(express.json())
app.use('/api/admin',adminRoute)
app.use('/api/user',userRoute)

monogoDB.then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
  });

const port = 3000; // Change the port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

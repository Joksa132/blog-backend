const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();

const app = express();

mongoose.set('strictQuery', false)
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.DB_String);
  console.log("Connected to database")
}

const userRoute = require('./routes/users')
const articleRoute = require('./routes/articles')

app.use(cors())
app.use(express.json());

app.use('/user', userRoute);
app.use('/article', articleRoute)

app.listen(process.env.PORT, () => console.log("Server started on port 4000"));
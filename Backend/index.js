const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
connectToMongo();


const app = express()
const port = 5000 

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notesall', require('./routes/notesall'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
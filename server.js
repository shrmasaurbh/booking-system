const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const seatRoute = require('./routes/seats');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', seatRoute)

http.listen(port, ()=>{
    console.log(`Server is connecting on http://localhost:${port}`);
});
const express = require('express');
const cors = require('cors');
const port = 8080;
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//imports
const userRoute = require('./Router/userRoute');
const { establishConnection, getConnection } = require('./Database/index');



app.listen(port, () => {
    console.log("Up and Running");
})
establishConnection();


app.use('/', userRoute);






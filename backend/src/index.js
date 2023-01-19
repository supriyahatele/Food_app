const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');
const cors = require('cors');
const app = express();

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Orign", "http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     )
//     next();
// });
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://cluster0.6evf0.mongodb.net/?retryWrites=true&w=majority", {
        dBname: 'Food_db',
        user: 'Supriya09',
        pass: 'Supriya@1998',
        useNewUrlParser: true
    })
.then(() => console.log("MongoDb is connect....✔✔"))
.catch(err => console.log(err));

app.use('/api/v1', route);

const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log(`Server is running on Port: ${port}`);
});
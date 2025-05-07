const express = require('express');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoute');
const cors = require('cors'); 




const app = express();


app.use(cors({origin: 'http://localhost:3000',
    credentials: true}));
app.use(express.json());

app.use("/api/user", userRoutes);
//test route
app.get('/', (req, res) =>{
    res.send('Hello World!');
})

connectDB();

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})


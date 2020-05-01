const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Track')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requiredAuth')

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:Goethe1992@cluster0-pk9im.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
}) 
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Hi there! You email is ${req.user.email}`);
});

app.listen(3000 , () => {
    console.log('Listening on port 3000')
});
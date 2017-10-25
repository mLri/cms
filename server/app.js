const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// config file
const db_config = require('./configs/' + process.env.NODE_ENV + '/database')

// connect database
mongoose.connect(`mongodb://${ db_config.BASE_URL }/${ db_config.DB_NAME }`, { useMongoClient: true }, 
    function(err){
        if(err) throw err
        console.log('connect database success...')
    }
);
mongoose.Promise = global.Promise;

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

const port = process.env.PORT || 3100

// use router
app.use('/api/users', require('./routes/user'))

app.listen(port, () => 
    console.log('server is running on port : ' + port))
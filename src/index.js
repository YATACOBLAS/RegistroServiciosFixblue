const express = require('express');
const myConnection = require('express-myconnection');
const mysql= require('mysql'); 
const morgan = require('morgan');
const app=express();

//Settings
 app.set('port',process.env.PORT||5000);
//Middlewars
//procesan antes que lleguen las url
    app.use(morgan('dev'));
    app.use(express.urlencoded({
        extended:false
    }));
    app.use(express.json());
//mysql 

app.use(myConnection(mysql,{
    connectionLimit:50,
    host:'--confidential',
    user:'--confidential',
    password:'--confidential--',
    port:3306  ,
    database:'--confidential--'
 },'single'));
 
//Routes
app.use('/api/tasks',require('./routes/peticionesBD'));
//app.use('/',require('./render-vue-app.js'));
//history
const history = require('connect-history-api-fallback');
//Static
app.use(history());

app.use(express.static(__dirname+ '/public'));

//app.use(express.static(__dirname+ '../dist'));
//server listener
app.listen(app.get('port'),  ()=>{
    console.log('Port ',app.get('port'));
})
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const {environment} = require('./config')
const app = express();
app.use(cookieParser());

const routes = require('./routes');



app.set("view engine", "pug");
app.use(express.urlencoded({extended: false}))

app.use(morgan("dev"));
app.use(routes);

//console.log("hi")

app.use((req, res, next) => {
    const err = new Error('404: The requests page couldn\'t be found.');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) =>{
    if (environment === 'development') {
        console.error(err);
    }
    next(err);
});

app.use((err, req, res, next)=>{
    if(err.status === 404){
        res.status = 404;
        res.render("page-not-found", {
          title: "Page Not Found",
        });
    } else  next(err);
});

app.use((err, req, res, next) =>{
    err.status = 500;
    res.status = 500;
    if (environment !== 'production') {
        res.render("error", {
          title: "Server Error",
          stack: err.stack,
          pre: err.pre,
        });
    }
})


module.exports = app;
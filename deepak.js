const http=require('http');
const express=require('express');
const parser=require('body-parser');
const funcs = require('./generator');


var app=express();
var port=8888;


app.use((req,resp,next)=>{
    resp.setHeader('Access-Control-Allow-Origin',"*");
    resp.setHeader('Access-Control-Allow-Headers',"Origin,X-Requested-With, Content-Type,Accept");
    resp.setHeader('Access-Control-Allow-Methods',"GET,POST,PATCH, DELETE, OPTIONS");
    next();
});

app.use(parser.json());

app.set('port',port);
const server=http.createServer(app);

server.listen(port,()=>{
    console.log(`NovaMIS Server started on port ${port}`);
});

app.get('/api/user/authenticate',(req,resp,next)=>{

    funcs.authenticateUser(req,resp);
});

app.get('/api/roles',(req,resp,next)=>{

    funcs.getRoles(req,resp);
});

app.get('/api/status',(req,resp,next)=>{

    funcs.getStatus(req,resp);
});

app.post('/api/saveGeneratorDetails',(req,resp,next)=>{

    funcs.saveGeneratorDetails(req,resp);
});

app.get('/api/generatorDetails',(req,resp,next)=>{

    funcs.getGeneratorDetails(req,resp);
});

app.get('/api/getGeneratorById/:id',(req,resp,next)=>{

    funcs.getGeneratorById(req,resp);
});

app.post('/api/updateGenerator',(req,resp,next)=>{

    funcs.updateGenerator(req,resp);
});

module.exports={app};

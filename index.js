const http=require('http');
const express=require('express');
const parser=require('body-parser');
const status = require('./funcs/libraries');
const funcs = require('./generator');
const turbine = require('./turbine');
const blade = require('./blade');
const converter = require('./converter');
const hub = require('./hub');
const yaw = require('./yaw');
const ccb = require('./ccb');
const pitch = require('./pitch');
const spinner = require('./spinner');

const toppanel = require('./toppanel');
const hydraulics = require('./hydraulics');

var app=express();
var port=9999;


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

    // funcs.getStatus(req,resp);
    status.getStatus(req,resp);
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

app.post('/api/saveTurbine',(req,resp,next)=>{
  turbine.saveTurbine(req,resp);
});

app.get('/api/turbineDetails',(req,resp,next)=>{

    turbine.getTurbineDetails(req,resp);
});

app.post('/api/updateTurbineById/:id',(req,resp,next)=>{

    turbine.updateTurbineById(req,resp);
});

app.get('/api/turbineById/:id',(req,resp,next)=>{

    turbine.getTurbineById(req,resp);
});

app.post('/api/saveBlade',(req,resp,next)=>{
  blade.saveBlade(req,resp);
});

app.get('/api/getBladeDetails',(req,resp,next)=>{

    blade.getBladeDetails(req,resp);
});

app.post('/api/updateBlade/:id',(req,resp,next)=>{

    blade.updateBlade(req,resp);
});

app.get('/api/getBladeById/:id',(req,resp,next)=>{

    blade.getBladeById(req,resp);
});

app.post('/api/saveConverter',(req,resp,next)=>{
  converter.saveConverter(req,resp);
});


app.post('/api/saveCcb',(req,resp,next)=>{
  ccb.saveCcb(req,resp);
});

app.get('/api/getCcbDetails',(req,resp,next)=>{

      ccb.getCcbDetails(req,resp);
});

app.post('/api/updateCcb/:id',(req,resp,next)=>{

    ccb.updateCcb(req,resp);
});

app.get('/api/getCcbById/:id',(req,resp,next)=>{

    ccb.getCcbById(req,resp);
});

app.get('/api/getConverterDetails',(req,resp,next)=>{

      converter.getConverterDetails(req,resp);
});

app.post('/api/updateConverter/:id',(req,resp,next)=>{

    converter.updateConverter(req,resp);
});

app.get('/api/getConverterById/:id',(req,resp,next)=>{

    converter.getConverterById(req,resp);
});


app.post('/api/saveHub',(req,resp,next)=>{
  hub.saveHub(req,resp);
});

app.get('/api/getHubDetails',(req,resp,next)=>{

      hub.getHubDetails(req,resp);
});

app.post('/api/updateHub/:id',(req,resp,next)=>{

    hub.updateHub(req,resp);
});

app.get('/api/getHubById/:id',(req,resp,next)=>{

    hub.getHubById(req,resp);
});


app.post('/api/saveYaw',(req,resp,next)=>{
  yaw.saveYaw(req,resp);
});

app.get('/api/getYawDetails',(req,resp,next)=>{

      yaw.getYawDetails(req,resp);
});

app.post('/api/updateYaw/:id',(req,resp,next)=>{

    yaw.updateYaw(req,resp);
});

app.get('/api/getYawById/:id',(req,resp,next)=>{

    yaw.getYawById(req,resp);
});



app.post('/api/savePitch',(req,resp,next)=>{
  pitch.savePitch(req,resp);
});

app.get('/api/getPitchDetails',(req,resp,next)=>{

      pitch.getPitchDetails(req,resp);
});

app.post('/api/updatePitch/:id',(req,resp,next)=>{

    pitch.updatePitch(req,resp);
});

app.get('/api/getPitchById/:id',(req,resp,next)=>{

    pitch.getPitchById(req,resp);
});


app.post('/api/saveTopPanel',(req,resp,next)=>{
  toppanel.saveTopPanel(req,resp);
});

app.get('/api/getTopPanelDetails',(req,resp,next)=>{

      toppanel.getTopPanelDetails(req,resp);
});

app.post('/api/updateTopPanel/:id',(req,resp,next)=>{

    toppanel.updateTopPanel(req,resp);
});

app.get('/api/getTopPanelById/:id',(req,resp,next)=>{

    toppanel.getTopPanelById(req,resp);
});



app.post('/api/saveSpinner',(req,resp,next)=>{
  hydraulics.saveHydraulics(req,resp);
});

app.get('/api/getHydraulicsDetails',(req,resp,next)=>{

      hydraulics.getHydraulicsDetails(req,resp);
});

app.post('/api/updateHydraulics/:id',(req,resp,next)=>{

    hydraulics.updateHydraulics(req,resp);
});

app.get('/api/getHydraulicsById/:id',(req,resp,next)=>{

    hydraulics.getHydraulicsById(req,resp);
});



app.post('/api/saveSpinner',(req,resp,next)=>{
  spinner.saveSpinner(req,resp);
});

app.get('/api/getSpinnerDetails',(req,resp,next)=>{

      spinner.getSpinnerDetails(req,resp);
});

app.post('/api/updateSpinner/:id',(req,resp,next)=>{

    spinner.updateSpinner(req,resp);
});

app.get('/api/getSpinnerById/:id',(req,resp,next)=>{

    spinner.getSpinnerById(req,resp);
});

module.exports={app};

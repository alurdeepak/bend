  const mysql = require('mysql2');
var log4node = require('log4node');
log = new log4node.Log4Node({level: 'warning', file: 'test.log'});
const funcs = require('./funcs/libraries');


var connection=funcs.getDBConnection();
connection.connect();


var getStatus=(req,resp)=>{
  var connection=funcs.getDBConnection();
  connection.connect();
  connection.query('SELECT id,sname from mas_status', function (error, results, fields) {


      if (error){
      log.warning("error caught in DB query");
      }
        resp.status(200).json({
          status: "SUCCESS",
          message:"NIL",
          data:results
      });
  });

  connection.end();
}//getStatus

var saveTurbine=(req,resp)=>{
//  var connection = funcs.getDBConnection();
  var connection = funcs.getDBConnection({multipleStatements: true});
  connection.connect();
  //connection.query('SELECT ?; SELECT ?', [1, 2], function(err, results)
  var site_id = req.body.site_id;
  var loc_num =  req.body.loc_num ;
  var comm_date = req.body.comm_date;
  var turbine_type = req.body.turbine_type;
  var feeder_num = req.body.feeder_num;
  var pooling_ss =  req.body.pooling_ss ;
  var hub_height = req.body.hub_height;
  var nacelle_id = req.body.nacelle_id;
  var status = req.body.status;
  var mas_turbine_id;
  console.log('hub_height'+hub_height);
   var mas_tur_sql = `insert into mas_turbines (site_id_fk,loc_no,commissioning_date) values (${site_id},${loc_num},${comm_date})`;

    connection.query(mas_tur_sql ,  function(err, results) {
  //  console.log('inserted id == '+ results.insertId);
     mas_turbine_id = results.insertId;
    var dat_turbine_types_sql= `insert into dat_turbine_types (turbine_type,feeder_number,Pooling_ss,hub_height,nacelle_id,status_id_fk,turbine_id_fk) values ('${turbine_type}',${feeder_num},'${pooling_ss}',${hub_height},${nacelle_id},${status},${mas_turbine_id})`;

if (err) {
  resp.json({
    status: "Error",
    message:"Not Saved"
});

} else {
  connection.query( dat_turbine_types_sql,  function(err, results){
  resp.status(200).json({
          status: "SUCCESS",
          message:"saved successfully",
          data:results
      });
        });
}

});
} //saveTurbine

var getTurbineDetails=(req,resp)=>{
  var connection=funcs.getDBConnection();
  connection.connect();

  connection.query('SELECT t1.id,t1.site_id_fk,t1.loc_no,t1.commissioning_date,t2.turbine_type,t2.feeder_number,t2.Pooling_ss,t2.hub_height,t2.nacelle_id,t2.status_id_fk,t2.turbine_id_fk,t3.id,t3.sname FROM mas_turbines t1 inner join dat_turbine_types t2 on t1.id = t2.turbine_id_fk inner join mas_status t3 on t2.status_id_fk = t3.id', function (error, results, fields) {


      if (error){
          log.warning("error caught in DB query");
      }
        resp.status(200).json({
          status: "SUCCESS",
          message:"NIL",
          data:results
      });
  });

  connection.end();
}//getTurbineDetails

var getTurbineById=(req,resp)=>{
  var connection=funcs.getDBConnection();
  connection.connect();

var turbine_id = req.params.id;
console.log('turbine id in getByid'+turbine_id);
var get_By_Id_Sql = `select t1.id ,t1.site_id_fk,t1.commissioning_date,t3.sname FROM mas_turbines t1 inner join dat_turbine_types t2 on t1.id = t2.turbine_id_fk inner join mas_status t3 on t2.status_id_fk=t3.id  WHERE t1.id =  ${turbine_id}`;
  connection.query( get_By_Id_Sql,  function(err, results){
console.log('result by id'+results);
      if (err){
    console.log("Error caught " + err);
          log.warning("error caught in DB query"+err);
      }
      else {
        resp.status(200).json({
          status: "SUCCESS",
          message:"data fetched successfully",
          data:results
      });
      }

  });

  connection.end();
}//getTurbineById

var updateGenerator=(req,resp)=>{
  var site_id = req.body.site_id;
  var loc_num =  req.body.loc_num ;
  var comm_date = req.body.comm_date;
  var turbine_type = req.body.turbine_type;
  var feeder_num = req.body.feeder_num;
  var pooling_ss =  req.body.pooling_ss ;
  var hub_height = req.body.hub_height;
  var nacelle_id = req.body.nacelle_id;
  var status = req.body.status;
  var turbine_id_fk = req.body.turbine_id_fk;
   var turbine_id = req.params.id;
  //connection.query(`UPDATE dat_generators SET site_id = '${site_id}' , loc_num = '${loc_num}' , comm_date= '${comm_date}' , turbine_type= '${turbine_type}' , feeder_num= '${feeder_num}' , pooling_ss= '${pooling_ss} , hub_height= '${hub_height} , nacelle_id= '${nacelle_id} , status= '${status}' WHERE id =  ${gen_Id} ` , function (error, results, fields) {

  var mas_tur_sql = `UPDATE mas_turbines set site_id = '${site_id}' , loc_num = '${loc_num}' , comm_date= '${comm_date} WHERE id =  ${turbine_id}`;

     connection.query(mas_tur_sql ,  function(err, results) {
   //  console.log('inserted id == '+ results.insertId);
      mas_turbine_id = results.insertId;
     var dat_turbine_types_sql= `UPDATE  dat_turbine_types set turbine_type= '${turbine_type}' , feeder_num= '${feeder_num}' , pooling_ss= '${pooling_ss} , hub_height= '${hub_height} , nacelle_id= '${nacelle_id} , status= '${status}' WHERE id =  ${turbine_id}`;

   if (err) {
   resp.json({
     status: "Error",
     message:"Not Saved"
   });

   } else {
   connection.query( dat_turbine_types_sql,  function(err, results){
   resp.status(200).json({
           status: "SUCCESS",
           message:"saved successfully",
           data:results
       });
         });
   }

   });
   } //updateGenerator

module.exports={getStatus,saveTurbine,getTurbineDetails, updateGenerator, getTurbineById};

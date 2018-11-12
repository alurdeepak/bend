const mysql = require('mysql2');
var log4node = require('log4node');
log = new log4node.Log4Node({level: 'warning', file: 'test.log'});
const funcs = require('./funcs/libraries');


var connection=funcs.getDBConnection();
connection.connect();



var saveBlade=(req,resp)=>{
var connection = funcs.getDBConnection({multipleStatements: true});
connection.connect();
var blade_length = req.body.blade_length;
var make =  req.body.make ;
var set_no = req.body.set_no;
var A_sr_no = req.body.A_sr_no;
var B_sr_no = req.body.B_sr_no;
var C_sr_no =  req.body.C_sr_no ;
var created_on = funcs.getCurrentDateandTime();
var status = req.body.status;


 var save_blade_qry = `INSERT INTO dat_blades(blade_length , make, set_no, A_sr_no, B_sr_no, C_sr_no,created_on, status_id_fk ) VALUES (${blade_length} , '${make}', '${set_no}', '${A_sr_no}', '${B_sr_no}' , '${C_sr_no}', ${created_on} , ${status})`;

  connection.query(save_blade_qry ,  function(err, results) {

if (err) {
resp.json({
  status: "Error",
  message:"Not Saved"
});

} else {
        resp.status(200).json({
        status: "SUCCESS",
        message:"saved successfully",
        data:results
    });

}

});
} //saveBlade

var getBladeDetails=(req,resp)=>{
var connection=funcs.getDBConnection();
connection.connect();

connection.query('SELECT t1.id, t1.blade_length, t1.make, t1.A_sr_no, t1.B_sr_no, t1.C_sr_no,t2.sname from dat_blades t1 inner join mas_status t2 on t1.status_id_fk = t2.id', function (error, results, fields) {

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
}//getBladeDetails

var getBladeById = (req,resp)=>{
  var connection=funcs.getDBConnection();
  connection.connect();

  var blade_Id = req.params.id;
var get_By_Id_qry = `SELECT t1.id, t1.blade_length, t1.make, t1.A_sr_no, t1.B_sr_no, t1.C_sr_no,t2.sname from dat_blades t1 inner join mas_status t2 on t1.status_id_fk = t2.id where t1.id =  ${blade_Id}`;

  connection.query( get_By_Id_qry,  function(err, results){

      if (err){
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

  }//getBladeById

var updateBlade=(req,resp)=>{
  var blade_length = req.body.blade_length;
  var make =  req.body.make ;
  var set_no = req.body.set_no;
  var A_sr_no = req.body.A_sr_no;
  var B_sr_no = req.body.B_sr_no;
  var C_sr_no =  req.body.C_sr_no ;
  var status = req.body.status;
  var updated_on = funcs.getCurrentDateandTime();
  var blade_Id = req.body.id;

var update_blade_qry = `UPDATE dat_blades set blade_length = '${blade_length}' , make = '${make}' , set_no= '${set_no},A_sr_no='${A_sr_no}' , B_sr_no = '${B_sr_no}' , C_sr_no= '${C_sr_no}, updated_on= '${updated_on}, status= '${status} WHERE id =  ${blade_Id}`;
 connection.query(update_blade_qry ,  function(err, results) {
 if (err) {
 resp.json({
   status: "Error",
   message:"Not Saved"
 });

 } else {
 connection.query( update_blade_qry,  function(err, results){
 resp.status(200).json({
         status: "SUCCESS",
         message:"saved successfully",
         data:results
     });
       });
 }

 });
 } //updateBlade

module.exports={saveBlade,getBladeDetails, getBladeById, updateBlade};

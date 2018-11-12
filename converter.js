const mysql = require('mysql2');
var log4node = require('log4node');
log = new log4node.Log4Node({level: 'warning', file: 'test.log'});
const funcs = require('./funcs/libraries');


var connection=funcs.getDBConnection();
connection.connect();



var saveConverter=(req,resp)=>{
var connection = funcs.getDBConnection({multipleStatements: true});
connection.connect();
var top_converter_make = req.body.top_converter_make;
var top_converter_sr_no =  req.body.top_converter_sr_no ;
var top_converter_ACB_make = req.body.top_converter_ACB_make;
var top_converter_ACB_sr_no = req.body.top_converter_ACB_sr_no;
var top_converter_step_down_trnasformer_make = req.body.top_converter_step_down_trnasformer_make;
var top_converter_step_down_trnasformer_sr_no =  req.body.top_converter_step_down_trnasformer_sr_no ;
var created_on = funcs.getCurrentDateandTime();
var status = req.body.status;


 var save_converter_qry = `INSERT INTO top_converter(top_converter_make , top_converter_sr_no, top_converter_ACB_make, top_converter_ACB_sr_no, top_converter_step_down_trnasformer_make, top_converter_step_down_trnasformer_sr_no,created_on, status_id_fk ) VALUES (${top_converter_make} , ${top_converter_sr_no}, '${top_converter_ACB_make}', '${top_converter_ACB_sr_no}', '${top_converter_step_down_trnasformer_make}' , '${top_converter_step_down_trnasformer_sr_no}', '${created_on}' , ${status})`;
console.log(save_converter_qry);
  connection.query(save_converter_qry ,  function(err, results) {

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
} //saveconverter

var getConverterDetails=(req,resp)=>{
var connection=funcs.getDBConnection();
connection.connect();

connection.query('SELECT t1.id,t1.top_converter_make,t1.top_converter_sr_no,t1.top_converter_ACB_make,t1.top_converter_ACB_sr_no,t1.top_converter_step_down_trnasformer_make,t1.top_converter_step_down_trnasformer_sr_no,t2.sname from top_converter t1 inner join mas_status t2 on t1.status_id_fk = t2.id', function (error, results, fields) {

  if (error){
        log.warning("error caught in DB query");
    }
    else
    {
      resp.status(200).json({
        status: "SUCCESS",
        message:"NIL",
        data:results
    });
    }

});

connection.end();
}//getBladeDetails

var getConverterById = (req,resp)=>{

  var connection=funcs.getDBConnection();
  connection.connect();

  var converter_Id = req.params.id;

var get_By_Id_qry = `SELECT t1.id,t1.top_converter_make,t1.top_converter_sr_no,t1.top_converter_ACB_make,t1.top_converter_ACB_sr_no,t1.top_converter_step_down_trnasformer_make,t1.top_converter_step_down_trnasformer_sr_no,t2.sname from top_converter t1 inner join mas_status t2 on t1.status_id_fk = t2.id where t1.id=  ${converter_Id}`;

  connection.query( get_By_Id_qry,  function(err, results){

      if (err){
        log.warning("error caught in DB query"+err);
      }
      else {
          console.log('returning result'+results);
        resp.status(200).json({
          status: "SUCCESS",
          message:"data fetched successfully",
          data:results
      });
      }
      });

  }//getConverterById

var updateConverter=(req,resp)=>{
  var top_converter_make = req.body.top_converter_make;
  var top_converter_sr_no =  req.body.top_converter_sr_no ;
  var top_converter_ACB_make = req.body.top_converter_ACB_make;
  var top_converter_ACB_sr_no = req.body.top_converter_ACB_sr_no;
  var top_converter_step_down_trnasformer_make = req.body.top_converter_step_down_trnasformer_make;
  var top_converter_step_down_trnasformer_sr_no =  req.body.top_converter_step_down_trnasformer_sr_no ;
  var updated_on = funcs.getCurrentDateandTime();
  var status = req.body.status;
var converter_Id = req.params.id;

var update_converter_qry = `UPDATE top_converter set top_converter_make = '${top_converter_make}' , top_converter_sr_no = '${top_converter_sr_no}' , top_converter_ACB_make= '${top_converter_ACB_make},top_converter_ACB_sr_no='${top_converter_ACB_sr_no}' , top_converter_step_down_trnasformer_make = '${top_converter_step_down_trnasformer_make}' , top_converter_step_down_trnasformer_sr_no= '${top_converter_step_down_trnasformer_sr_no}, updated_on= '${updated_on}, status= '${status} WHERE id =  ${converter_Id}`;
 connection.query(update_converter_qry ,  function(err, results) {
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
 } //updateConverter

module.exports={saveConverter,getConverterDetails, getConverterById, updateConverter};

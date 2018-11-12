const mysql = require('mysql2');
var log4node = require('log4node');
log = new log4node.Log4Node({level: 'warning', file: 'test.log'});
const funcs = require('./funcs/libraries');


var connection=funcs.getDBConnection();
connection.connect();



var saveCcb=(req,resp)=>{
var connection = funcs.getDBConnection({multipleStatements: true});
connection.connect();
var make = req.body.make;
var s1 =  req.body.s1 ;
var s2 = req.body.s2;
var s3 = req.body.s3;
var created_on = funcs.getCurrentDateandTime();
var status = req.body.status;


 var save_ccb_qry = `INSERT INTO dat_ccb(make , s1, s2, s3,created_on , status_id_fk ) VALUES (${make} , '${s1}', '${s2}','${s3}','${created_on}' , ${status})`;
console.log(save_ccb_qry);
  connection.query(save_ccb_qry ,  function(err, results) {

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
} //saveccb

var getCcbDetails=(req,resp)=>{
var connection=funcs.getDBConnection();
connection.connect();

connection.query('SELECT t1.id,t1.make,t1.s1,t1.s2,t1.s3,t2.sname from dat_ccb t1 inner join mas_status t2 on t1.status_id_fk = t2.id', function (error, results, fields) {

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
}//getCcbDetails

var getCcbById = (req,resp)=>{

  var connection=funcs.getDBConnection();
  connection.connect();

  var ccb_Id = req.params.id;

var get_By_Id_qry = `SELECT t1.id,t1.make,t1.s1,t1.s2,t1.s3,t2.sname from dat_ccb t1 inner join mas_status t2 on t1.status_id_fk = t2.id where t1.id=  ${ccb_Id}`;

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

  }//getCcbById

var updateCcb=(req,resp)=>{

  var make = req.body.make;
  var s1 =  req.body.s1 ;
  var s2 = req.body.s2;
  var s3 = req.body.s3;
  var updated_on = funcs.getCurrentDateandTime();
  var status = req.body.status;
   var ccb_Id = req.params.id;

var update_ccb_qry = `UPDATE dat_ccb set make = '${make}' , s1 = '${s1}' , s2= '${s2} ,s3='${s3}' , updated_on= '${updated_on}, status= '${status} WHERE id =  ${ccb_Id}`;
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
 } //update_ccb_qry

module.exports={saveCcb,getCcbDetails, getCcbById, updateCcb};

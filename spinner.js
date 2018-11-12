const mysql = require('mysql2');
var log4node = require('log4node');
log = new log4node.Log4Node({level: 'warning', file: 'test.log'});
const funcs = require('./funcs/libraries');


var connection=funcs.getDBConnection();
connection.connect();



var saveSpinner=(req,resp)=>{
    var connection = funcs.getDBConnection();
    connection.connect();
    var make = req.body.make;
    var sr_no =  req.body.sr_no;
    var created_on = funcs.getCurrentDateandTime();
    var status = req.body.status;


    var spinners_qry = `INSERT INTO dat_spinners(make , sr_no, created_on, status_id_fk ) VALUES ('${make}' , '${sr_no}', '${created_on}' , ${status})`;

    connection.query(spinners_qry ,  function(err, results) {

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
} //savespinner

var getSpinnerDetails=(req,resp)=>{
    var connection=funcs.getDBConnection();
    connection.connect();

    connection.query('SELECT t1.id,t1.make,t1.sr_no, t2.sname from dat_spinners t1 inner join mas_status t2 on t1.status_id_fk = t2.id', function (error, results, fields) {

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
}//getSpinnerDetails

var getSpinnerById = (req,resp)=>{

    var connection=funcs.getDBConnection();
    connection.connect();

    var spinners_Id = req.params.id;

    var get_By_Id_qry = `SELECT t1.id,t1.make,t1.sr_no, t2.sname from dat_spinners t1 inner join mas_status t2 on t1.status_id_fk = t2.id where t1.id=  ${spinners_Id}`;

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

}//getSpinnerById

var updateSpinner=(req,resp)=>{
    var make = req.body.make;
    var sr_no =  req.body.sr_no ;

    var updated_on = funcs.getCurrentDateandTime();
    var status = req.body.status;
    var spinners_Id = req.params.id;

    var update_spinners_qry = `UPDATE dat_spinners set make = '${make}' , sr_no = '${sr_no}' ,  updated_on= '${updated_on}, status= '${status} WHERE id =  ${spinners_Id}`;
    connection.query(update_spinners_qry ,  function(err, results) {
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
} //updateSpinner

module.exports={saveSpinner,getSpinnerDetails, getSpinnerById, updateSpinner};

const mysql = require('mysql2');
var log4node = require('log4node');
log = new log4node.Log4Node({level: 'warning', file: 'test.log'});
const funcs = require('./funcs/libraries');


var connection=funcs.getDBConnection();
connection.connect();



var saveHub=(req,resp)=>{
    var connection = funcs.getDBConnection();
    connection.connect();
    var make = req.body.make;
    var sr_no =  req.body.sr_no ;
    var blade_A = req.body.blade_A;
    var blade_B = req.body.blade_B;
    var blade_C = req.body.blade_C;
    var created_on = funcs.getCurrentDateandTime();
    var status = req.body.status;


    var hub_qry = `INSERT INTO dat_hubs(make , sr_no, blade_A, blade_B, blade_C,created_on, status_id_fk ) VALUES ('${make}' , '${sr_no}', '${blade_A}', '${blade_B}', '${blade_C}', '${created_on}' , ${status})`;

    connection.query(hub_qry ,  function(err, results) {

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
} //savehub

var getHubDetails=(req,resp)=>{
    var connection=funcs.getDBConnection();
    connection.connect();

    connection.query('SELECT t1.id,t1.make,t1.sr_no,t1.blade_A,t1.blade_B,t1.blade_C,t2.sname from dat_hubs t1 inner join mas_status t2 on t1.status_id_fk = t2.id', function (error, results, fields) {

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
}//getHubDetails

var getHubById = (req,resp)=>{

    var connection=funcs.getDBConnection();
    connection.connect();

    var hub_Id = req.params.id;

    var get_By_Id_qry = `SELECT t1.id,t1.make,t1.sr_no,t1.blade_A,t1.blade_B,t1.blade_C,t2.sname from dat_hubs t1 inner join mas_status t2 on t1.status_id_fk = t2.id where t1.id=  ${hub_Id}`;

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

}//getHubById

var updateHub=(req,resp)=>{
    var make = req.body.make;
    var sr_no =  req.body.sr_no ;
    var blade_A = req.body.blade_A;
    var blade_B = req.body.blade_B;
    var blade_C = req.body.blade_C;
    var updated_on = funcs.getCurrentDateandTime();
    var status = req.body.status;
    var hub_Id = req.params.id;

    var update_hub_qry = `UPDATE dat_hubs set make = '${make}' , sr_no = '${sr_no}' , blade_A= '${blade_A}' ,blade_B='${blade_B}' , blade_C = '${blade_C}' , updated_on= '${updated_on}', status= '${status}' WHERE id =  ${hub_Id}`;
    connection.query(update_hub_qry ,  function(err, results) {
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
} //updatehub

module.exports={saveHub,getHubDetails, getHubById, updateHub};

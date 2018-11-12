const mysql = require('mysql2');
var log4node = require('log4node');
log = new log4node.Log4Node({level: 'warning', file: 'test.log'});
const funcs = require('./funcs/libraries');


var connection=funcs.getDBConnection();
connection.connect();



var saveHydraulics=(req,resp)=>{
    var connection = funcs.getDBConnection();
    connection.connect();
    var unit_make = req.body.unit_make;
    var unit_sr_no =  req.body.unit_sr_no ;
    var motor_make = req.body.motor_make;
    var motor_sr_no = req.body.motor_sr_no;
    var accumulator_make = req.body.accumulator_make;
    var accumulator_sr_no = req.body.accumulator_sr_no;
    var created_on = funcs.getCurrentDateandTime();
    var status = req.body.status;


    var hydraulics_qry = `INSERT INTO dat_hydraulics(unit_make , unit_sr_no, motor_make, motor_sr_no, accumulator_make, accumulator_sr_no, created_on, status_id_fk ) VALUES ('${unit_make}' , '${unit_sr_no}', '${motor_make}', '${motor_sr_no}', '${accumulator_make}', '${accumulator_sr_no}', '${created_on}' , ${status})`;
    console.log(hydraulics_qry);
    connection.query(hydraulics_qry ,  function(err, results) {

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
} //saveHydraulics

var getHydraulicsDetails=(req,resp)=>{
    var connection=funcs.getDBConnection();
    connection.connect();

    connection.query('SELECT t1.id,t1.unit_make,t1.unit_sr_no,t1.motor_make,t1.motor_sr_no,t1.accumulator_make, t1.accumulator_sr_no, t2.sname from dat_hydraulics t1 inner join mas_status t2 on t1.status_id_fk = t2.id', function (error, results, fields) {

        if (error){
            log.warning("error caught in DB query");
        }
        else
            console.log(results);
        {
            resp.status(200).json({
                status: "SUCCESS",
                message:"NIL",
                data:results
            });
        }

    });

    connection.end();
}//getHydraulicsDetails

var getHydraulicsById = (req,resp)=>{

    var connection=funcs.getDBConnection();
    connection.connect();

    var hydraulics_Id = req.params.id;

    var get_By_Id_qry = `SELECT t1.id, t1.unit_make, t1.unit_sr_no, t1.motor_make, t1.motor_sr_no, t1.accumulator_make, t1.accumulator_sr_no,t2.sname from dat_hydraulics t1 inner join mas_status t2 on t1.status_id_fk = t2.id where t1.id=  ${hydraulics_Id}`;

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

}//getHydraulicsById

var updateHydraulics=(req,resp)=>{
    var unit_make = req.body.unit_make;
    var unit_sr_no =  req.body.unit_sr_no ;
    var motor_make = req.body.motor_make;
    var motor_sr_no = req.body.motor_sr_no;
    var accumulator_make = req.body.accumulator_make;
    var accumulator_sr_no = req.body.accumulator_sr_no;
    var updated_on = funcs.getCurrentDateandTime();
    var status = req.body.status;
    var hydraulics_Id = req.params.id;

    var update_hydraulics_qry = `UPDATE dat_hydraulics set unit_make = '${unit_make}' , unit_sr_no = '${unit_sr_no}' , motor_make= '${motor_make}' ,motor_sr_no='${motor_sr_no}' , accumulator_make = '${accumulator_make}' , accumulator_sr_no = '${accumulator_sr_no}' , updated_on= '${updated_on}', status= '${status}' WHERE id =  ${hydraulics_Id}`;
    connection.query(update_hydraulics_qry ,  function(err, results) {
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
} //updatehubHydraulics

module.exports={saveHydraulics,getHydraulicsDetails, getHydraulicsById, updateHydraulics};

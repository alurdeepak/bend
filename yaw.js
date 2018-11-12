const mysql = require('mysql2');
var log4node = require('log4node');
log = new log4node.Log4Node({level: 'warning', file: 'test.log'});
const funcs = require('./funcs/libraries');


var connection=funcs.getDBConnection();
connection.connect();



var saveYaw=(req,resp)=>{
    var connection = funcs.getDBConnection();
    connection.connect();
    var make = req.body.make;
    var yaw_motor_drive1 =  req.body.yaw_motor_drive1;
    var yaw_motor_drive2 = req.body.yaw_motor_drive2;
    var yaw_motor_drive3 = req.body.yaw_motor_drive3;
    var yaw_motor_drive4 = req.body.yaw_motor_drive4;
    var created_on = funcs.getCurrentDateandTime();
    var status = req.body.status;


    var yaw_qry = `INSERT INTO dat_yaw_motor_drives(make , yaw_motor_drive1, yaw_motor_drive2, yaw_motor_drive3, yaw_motor_drive4,created_on, status_id_fk ) VALUES ( '${make}' , '${yaw_motor_drive1}', '${yaw_motor_drive2}', '${yaw_motor_drive3}', '${yaw_motor_drive4}', '${created_on}' , ${status})`;

    connection.query(yaw_qry ,  function(err, results) {

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
} //saveyaw

var getYawDetails=(req,resp)=>{
    var connection=funcs.getDBConnection();
    connection.connect();

    connection.query('SELECT t1.id,t1.make,t1.yaw_motor_drive1,t1.yaw_motor_drive2,t1.yaw_motor_drive3,t1.yaw_motor_drive4,t2.sname from dat_yaw_motor_drives t1 inner join mas_status t2 on t1.status_id_fk = t2.id', function (error, results, fields) {

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
}//getYawDetails

var getYawById = (req,resp)=>{

    var connection=funcs.getDBConnection();
    connection.connect();

    var yaw_Id = req.params.id;

    var get_By_Id_qry = `SELECT t1.id,t1.make,t1.yaw_motor_drive1,t1.yaw_motor_drive2,t1.yaw_motor_drive3,t1.yaw_motor_drive4,t2.sname from dat_yaw_motor_drives t1 inner join mas_status t2 on t1.status_id_fk = t2.id where t1.id=  ${yaw_Id}`;

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

}//getYawById

var updateYaw=(req,resp)=>{
    var make = req.body.make;
    var yaw_motor_drive1 =  req.body.yaw_motor_drive1;
    var yaw_motor_drive2 = req.body.yaw_motor_drive2;
    var yaw_motor_drive3 = req.body.yaw_motor_drive3;
    var yaw_motor_drive4 = req.body.yaw_motor_drive4;
    var updated_on = funcs.getCurrentDateandTime();
    var status = req.body.status;
    var yaw_Id = req.params.id;

    var update_yaw_qry = `UPDATE dat_yaw_motor_drives set make = '${make}' , yaw_motor_drive1 = '${yaw_motor_drive1}' , yaw_motor_drive2= '${yaw_motor_drive2},yaw_motor_drive3='${yaw_motor_drive3}' , yaw_motor_drive4 = '${yaw_motor_drive4}' , updated_on= '${updated_on}, status= '${status} WHERE id =  ${yaw_Id}`;
    connection.query(update_yaw_qry ,  function(err, results) {
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
} //updateyaw

module.exports={saveYaw,getYawDetails, getYawById, updateYaw};

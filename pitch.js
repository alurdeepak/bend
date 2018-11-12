const mysql = require('mysql2');
var log4node = require('log4node');
log = new log4node.Log4Node({level: 'warning', file: 'test.log'});
const funcs = require('./funcs/libraries');


var connection=funcs.getDBConnection();
connection.connect();



var savePitch=(req,resp)=>{
    var connection = funcs.getDBConnection();
    connection.connect();
    var make = req.body.make;
    var blade_A = req.body.blade_A;
    var blade_B = req.body.blade_B;
    var blade_C = req.body.blade_C;
    var accumulator_make = req.body.accumulator_make;
    var accum_blade_A_sr_no = req.body.accum_blade_A_sr_no;
    var accum_blade_B_sr_no = req.body.accum_blade_B_sr_no;
    var accum_blade_C_sr_no = req.body.accum_blade_C_sr_no;


    var created_on = funcs.getCurrentDateandTime();
    var status = req.body.status;


    var pitch_qry = `INSERT INTO dat_pitch_cylinders(make , blade_A, blade_B, blade_C,created_on, status_id_fk, accumulator_make, accum_blade_A_sr_no, accum_blade_B_sr_no, accum_blade_C_sr_no) VALUES ('${make}' , '${blade_A}', '${blade_B}', '${blade_C}', '${created_on}' , ${status} , '${accumulator_make}' , '${accum_blade_A_sr_no}' , '${accum_blade_B_sr_no}' , '${accum_blade_C_sr_no}' )`;

    connection.query(pitch_qry ,  function(err, results) {

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
} //savepitch

var getPitchDetails=(req,resp)=>{
    var connection=funcs.getDBConnection();
    connection.connect();

    connection.query('SELECT t1.id,t1.make,t1.blade_A,t1.blade_B,t1.blade_C, t1.accumulator_make,t1.accum_blade_A_sr_no,t1.accum_blade_B_sr_no,t1.accum_blade_C_sr_no, t2.sname from dat_pitch_cylinders t1 inner join mas_status t2 on t1.status_id_fk = t2.id', function (error, results, fields) {

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
}//getPitchDetails

var getPitchById = (req,resp)=>{

    var connection=funcs.getDBConnection();
    connection.connect();

    var pitch_Id = req.params.id;

    var get_By_Id_qry = `SELECT t1.id,t1.make,t1.blade_A,t1.blade_B,t1.blade_C,t1.accumulator_make,t1.accum_blade_A_sr_no,t1.accum_blade_B_sr_no,t1.accum_blade_C_sr_no,t2.sname from dat_pitch_cylinders t1 inner join mas_status t2 on t1.status_id_fk = t2.id where t1.id=  ${pitch_Id}`;

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

}//getPitchById

var updatePitch=(req,resp)=>{
    var make = req.body.make;
    var blade_A = req.body.blade_A;
    var blade_B = req.body.blade_B;
    var blade_C = req.body.blade_C;
    var updated_on = funcs.getCurrentDateandTime();
    var status = req.body.status;
    var accumulator_make = req.body.accumulator_make;
    var accum_blade_A_sr_no = req.body.accum_blade_A_sr_no;
    var accum_blade_B_sr_no = req.body.accum_blade_B_sr_no;
    var accum_blade_C_sr_no = req.body.accum_blade_C_sr_no;
    var pitch_Id = req.params.id;

    var update_pitch_qry = `UPDATE dat_pitch_cylinders set make = '${make}' , blade_A= '${blade_A},blade_B='${blade_B}' , blade_C = '${blade_C}' , updated_on= '${updated_on}', status= ${status}, accumulator_make= '${accumulator_make}', accum_blade_A_sr_no= '${accum_blade_A_sr_no}', accum_blade_B_sr_no= '${accum_blade_B_sr_no}', accum_blade_C_sr_no= '${accum_blade_C_sr_no}', WHERE id =  ${pitch_Id}`;
    connection.query(update_pitch_qry ,  function(err, results) {
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
} //updatepitch

module.exports={savePitch,getPitchDetails, getPitchById, updatePitch};

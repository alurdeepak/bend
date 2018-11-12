const mysql = require('mysql2');
var log4node = require('log4node');
log = new log4node.Log4Node({level: 'warning', file: 'test.log'});
const funcs = require('./funcs/libraries');


var connection=funcs.getDBConnection();
connection.connect();



var saveTopPanel=(req,resp)=>{
    var connection = funcs.getDBConnection();
    connection.connect();
    var make = req.body.make;
    var sr_no =  req.body.sr_no ;
    var top_panel_coolant_pump_serial_number = req.body.top_panel_coolant_pump_serial_number;
    var created_on = funcs.getCurrentDateandTime();
    var status = req.body.status;


    var topPanel_qry = `INSERT INTO dat_top_panels(make , sr_no, top_panel_coolant_pump_serial_number,created_on, status_id_fk ) VALUES ('${make}' , '${sr_no}', '${top_panel_coolant_pump_serial_number}', '${created_on}' , ${status})`;
    console.log(topPanel_qry);
    connection.query(topPanel_qry ,  function(err, results) {

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
} //saveTopPanel

var getTopPanelDetails=(req,resp)=>{
    var connection=funcs.getDBConnection();
    connection.connect();

    connection.query('SELECT t1.id,t1.make,t1.sr_no,t1.top_panel_coolant_pump_serial_number, t2.sname from dat_top_panels t1 inner join mas_status t2 on t1.status_id_fk = t2.id', function (error, results, fields) {

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
}//getTopPanelDetails

var getTopPanelById = (req,resp)=>{

    var connection=funcs.getDBConnection();
    connection.connect();

    var topPanel_Id = req.params.id;

    var get_By_Id_qry = `SELECT t1.id,t1.make,t1.sr_no,t1.top_panel_coolant_pump_serial_number, t2.sname from dat_top_panels t1 inner join mas_status t2 on t1.status_id_fk = t2.id where t1.id=  ${topPanel_Id}`;

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

}//getTopPanelById

var updateTopPanel=(req,resp)=>{
    var make = req.body.make;
    var sr_no =  req.body.sr_no ;
    var top_panel_coolant_pump_serial_number = req.body.top_panel_coolant_pump_serial_number;
    var updated_on = funcs.getCurrentDateandTime();
    var status = req.body.status;
    var topPanel_Id = req.params.id;

    var update_topPanel_qry = `UPDATE dat_top_panels set make = '${make}' , sr_no = '${sr_no}' , top_panel_coolant_pump_serial_number= '${top_panel_coolant_pump_serial_number}' , updated_on= '${updated_on}', status= '${status}' WHERE id =  ${topPanel_Id}`;
    connection.query(update_topPanel_qry ,  function(err, results) {
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
} //updateTopPanel

module.exports={saveTopPanel,getTopPanelDetails, getTopPanelById, updateTopPanel};

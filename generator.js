const mysql = require('mysql2');
var log4node = require('log4node');
log = new log4node.Log4Node({level: 'warning', file: 'test.log'});
const funcs = require('./funcs/libraries');


var connection=funcs.getDBConnection();
connection.connect();


var getRoles=(req,resp)=>{
    var connection=funcs.getDBConnection();
    //console.log(connection);
    connection.connect();
    connection.query('SELECT id,rname from mas_roles', function (error, results, fields) {
        if (error){
          log.error("error caught in DB query");
        }
        //console.log('The dept name is: ', results[0].dname);
           resp.status(200).json({
            status: "SUCCESS",
            message:"NIL",
            data:results
        });

    });

    connection.end();
}//getRoles

var authenticateUser=(req,resp)=>{
    var connection=funcs.getDBConnection();
    //console.log(connection);
    connection.connect();
    log.warning("error caught in DB query" +  post('email'));
    console.log("error caught in DB query" +  post('email'));
    log.error("error caught in DB query");

    connection.query('SELECT id,rname from mas_roles', function (error, results, fields) {
        if (error){
            console.log("Error caught " + error);
            log.warning("error caught in DB query");
            log.error("error caught in DB query");
        }
        //console.log('The dept name is: ', results[0].dname);


        resp.status(200).json({
            status: "SUCCESS",
            message:"NIL",
            data:results
        });

    });

    connection.end();
}//getRoles




var saveGeneratorDetails=(req,resp,next)=>{
  const post= req.body;

  console.log(post);
  var make = req.body.make;
  var sr_no =  req.body.sr_no ;
  var generator_slipring_sr_number = req.body.generator_slipring_sr_number;
  var generator_cooling_fan1_sr_no = req.body.generator_cooling_fan1_sr_no;
  var generator_slipring_cooling_fan_sr_no = req.body.generator_slipring_cooling_fan_sr_no;
   var status_id_fk = req.body.status;
  var created_on = funcs.getCurrentDateandTime();
var created_by_fk = 1;

  console.log('date is'+created_on);
  //console.log("make===="+make);
  var connection=funcs.getDBConnection();
  connection.connect();
  log.warning("error caught in DB query" + req.remoteAddress);
  log.error("error caught in DB query");
//  var query = connection.query('insert into dat_generators set ?','mysql.escape(post)', function(err, result) {
   var save_gen_qry = `INSERT INTO dat_generators (make , sr_no,created_on, status_id_fk , turbine_id_fk , generator_slipring_sr_number , generator_cooling_fan1_sr_no , generator_slipring_cooling_fan_sr_no) VALUES ('${make}' , '${sr_no}', '${created_on}', ${status_id_fk} ,1, '${generator_slipring_sr_number}' , '${generator_cooling_fan1_sr_no}' , '${generator_slipring_cooling_fan_sr_no}')`;
   connection.query(save_gen_qry, function (err, result) {
    //console.log(sql);

     if (err) {
       console.error(err);
       return resp.send(err);
     } else
     {
       resp.status(201).json({
       message: 'req.bodyadded successfully'
       });
     }
});

} //saveGeneratorDetails

var getGeneratorDetails=(req,resp)=>{
  var connection=funcs.getDBConnection();
  connection.connect();
  // log.warning("error caught in DB query" + req.remoteAddress);
  // log.error("error caught in DB query");
  connection.query('SELECT t1.id,t1.make , t1.sr_no , t1.status_id_fk , t1.generator_slipring_sr_number , t1.generator_cooling_fan1_sr_no , t1.generator_slipring_cooling_fan_sr_no ,t2.sname from dat_generators t1 inner join mas_status t2 on t1.status_id_fk = t2.id', function (error, results, fields) {

      console.log("result"+results);
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
}//getGeneratorDetails

var getGeneratorById=(req,resp)=>{
  var connection=funcs.getDBConnection();
  connection.connect();
//  log.warning("error caught in DB query" + req.remoteAddress);
   var gen_Id = req.params.id;
  connection.query(`SELECT id,make , sr_no , status_id_fk , generator_slipring_sr_number , generator_cooling_fan1_sr_no , generator_slipring_cooling_fan_sr_no from dat_generators WHERE id =  ${gen_Id} ` , function (error, results, fields) {
//    console.log("result"+results);
      if (error){
      //    console.log("Error caught " + error);
          log.warning("error caught in DB query");
      }
        resp.status(200).json({
          status: "SUCCESS",
          message:"NIL",
          data:results
      });
  });

  connection.end();
}//getGeneratorById

var updateGenerator=(req,resp)=>{
  var connection=funcs.getDBConnection();
  connection.connect();
  var gen_Id = req.body.id;
  var make = req.body.make;
  var sr_no =  req.body.sr_no ;
  var generator_slipring_sr_number = req.body.generator_slipring_sr_number;
  var generator_cooling_fan1_sr_no = req.body.generator_cooling_fan1_sr_no;
  var generator_slipring_cooling_fan_sr_no = req.body.generator_slipring_cooling_fan_sr_no;
   var status_id_fk = req.body.status;
   var updated_on = funcs.getCurrentDateandTime();
   console.log('updated_on is'+updated_on);


  connection.query(`UPDATE dat_generators SET make = '${make}' , sr_no = '${sr_no}', updated_on = '${updated_on}' , status_id_fk= '${status_id_fk}' , generator_slipring_sr_number= '${generator_slipring_sr_number}' , generator_cooling_fan1_sr_no= '${generator_cooling_fan1_sr_no}' , generator_slipring_cooling_fan_sr_no= '${generator_slipring_cooling_fan_sr_no}' WHERE id =  ${gen_Id} ` , function (error, results, fields) {


  if (error)
  {
          log.warning("error caught in DB query");
          resp.status(200).json({
                  status: "FAILED",
                  message:"Updated failed",

              });


  }else{
    resp.status(200).json({
            status: "SUCCESS",
            message:"Updated successfully",
            data:results
        });
  }


  });

  connection.end();
}//updateGenerator


module.exports={getRoles,authenticateUser,saveGeneratorDetails,getGeneratorDetails,getGeneratorById,updateGenerator};

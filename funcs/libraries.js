const mysql = require('mysql2');
const config_data = require('../config/config.json');
const moment=require('moment-timezone');

var getDBConnection=()=>{
    // create the connection to database
    const connection = mysql.createConnection({
        host: config_data.DB_URL,
        user: config_data.DB_UNAME,
        password : config_data.DB_PWD,
        database: config_data.DB_SCHEMA
    });

    return connection;
}

var getStatus=(req,resp)=>{
   var Lconnection = getDBConnection();
   Lconnection.connect();
Lconnection.query('SELECT id,sname from mas_status', function (error, results, fields) {

      // console.log("result"+results);
      if (error){
      log.warning("error caught in DB query");
      }
        resp.status(200).json({
          status: "SUCCESS",
          message:"NIL",
          data:results
      });
  });

  Lconnection.end();
}//getStatus


var getCurrentDateandTime=()=>{
    var curr_moment=moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
    return curr_moment;

} //getCurrentDateandTime


module.exports={getDBConnection,getStatus,getCurrentDateandTime};

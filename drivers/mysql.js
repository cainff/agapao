var mysql = require('mysql');       

module.exports = {
    connection : function(){
    return mysql.createConnection({
  //host     : 'localhost',
  host     : 'mjm-webdesign.com',
  user     : 'dev32017_agapao',
  //user     : 'root',
  //password : 'root',
  password : 'Dev32017_agapao!',
  
  //port     : '/Applications/MAMP/tmp/mysql/mysql.sock',
  port     : '3306',
  //database : 'agapao'
  database : 'dev32017_agapao'
    })
},
    query : function (_q, cb){
         var _c = this.connection();

          _c.connect();
          _c.query(_q, function(err, rows, fields) {
          if (err) throw err;
          cb(rows);
    });
        _c.end();
    }
}
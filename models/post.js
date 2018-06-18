module.exports = function(app, data) {
    
    var mysql = app.drivers.mysql;
    

    this.table = 'post';
    
    this.id=data.id || null;
    this.message= data.message || null;
    this.now = data.now || null;
    
    
    
    this.get = function(cb) {
        //var q = " SELECT * FROM " + this.table;

        var q = " SELECT nom, message FROM members RIGHT JOIN post ON members.id = post.id";
    
    
        mysql.query(q, function(rows){
            cb(rows);
        });    
    }
    
    
    this.register = function(){
        var me = this
        q = " INSERT INTO " + this.table + " (message, now) VALUES ('"+this.message+"','"+this.now+"') ";
    
        mysql.query(q, function(rows){
            me.id = rows.insertID;
        });
    }

    
   return this;
    
}
 
 


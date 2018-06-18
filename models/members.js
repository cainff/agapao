
module.exports = function(app, data) {

    var bcrypt = require('bcrypt-nodejs')
    var mysql = app.drivers.mysql;
    

    this.table = 'members';
    
    this.id=data.id || null;
    this.nom= data.nom || null;
    this.prenom = data.prenom || null;
    this.pseudo = data.pseudo || null;
    this.password = data.password || null;
    this.email = data.email|| null;
    this.photo = data.photo || null;
    
    
    this.get = function(cb) {
        var q = " SELECT * FROM " + this.table;
    
    
        mysql.query(q, function(rows){
            cb(rows);
        });    
    }
    
    
    this.register = function(cb){
        var me = this;
        me.created_at = new Date().toISOString()
        me.password = bcrypt.hashSync(this.password)

        q = " INSERT INTO " + this.table + " (nom, prenom, pseudo, password, email, photo) VALUES ('"+this.nom+"','"+this.prenom+"','"+this.pseudo+"','"+this.password+"','"+this.email+"','"+this.photo+"') ";
    
        mysql.query(q, function(rows){
            me.id = rows.insertID;
                cb({
                id : me.id,
                email : me.email
            });
            
        });
    }

    
   return this;
    
}
 
 


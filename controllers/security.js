var bcrypt = require('bcrypt-nodejs')

module.exports = function(app){
    return {
        
        authenticate: function(table, email, password, cb){
            var q = "SELECT id, email, password FROM " + table + " WHERE email='" + email + "' LIMIT 1";
            console.log(q)

            app.drivers.mysql.query(q, function(rows){
                var response = rows[0]
                var check = bcrypt.compareSync(password, response.password)

                if (!check)
                    return cb(check, null)
                
                var user = new app.models[table](app, {
                    id : response.id
                });

                user.get(function(item){
                    console.log(item);
                    item.token = app.drivers.cryptojs.encrypt({
                        id : item.id,
                        email : item.email
                    })
                    cb(check, item)
                });
            })
        },
        
        grant: function(id, token){
            
            var data = app.drivers.cryptojs.decrypt(token);
                return data.id == id
            
        
        }
    }
}
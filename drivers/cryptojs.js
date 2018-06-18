var cryptoJS = require('crypto-js')

var supersecret = 'sup3rs3cr3t'


module.exports = function(app){
    return {
            encrypt : function(content){
	           var ciphertext = cryptoJS.AES.encrypt(JSON.stringify(content), supersecret);
			   var token = ciphertext.toString()

			     return token
            },
        
            decrypt : function(token){
               var bytes = cryptoJS.AES.decrypt(token, supersecret);
               var plaintext = bytes.toString(cryptoJS.enc.Utf8);
                
                return JSON.parse(plaintext)
            }
        
    }
    
}




// import crypto to do the AES-128
var crypto = require('crypto');

// local var for AES encryption
const key = "b90126c9a326d6a9";
const iv = "b90126c9a326d6a9";

encryptAES = function(data) {
  // console.log(data)
  var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  var crypted = cipher.update(data, 'utf8', 'binary');
  crypted += cipher.final('binary');
  crypted = new Buffer(crypted, 'binary').toString('base64');
  // console.log(crypted);
  return crypted;
}

decryptAES = function(crypted) {
  // console.log(crypted)
  crypted = new Buffer(crypted, 'base64').toString('binary');
  var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  var decoded = decipher.update(crypted, 'binary', 'utf8');
  decoded += decipher.final('utf8');
  // console.log(decoded);
  return decoded;
}

decryptStamp = function(encodedString) {
  return decryptAES(decodeURIComponent(encodedString))
}

encodeString = (string) => {
  let encrypt = encryptAES(string.toString())
  return encodeURIComponent(encrypt)
}

Meteor.methods({
  encryptStamp: function(lcentercode) {
    if (this.userId) {
      // encrypt string
      let string = `${lcentercode}&${moment().unix()}`
      console.log(`string: ${string}`)

      let encryptedString = encryptAES(string)
      console.log(`encryptedString: ${encryptedString}`)

      let encodedString = encodeURIComponent(encryptedString)
      console.log(`encodedString: ${encodedString}`)

      let result = `query=${encodeString(string)}`

      console.log(result)

      return result
    } else {
      throw new Meteor.Error( '500', 'No Premission' );
    }

  }
});

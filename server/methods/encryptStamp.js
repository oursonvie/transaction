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

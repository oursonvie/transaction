Meteor.methods({
  removeDLCenter: function(id) {
    if (this.userId) {
      return DLearningCenter.remove({_id:id})
    } else {
      throw new Meteor.Error( '500', 'No Premission' );
    }
  },
  changeAccess: function(id) {
    if (this.userId) {
      // target dcenter

      let target = DLearningCenter.findOne({_id:id})

      result = DLearningCenter.update(
        {_id:id},
        {$set: {
          allowAccess: !target.allowAccess
        }}
      )

      message = {action:'update', target: id, result: result}

      return message

    } else {
      throw new Meteor.Error( '500', 'No Premission' );
    }
  }
});

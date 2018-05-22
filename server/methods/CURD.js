Meteor.methods({
  removeDLCenter: function(id) {
    if (this.userId) {
      return DLearningCenter.remove({_id:id})
    } else {
      throw new Meteor.Error( '500', 'No Premission' );
    }
  }
});

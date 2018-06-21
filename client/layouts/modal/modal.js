Template.modal.helpers({
  getModal: function() {
    if (Session.get('updateModal')) {
      $('#exampleModalCenter').modal('show')
      let updateModal = Session.get('updateModal')
      return updateModal
    } else {
      $('#exampleModalCenter').modal('hide')
    }
  }
});

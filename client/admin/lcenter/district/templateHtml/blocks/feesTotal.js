Template.feesTable.helpers({
  feesInfo: function() {
    if (Session.get('feesInfo')) {
      return Session.get('feesInfo')
    }
  },
});

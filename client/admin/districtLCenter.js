Template.districtLCenter.onCreated(function() {
  Session.set('lcenterList', false)

  PromiseMeteorCall('getLcenterList')
  .then(res => {
    Session.set('lcenterList', res)
  })
  .catch(err => console.log(err))
});

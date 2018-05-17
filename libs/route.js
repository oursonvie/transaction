FlowRouter.route('/admin', {
   name: 'timeSetting',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'timeSetting'});
    }
});

FlowRouter.route('/districtLCenter', {
   name: 'districtLCenter',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'districtLCenter'});
    }
});

FlowRouter.route('/admin', {
   name: 'timeSetting',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'timeSetting'});
    }
});

FlowRouter.route('/singleLCenter', {
   name: 'singleLCenter',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'singleLCenter'});
    }
});

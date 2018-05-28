FlowRouter.route('/admin', {
   name: 'timeSetting',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'timeSetting'});
    }
});

FlowRouter.route('/singlelcenter', {
   name: 'singleLCenter',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'singleLCenter'});
    }
});

FlowRouter.route('/districtlcenter', {
   name: 'districtLCenter',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'districtLCenter'});
    }
});


FlowRouter.route('/districtcenter/:id', {
   name: 'districtcenterID',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'districtcenterID'});
    }
});

FlowRouter.route('/districtcenter/pdf/:id', {
   name: 'dcenterpdf',
    action() {
        BlazeLayout.render('PrintLayout', {main: 'dcenterpdf'});
    }
});

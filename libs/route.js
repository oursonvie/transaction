FlowRouter.route('/admin', {
   name: 'admin',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'admin'});
    }
});

var app = {};

app.drivers = {};
app.drivers.express = require('./drivers/express');
app.drivers.express_session = require('./drivers/express_session');
app.drivers.mysql = require('./drivers/mysql')
app.drivers.express.init();
app.drivers.express_session.session();


app.controllers = {};
app.controllers.route = require('./controllers/routes')(app);

app.models = {};
app.models.members = require('./models/members');
app.models.post = require('./models/post');




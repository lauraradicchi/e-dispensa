'use strict';

    var express = require('express');
    var app = express();
    app.use(express.static('www'))
    var port = process.env.VCAP_APP_PORT||4200;
    const server =app.set('port',process.env.VCAP_APP_PORT);
    server.listen(port, () => {
        console.log('Local HTTP Express server started on http://localhost:' + port);
    });
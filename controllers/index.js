
const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');
const api = require('./api');
const dashboardRoute = require('./dashboardRoute.js');

router.use('/', homeRoutes);
router.use('/api', api);
router.use('/dashboard', dashboardRoute); //i wish it was plural but i dont want to mess up my github repo

module.exports = router; 
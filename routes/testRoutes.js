const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hi this is a real test');
} );

router.get('/obj', (req, res) => {
    res.send({first:'Hi this is a object test',second:45});
} );
module.exports = router;
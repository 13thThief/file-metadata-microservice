'use strict';

const express = require('express');
const app = express();
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

var multer = require('multer');
/* Files will be kept in memory unless
 * you pass { dest: 'uploads/' } to multer()
 */
var upload = multer();

app.use(compression())
app.use(cors({
    optionSuccessStatus: 200
}));
app.use(helmet());
// app.use(express.urlencoded({ extended: true}));
// app.use(express.json());

app.use(express.static(`${__dirname}/public`));
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index');
})

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
    const file = req.file;
    res.json({
        name: file.originalname,
        type: file.mimetype,
        size: file.size
    })
});

// 404 Handler
app.use('*', (req, res, next) => {
    res.sendStatus(404);
});

// Error handler
app.use(function(err, req, res, next) {
    console.error(err);
    res.sendStatus(500);
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on', listener.address().port);
});

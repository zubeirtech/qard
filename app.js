require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/config');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(cors());

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send(err);
    } else {
        next(err);
    }
});

config.connectDb();

app.use('/api', require('./routes/index'));
app.use('/api/users', require('./routes/users'));

const { PORT } = process.env;
app.listen(PORT || 3000, console.log(`Server started on port ${PORT}`));

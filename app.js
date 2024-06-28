const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); 
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://mp348730:169430@nodepractice.titz43a.mongodb.net/node?retryWrites=true&w=majority&appName=nodepractice';
mongoose.connect(dbURI).then(() => 
    {
        console.log('connected to db');
        // listen for requests
        app.listen(3000);
    }
).catch((err) =>
    {
        console.log(err);
    }
);

// register view engine
app.set('view engine', 'ejs');

// to set different folder for views(html and css templates that we use)
// by default ejs uses 'views' folder
// app.set('views', 'myViews');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded(
        {
            extended: true
        }
    )
);
app.use(morgan('dev'));

app.get('/', (req, res) => 
    {
        res.redirect('/blogs');
    }
);

app.get('/about', (req, res) => 
    {
        res.render('about', 
            {
                title: 'About'
            }
        );
    }
);

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) =>
    {
        res.render('404', 
            {
                title: '404'
            }
        );
    }
);
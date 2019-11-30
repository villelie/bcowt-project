'use strict';

const express = require('express');
const dbUsers = require('./models/bcowt-users');
//const dbPics = require('./models/bcowt-pics');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const app = express();
const httpPort = 3033;

app.use(express.urlencoded({extended: true}));

const sesOptions = {
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: {maxAge: 60000, secure: false}
};

app.use(require('express-session')(sesOptions));

passport.use(new LocalStrategy((username, password ,done) => {
    console.log('login', username);
    if (username !== 'exampleUser' || password !== 'examplePass') {
        console.log('login', 'wrong username or password');
        return done(null, false);
    }
    return done(null, {username: username});
}));

if (process.env.SERVER === 'server') {
	app.set('trust proxy', 1);
	sesOptions.cookie.secure = true;
	console.log('Using secure cookie');
} else console.log('Using unsecure cookie');


passport.serializeUser((user, done) => {
	done(null, user.username);
});

passport.deserializeUser((user, done) => {
	done(null, {username: user});
});

app.use(passport.initialize());
app.use(passport.session());

if (process.env.SERVER === 'local') {
	require('./secure/localhost')(app);
} else {
	require('./secure/server')(app);
	app.listen(httpPort, () => {
		console.log('Started');
	});
}

app.use(express.static('public'));

app.get('/usergetall', async (req, res) => {
	try {
		res.json(await dbUsers.getAll());
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});

app.get('/usersearch', async (req, res) => {
	console.log(req.query);
	try {
		res.json(await dbUsers.search(req.query.search_username));
	} catch(e) {
		res.send('db error :(');
	}
});

app.post('/useradd', async (req, res) => {
	console.log(req.body);
	try {
		const salt = bcrypt.genSaltSync(12);
		const hash = bcrypt.hashSync(req.body.register_userpass, salt);
		await res.json(await dbUsers.insert(req.body.register_username, req.body.register_useremail, hash));
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});

app.post('/userlogin', passport.authenticate('local', {failureRedirect:'/fail'}),
    (req, res) => {
	console.log('trying to login');
	res.redirect('/');
});

app.get('/', (req, res) => {
	console.log('is user in req', req.user);
	res.sendFile('./public/main.html', {root: __dirname});
});

app.get('/fail', (req, res) => {
	res.send('failed to login');
});

app.get('/register', (req, res) => {
	console.log('is user in req', req.user);
	res.sendFile('./public/register.html', {root: __dirname});
});
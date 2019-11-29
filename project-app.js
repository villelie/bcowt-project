'use strict';

const express = require('express');
const dbUsers = require('./models/bcowt-users')
const dbPics = require('./models/bcowt-pics')
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

var sesOptions = {
	secret: 'whatisthissupposedtobe?',
	resave: true,
	saveUninitialized: true,
	cookie: {maxAge: 60000, secure: false}
}
if (process.env.SERVER === 'server') {
	app.set('trust proxy', 1);
	sesOptions.cookie.secure = true;
	console.log('Using secure cookie');
} else console.log('Using unsecure cookie');

app.use(require('express-session')(sesOptions));

passport.use(new localStrategy({usernameField: 'username', passwordField: 'passwd'}, (username, password, done) => {
	if(username !== 'villa') {
		console.log('wrong user');
		return done(null, false);
	}
	return done(null, {username: username});
}));

passport.serializeUser((user, done) => {
	done(null, user.username);
});

passport.deserializeUser((username, done) => {
	done(err, {username: username});
});

app.use(passport.initialize());
app.use(passport.session());


if (process.env.SERVER === 'local') {
	require('./secure/localhost')(app);
} else {
	require('./secure/server')(app);
	app.listen(3033, () => {
		console.log('Started');
	});
}

app.post('/userlogin', passport.authenticate('local', {failureRedirect: '/fail'}), (req, res) => {
	console.log('trying to login');
	res.redirect('/');
});

app.post('/useradd', async (req, res) => {
	try {
		const salt = bcrypt.genSaltSync(12);
		const hash = bcrypt.hashSync(req.body.register_userpass, salt);
		res.json(await dbUsers.insert(req.body.register_username, req.body.register_useremail, hash));
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});

app.get('/usergetall', async (req, res) => {
	try {
		res.json(await dbUsers.getAll());
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});

app.get('/usersearch', async (req, res) => {
	try {
		res.json(await dbUsers.search(req.query.search_username));
	} catch(e) {
		res.send('db error :(');
	}
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
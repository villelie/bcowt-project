'use strict';

const express = require('express');
const dbUsers = require('./models/bcowt-users')
const dbPics = require('./models/bcowt-pics')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const app = express();

const httpPort = 3033;
const httpsPort = 8088;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(require('express-session')({
	secret: 'cat',
	resave: true,
	saveUninitialized: true
}));

passport.use(new LocalStrategy((username, password, done) => {
	console.log('login', username);
	// $2a$12$yxtfBXmWiB.EUTddHYiaaOS1kwAIqh7h5qDd8mwbJ346xcd1ZKTuW
    if (username !== 'tester' || !bcrypt.compareSync(password, '$2a$12$yxtfBXmWiB.EUTddHYiaaOS1kwAIqh7h5qDd8mwbJ346xcd1ZKTuW')) {
		console.log('login', 'wrong username or password');
		return done(null, false);
    }
	return done(null, {username: username});
}));

passport.serializeUser((user, done) => {
	done(null, user.username);
});

passport.deserializeUser((user, done) => {
	done(err, {username: username});
});

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
	res.redirect('/');
});


if (process.env.SERVER === 'local') {
	console.log('Server running, using /secure/localhost.js' );
	require('./secure/localhost')(app);
} else {
	console.log('Server running, using /secure/server.js');
	require('./secure/server')(app);
	app.listen(httpPort, () => {
		console.log('Started');
	});
}

app.get('/userget', async (req, res) => {
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
		res.send(`db error`);
	}
});

app.post('/useradd', async (req, res) => {
	console.log(req.body);
	try {
		const salt = bcrypt.genSaltSync(12);
		const hash = bcrypt.hashSync(req.body.register_userpass, salt);
		console.log('NEVER DO THAT', hash);
		res.json(await dbUsers.insert(req.body.register_username, req.body.register_useremail, hash));
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});

app.get('/', (req, res) => {
	if(req.secure) {
		console.log('is user in req', req.user);
		res.sendFile('./public/main.html', {root: __dirname});
	} else {
		res.send('Hello form my Node server unsecure');
	}
});

app.get('/register', (req, res) => {
	res.sendFile('./public/register.html', {root: __dirname});
});
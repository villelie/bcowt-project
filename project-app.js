'use strict';

const express = require('express');
const dbUsers = require('./models/bcowt-users')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();

app.use(express.urlencoded({extended: true}));

app.use(require('express-session')({
	secret: 'cat',
	resave: true,
	saveUninitialized: true
}));
	

passport.use(new LocalStrategy((username, password, done) => {
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

app.post('/register', (req, res) => {
	const salt = bcrypt.genSaltSync(12);
	const hash = bcrypt.hashSync(req.body.password, salt);
	// insert into user (name, email, password) values (?, ?, ?), [req.body.name, req.body.email, hash]
	console.log('NEVER DO THAT', hash);
	res.send('account successfully created ☺');
});

if (process.env.SERVER === 'local') {
	console.log('Server running, using /secure/localhost.js' );
	require('./secure/localhost')(app);
} else {
	console.log('Server running, using /secure/server.js');
	require('./secure/server')(app);
	app.listen(3033, () => {
		console.log('server app start?');
	});
}

app.use(express.static('public'));

app.get('/testdbs', async (req, res) => {
	try {
		res.json(await dbUsers.getAll());
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});

app.get('/testdb', async (req, res) => {
	console.log(req.query);
	try {
		res.json(await dbUsers.search(req.query.name));
	} catch(e) {
		res.send(`db error`);
	}
});

app.post('/testdb', async (req, res) => {
	console.log(req.body);
	try {
		res.json(await dbUsers.insert(req.body.name));
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});

app.get('/', (req, res) => {
	console.log('is user in req', req.user);
	res.sendFile(path.join(__dirname + '/index.html'));
});
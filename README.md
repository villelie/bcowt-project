# Basic Concepts of Web Technology - Project
## TODO when cloning to local/server
If using on a server, we assume you have made changes to apache/httpd/firewall before continuing:
1. Clone to your local/server. `git clone https://github.com/villelie/bcowt-project.git`
2. Go to cloned folder. `cd bcowt-project/`
3. Install npm and its modules. `npm i`
4. Generate .env file. `vim .env` see example
5. Generate cert. 
```
openssl genrsa -out ca.key 2048
openssl req -new -key ca.key -out ca.csr
openssl x509 -req -days 365 -in ca.csr -signkey ca.key -out ca.crt
```
6. Import `bcowt_project.sql` file to your database, database name needs to match `DB_NAME` in .env-file.
7. Make new user to database with all priviledges, needs to match with `DB_USER` and `DB_PASS`.
8. (Only on server) edit url to match your server url. `vim public/js/ajax.js`
9. Run app. `node project-app.js`

### .env example
```
DB_HOST=localhost
DB_USER=user
DB_PASS=pass
DB_NAME=bcowt_project
SERVER=local
KEY=./ca.key
CERT=./ca.crt
SESSION_SECRET=sikret
```
![Danin koodi](https://i.imgur.com/4kyBaWv.jpg)

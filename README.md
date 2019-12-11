# Basic Concepts of Web Technology - Project
## TODO when cloning to local/server
If using on a server, we assume you have made changes to apache/httpd/firewall before continuing:
1. Clone to your local/server. `git clone https://github.com/villelie/bcowt-project.git`
2. Install npm and its modules. `npm i`
3. Generate .env file. `vim .env` see example
4. Generate cert. 
```
openssl genrsa -out ca.key 2048
openssl req -new -key ca.key -out ca.csr
openssl x509 -req -days 365 -in ca.csr -signkey ca.key -out ca.crt
```
5. Import `bcowt_project.sql` file to your database, database name needs to be same as `DB_NAME` in .env-file.
6. (Only on server) edit url to match your server url. `vim public/js/ajax.js`
7. Run app. `node project-app.js`

### .env example
```
DB_HOST=localhost
DB_USER=asd
DB_PASS=asd
DB_NAME=bcowt_project
SERVER=local
KEY=./ca.key
CERT=./ca.crt
SESSION_SECRET=sikret
```
![Danin koodi](https://i.imgur.com/4kyBaWv.jpg)

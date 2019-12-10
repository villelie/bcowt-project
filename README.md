# Basic Concepts of Web Technology - Project
![Danin koodi](https://i.imgur.com/4kyBaWv.jpg)
###
```
npm i
node project-app.js
```
### Generate cert
```
yum install mod_ssl openssl
openssl genrsa -out ca.key 2048
openssl req -new -key ca.key -out ca.csr
openssl x509 -req -days 365 -in ca.csr -signkey ca.key -out ca.crt

```
### head to https://localhost:8088/ in your browser
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
### Import "bcowt-project.sql" to your local/server
### Update /etc/httpd/conf.d/configs

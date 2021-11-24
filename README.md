# DASHBOARD FOR REGISTER

Get data from Escriba Register database and show it in a web dashboard

# About

This is a really simple and restricted app ( REST API + React Web App ) to get data from Escriba Register database and show it in a nice fashion.

It intends to be used by Escriba Register users only, for now.

# Why?

Escriba Register screens may not be very pleasant sometimes, and also may not show all data you want in a single view, so, this project aims to solve this problem in a specific way.

For now, it'll show a list of analysts and their current working processes, in a way the manager can follow the team production.

# How to run it?

## .env file

Setup the environment variables needed by the apps:

```env
API_PORT=5000
API_CORS_ORIGINS=['http://your.ip:3000']
VITE_API_ADDRESS=http://your.ip:5000
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=mysql
MYSQL_PASSWORD=mysql
MYSQL_DB=myDb
```

- API_PORT: HTTP port used by the API server
- API_CORS_ORIGINS: Client address to be cors allowed
- VITE_API_ADDRESS: Endpoint address the client will use to fetch data
- MYSQL\*: All MySQL configurations

**NOTES**:

- The `VITE_API_ADDRESS` will be placed at build time, so, make sure the right values is set before build the docker image. I could'nt make vite recognize this variable through docker, so, the `.env` file is needed by `Dockerfile.app` file to make it work.

## Root folder scripts

There are two packages in this repo: `api` and `client`. In the root folder `package.json` there are scripts to reach each package.

To work on `api` just type `yarn api [command]`. The same to `client`

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
VITE_ANALYST_PROD_SORTING=alpha-asc
VITE_ANALYST_PROD_FILTER=tag clerk supervisor
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=mysql
MYSQL_PASSWORD=mysql
MYSQL_DB=myDb
```

- API_PORT: HTTP port used by the API server
- API_CORS_ORIGINS: Client address to be cors allowed
- VITE_API_ADDRESS: Endpoint address the client will use to fetch data
- VITE_ANALYST_PROD_SORTING: Default sorting type for analysts page. It must be one of the following values (see client enums file):
  - alpha-asc
  - alpha-des
  - total-asc
  - total-des
- VITE_ANALYST_PROD_FILTER: Default filters for analysts page, separated by space. It must be any combination of the following values (see client enums file):
  - clerk
  - supervisor
  - tag
- MYSQL\*: All MySQL configurations

**NOTES**:

- The `VITE_API_ADDRESS` will be placed at build time, so, make sure the right values are set before build the docker image.

  I could'nt make vite recognize this variable through docker, so, the `.env` file is needed by `Dockerfile.app` file to make it work.

- Put the string `#dashboard` in the `observação` field in the user registration screen, on "Escriba Register", to be able to use the tag `tag` in `VITE_ANALYST_PROD_FILTER` environment variable, as it'll search by users with this tag.

 - `clerk` and `supervisor`, as options of `VITE_ANALYST_PROD_FILTER` environment variable, will search by users with `escrevente` and `supervisor` checkboxes marked on user registration screen, on "Escriba Register".

## Root folder scripts

There are two packages in this repo: `api` and `client`. In the root folder `package.json` there are scripts to reach each package.

To work on `api` just type `yarn api [command]`. The same to `client`.

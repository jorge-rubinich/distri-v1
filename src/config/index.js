// src/config/index.js

require('dotenv').config('')

const systemVars = {
  app: {
    PORT: process.env.SERVER_PORT || 8080,
    HOST_URL:  process.env.HOST_URL || "http://localhost:"+PORT
  },
  database: {
    protocol: process.env.DATABASE_PROTOCOL,
    URI: process.env.DATABASE_URL,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  pager: {
    limit: 3,
    page: 1,
  },
  gitHub: {
    GIT_CLIENTID: process.env.GIT_CLIENTID,
    GIT_CLIENTSECRET: process.env.GIT_CLIENTSECRET,
    GIT_CALLBACKURL: process.env.GIT_CALLBACKURL
  }
}

module.exports = systemVars
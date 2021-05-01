/*
 * Copyright (C) 2020 Depwhite Software
 *
 * This file is part of the Depwhite Software project.
 *
 * Depwhite Software project can not be copied and/or distributed without the express
 */
"use strict"

const PORT = 4400
const MYSQL = {
  queueLimit: 0, // unlimited queueing
  connectionLimit: 120, // unlimited connections
  multipleStatements: true,
  host: "127.0.0.1",
  port: 3306,
  user: "<username>",
  password: "<password>",
  database: "<datbase>",
  debug: false,
}

const APP = {
  title: "CliniterDental",
  description: "CliniterDental",
  keywords: "CliniterDental",
}
const MAILER = {
  from: "tt373153@gmail.com",
  host: "smtp.gmail.com",
  port: 465, // 25, 465, 587 depend on your
  auth: {
    user: "tt373153@gmail.com", // user account
    pass: "test@gmail123", // user password
  },
}
const ONESIGNAL = {
  app_id: "",
  user_auth_key: "",
  app_auth_key: "",
}
const BITLY = {
  client_id: "",
  client_secret: "",
  token: "",
}

export { PORT, MYSQL, APP,MAILER }

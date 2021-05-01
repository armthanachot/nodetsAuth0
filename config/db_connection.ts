/*
 * Copyright (C) 2020 Depwhite Software
 *
 * This file is part of the Depwhite Software project.
 *
 * Depwhite Software project can not be copied and/or distributed without the express
 */

"use strict"

import * as mysql from 'mysql'
import { promisify } from 'util'
// import { MYSQL } from './env/production'
import { MYSQL } from './env/development'

// MYSQL
const dbConfig = {
    host: MYSQL.host,
    user: MYSQL.user,
    password: MYSQL.password,
    database: MYSQL.database,
    debug: MYSQL.debug,
    port:MYSQL.port
}


const pool = mysql.createPool(dbConfig);
const query = promisify(pool.query).bind(pool)

export default {
    query
}














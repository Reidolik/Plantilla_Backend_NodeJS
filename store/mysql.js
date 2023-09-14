const mysql = require('mysql')
const { search } = require('../api/components/auth/network')
const config = require('../config')

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let connection

function handleConnection() {
    connection = mysql.createConnection(dbconf)

    connection.connect(err => {
        if (err) {
            console.error('[db error]', err)
            setTimeout(handleConnection, 200)
        } else {
            console.log('DB connected')
        }
    })

    connection.on('error', err => {
        console.error('[db error]', err)
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnection()
        } else {
            throw err
        }
    })
}

handleConnection()

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err)
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}

function update(table, data) {
    let propNames = Object.getOwnPropertyNames(data);
    for (let i = 0; i < propNames.length; i++) {
        let propName = propNames[i];
        if (data[propName] === null || data[propName] === undefined) {
            delete data[propName];
        }
    }
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

async function upsert(table, data) {
    let row = -1
    if (data.id) {
        row = await get(table, data.id);
    }
    if (row.length === 0 || !data.id) {
        return insert(table, data);
    } else {
        return update(table, data);
    }
}

function query(table, query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT auth.*, Colaborador.fechaCaducidad FROM ${table} LEFT JOIN Colaborador ON Colaborador.id = auth.id WHERE auth.?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}

// funciones especiales

// guate
function getAllBySearch(table, search) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT
        *
    FROM
        ${table}
    WHERE
        (
            nombre LIKE '%${search}%' OR 
            fecha_info LIKE '%${search}%' OR 
            cui LIKE '%${search}%' OR 
            nombre2 LIKE '%${search}%' OR 
            tipoorganizacion LIKE '%${search}%' OR 
            nit LIKE '%${search}%' OR 
            fecha_gc LIKE '%${search}%' OR 
            habilitado LIKE '%${search}%' OR 
            adjudicado LIKE '%${search}%' OR 
            contrasena LIKE '%${search}%' OR 
            escritura LIKE '%${search}%' OR 
            fechaconstitucion LIKE '%${search}%' OR 
            registromercantil LIKE '%${search}%' OR 
            registromercantildef LIKE '%${search}%' OR 
            inscripcionsat LIKE '%${search}%' OR 
            actividad_economica LIKE '%${search}%' OR 
            dom_departamento LIKE '%${search}%' OR 
            dom_municipio LIKE '%${search}%' OR 
            dom_direccion LIKE '%${search}%' OR 
            dom_telefono LIKE '%${search}%' OR
            paginaweb LIKE '%${search}%' OR 
            correo LIKE '%${search}%' OR 
            com_departamento LIKE '%${search}%' OR 
            com_municipio LIKE '%${search}%' OR 
            com_direccion LIKE '%${search}%' OR 
            com_telefono LIKE '%${search}%'
        )`, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

function getLimitedNameGuate(table, search) {
    let auxArr = search.split(' ')
    if (auxArr.length > 1) {
        let auxSt = `SELECT
        *
        FROM
        ${table}
        WHERE MATCH(nombre, nombre_uno, nombre_dos, apellido_uno, apellido_dos, apellido_casada)
        AGAINST('${auxArr[0]}')`
        for (let i = 1; i < auxArr.length; i++) {
            auxSt += `AND MATCH(nombre, nombre_uno, nombre_dos, apellido_uno, apellido_dos, apellido_casada) AGAINST('${auxArr[i]}')`
        }
        return new Promise((resolve, reject) => {
            connection.query(auxSt, (err, data) => {
                if (err) return reject(err)
                resolve(data)
            })
        })
    } else {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT
            *
        FROM
            ${table}
        WHERE MATCH(nombre, nombre_uno, nombre_dos, apellido_uno, apellido_dos, apellido_casada)
        AGAINST('${search}');`, (err, data) => {
                if (err) return reject(err)
                resolve(data)
            })
        })
    }
}

function getLimitedNameDetailGuate(table, firstname, secondname, firstlastname, secondlastname) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT
            *
        FROM
            ${table}
        WHERE MATCH(nombre, nombre_uno, nombre_dos, apellido_uno, apellido_dos, apellido_casada)
        AGAINST('${firstname}')
        ${secondname !== 'X4AC2Q' ? `AND MATCH(nombre, nombre_uno, nombre_dos, apellido_uno, apellido_dos, apellido_casada)
        AGAINST('${secondname}')` : ``}
        AND MATCH(nombre, nombre_uno, nombre_dos, apellido_uno, apellido_dos, apellido_casada)
        AGAINST('${firstlastname}')
        ${secondlastname !== 'X4AC2Q' ? `AND MATCH(nombre, nombre_uno, nombre_dos, apellido_uno, apellido_dos, apellido_casada)
        AGAINST('${secondlastname}')` : ``}`, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query,
    getAllBySearch,
    getLimitedNameGuate,
    getLimitedNameDetailGuate
}
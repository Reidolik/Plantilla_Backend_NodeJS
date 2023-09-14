const TABLA = 'Perfiles'

module.exports = function (injectedStore) {
    let store = injectedStore
    if (!store) {
        store = require('../../../store/mysql')
    }

    function list() {
        return store.list(TABLA)
    }

    function get(id) {
        return store.get(TABLA, id)
    }

    async function upsert(body) {
        const profile = {
            nombrePerfil: body.nombrePerfil,
            permisos: body.permisos
        }

        if (body.id) {
            profile.id = body.id
        }/* else {
            license.id = nanoid()
        } */

        return store.upsert(TABLA, profile)

    }

    return {
        list,
        get,
        upsert,
    }
}
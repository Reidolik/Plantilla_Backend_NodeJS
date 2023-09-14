const TABLA = 'guatecompras'

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

    // esta ya no deberia funcionar

    function getAllBySearch(search) {
        return store.getAllBySearch(TABLA, search)
    }

    // Busquedas sin limites

    function getAllByNitGuate(search) {
        return store.getAllByNitGuate(TABLA, search)
    }

    function getAllByNombretGuate(search) {
        return store.getAllByNombretGuate(TABLA, search)
    }

    function getAllByNombretGuateDetail(firstname, secondname, firstlastname, secondlastname) {
        return store.getAllByNombretGuateDetail(TABLA, firstname, secondname, firstlastname, secondlastname)
    }

    function getAllByCuiGuate(search) {
        return store.getAllByCuiGuate(TABLA, search)
    }

    function getAllByPhoneGuate(search) {
        return store.getAllByPhoneGuate(TABLA, search)
    }

    function getAllByOrgTypeGuate(search) {
        return store.getAllByOrgTypeGuate(TABLA, search)
    }

    function getAllBydirectionGuate(departamento, municipio, search) {
        return store.getAllBydirectionGuate(TABLA, departamento, municipio, search)
    }

    function searchDirection(search) {
        return store.searchDirection(TABLA, search)
    }

    function searchPhone(search) {
        return store.searchPhone(TABLA, search)
    }

    function searchLawyer(search, code) {
        return store.searchLawyer(TABLA, search, code)
    }

    function searchRepresentatives(search) {
        return store.searchRepresentatives(TABLA, search)
    }

    function searchLawyerID(search) {
        return store.searchLawyerID(TABLA, search)
    }

    function getMyRepreAbogado(idgc) {
        return store.getMyRepreAbogado(TABLA, idgc)
    }

    function getMyRepreAbogadoGCPerson(idgc) {
        return store.getMyRepreAbogadoGCPerson(TABLA, idgc)
    }

    function getMyRepreAbogado2(idgc) {
        return store.getMyRepreAbogado2(TABLA, idgc)
    }

    function getMyRepreAbogadoGCPerson2(idgc) {
        return store.getMyRepreAbogadoGCPerson2(TABLA, idgc)
    }

    function searchOtherCompanyRep(idgc) {
        return store.searchOtherCompanyRep(TABLA, idgc)
    }

    //busquedas con limites

    function getLimitedCuiGuate(search) {
        return store.getLimitedCuiGuate(TABLA, search)
    }

    function getLimitedNitGuate(search) {
        return store.getLimitedNitGuate(TABLA, search)
    }

    function getLimitedPhoneGuate(search) {
        return store.getLimitedPhoneGuate(TABLA, search)
    }

    function getLimitedNameGuate(search) {
        return store.getLimitedNameGuate(TABLA, search)
    }

    function getLimitedNameDetailGuate(firstname, secondname, firstlastname, secondlastname) {
        return store.getLimitedNameDetailGuate(TABLA, firstname, secondname, firstlastname, secondlastname)
    }

    async function upsert(body) {
        const guatecompra = {
            IDGC: body.IDGC,
            nombre: body.nombre,
            fecha_info: body.fecha_info,
            cui: body.cui,
            nombre2: body.nombre2,
            tipoorganizacion: body.tipoorganizacion,
            nit: body.nit,
            fecha_gc: body.fecha_gc,
            habilitado: body.habilitado,
            adjudicado: body.adjudicado,
            contrasena: body.contrasena,
            escritura: body.escritura,
            fechaconstitucion: body.fechaconstitucion,
            registromercantil: body.registromercantil,
            registromercantildef: body.registromercantildef,
            inscripcionsat: body.inscripcionsat,
            actividad_economica: body.actividad_economica,
            dom_departamento: body.dom_departamento,
            dom_municipio: body.dom_municipio,
            dom_direccion: body.dom_direccion,
            dom_telefono: body.dom_telefono,
            dom_fax: body.dom_fax,
            paginaweb: body.paginaweb,
            correo: body.correo,
            com_departamento: body.com_departamento,
            com_municipio: body.com_municipio,
            com_direccion: body.com_direccion,
            com_telefono: body.com_telefono,
            com_fax: body.com_fax,
            sys_fecharegistro: body.sys_fecharegistro
        }

        if (body.id) {
            guatecompra.id = body.id
        }

        return store.upsert(TABLA, guatecompra)
    }

    return {
        list,
        get,
        upsert,
        getAllBySearch,
        getAllByNitGuate,
        getAllByNombretGuate,
        getAllByCuiGuate,
        getAllByPhoneGuate,
        getAllByOrgTypeGuate,
        getAllBydirectionGuate,
        searchDirection,
        searchPhone,
        searchLawyer,
        searchRepresentatives,
        searchLawyerID,
        getAllByNombretGuateDetail,
        getMyRepreAbogado,
        getMyRepreAbogadoGCPerson,
        searchOtherCompanyRep,
        getMyRepreAbogado2,
        getMyRepreAbogadoGCPerson2,
        getLimitedCuiGuate,
        getLimitedNameGuate,
        getLimitedNameDetailGuate,
        getLimitedNitGuate,
        getLimitedPhoneGuate
    }
}
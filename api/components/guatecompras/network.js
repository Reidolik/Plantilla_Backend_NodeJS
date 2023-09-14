const express = require('express')
const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router()


//Lista de rutas
router.get('/', list)
router.get('/:id', get)
router.get('/fullsearch/:search', getAllBySearch)
router.get('/nitsearch/:search', getAllByNitGuate)
router.get('/namesearch/:firstname/:secondname/:firstlastname/:secondlastname', getAllByNombretGuateDetail)
router.get('/namesearch2/:search', getAllByNombretGuate)
router.get('/cuisearch/:search', getAllByCuiGuate)
router.get('/phonesearch/:search', getAllByPhoneGuate)
router.get('/orgtypesearch/:search', getAllByOrgTypeGuate)
router.get('/directionsearch/:departamento/:municipio/:search', getAllBydirectionGuate)
router.get('/otherdirections/:search', searchDirection)
router.get('/otherphones/:search', searchPhone)
router.get('/otherlawyers/:search/:code', searchLawyer)
router.get('/otherreps/:search', searchRepresentatives)
router.get('/slawyerid/:search', searchLawyerID)
router.get('/myreprelawyer/:idgc', getMyRepreAbogado)
router.get('/myreprelawyerPersonGC/:idgc', getMyRepreAbogadoGCPerson)
router.get('/myreprelawyerPersonGC2/:idgc', getMyRepreAbogadoGCPerson2)
router.get('/myreprelawyer2/:idgc', getMyRepreAbogado2)
router.get('/othercompanyrep/:idgc', searchOtherCompanyRep)
router.get('/limitedcui/:search', getLimitedCuiGuate)
router.get('/limitedname/:search', getLimitedNameGuate)
router.get('/limitednamedetail/:firstname/:secondname/:firstlastname/:secondlastname', getLimitedNameDetailGuate)
router.get('/limitednit/:search', getLimitedNitGuate)
router.get('/limitedphone/:search', getLimitedPhoneGuate)
router.post('/', upsert)

function list(req, res, next) {
    controller.list()
        .then(lista => {
            response.success(req, res, lista, 200)
        })
        .catch(next);
}

function get(req, res, next) {
    controller.get(req.params.id)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getAllBySearch(req, res, next) {
    controller.getAllBySearch(req.params.search)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getAllByNitGuate(req, res, next) {
    controller.getAllByNitGuate(req.params.search)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getAllByNombretGuate(req, res, next) {
    controller.getAllByNombretGuate(req.params.search)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getAllByNombretGuateDetail(req, res, next) {
    controller.getAllByNombretGuateDetail(req.params.firstname, req.params.secondname, req.params.firstlastname, req.params.secondlastname)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getAllByCuiGuate(req, res, next) {
    controller.getAllByCuiGuate(req.params.search)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getAllByPhoneGuate(req, res, next) {
    controller.getAllByPhoneGuate(req.params.search)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getAllByOrgTypeGuate(req, res, next) {
    controller.getAllByOrgTypeGuate(req.params.search)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getAllBydirectionGuate(req, res, next) {
    controller.getAllBydirectionGuate(req.params.departamento, req.params.municipio, req.params.search)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function searchDirection(req, res, next) {
    controller.searchDirection(req.params.search)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function searchPhone(req, res, next) {
    controller.searchPhone(req.params.search)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function searchLawyer(req, res, next) {
    controller.searchLawyer(req.params.search, req.params.code)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function searchRepresentatives(req, res, next) {
    controller.searchRepresentatives(req.params.search)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function searchLawyerID(req, res, next) {
    controller.searchLawyerID(req.params.search)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getMyRepreAbogado(req, res, next) {
    controller.getMyRepreAbogado(req.params.idgc)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getMyRepreAbogadoGCPerson(req, res, next) {
    controller.getMyRepreAbogadoGCPerson(req.params.idgc)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getMyRepreAbogado2(req, res, next) {
    controller.getMyRepreAbogado2(req.params.idgc)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getMyRepreAbogadoGCPerson2(req, res, next) {
    controller.getMyRepreAbogadoGCPerson2(req.params.idgc)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function searchOtherCompanyRep(req, res, next) {
    controller.searchOtherCompanyRep(req.params.idgc)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

// busquedas con limites

function getLimitedCuiGuate(req, res, next) {
    controller.getLimitedCuiGuate(req.params.search)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getLimitedNitGuate(req, res, next) {
    controller.getLimitedNitGuate(req.params.search)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getLimitedPhoneGuate(req, res, next) {
    controller.getLimitedPhoneGuate(req.params.search)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getLimitedNameGuate(req, res, next) {
    controller.getLimitedNameGuate(req.params.search)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function getLimitedNameDetailGuate(req, res, next) {
    controller.getLimitedNameDetailGuate(req.params.firstname, req.params.secondname, req.params.firstlastname, req.params.secondlastname)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function upsert(req, res, next) {
    controller.upsert(req.body)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

module.exports = router
// import controllers review, products
const employeeController = require('../controllers/employee.controller')
const auth = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');

// router
const router = require('express').Router()

const storage = multer.diskStorage({
    destination: 'images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage: storage }).array('files')

// use routers
router.post('/createEmployee',[auth], employeeController.createEmployee);

router.get('/pagination',[auth],employeeController.pagination);

router.get('/sorting', [auth], employeeController.sorting);

router.get('/fullTextSearch', [auth], employeeController.fullTextSearch);

router.post('/addimage/:id',[auth],upload, employeeController.uploadEmployee);

router.get('/getAllEmployees',[auth], employeeController.getAllEmployees);

router.get('/:id',[auth], employeeController.getOneEmployee);

router.put('/:id',[auth], employeeController.updateEmployee);

router.delete('/:id',[auth], employeeController.deleteEmployee);

module.exports = router;
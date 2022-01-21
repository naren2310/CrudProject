// import controllers review, products
const managerController = require('../controllers/manager.controller')
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


router.post('/addManager',upload,managerController.registerManager);                     

router.post('/addimage/:id',upload, managerController.uploadManager);

router.post('/login', managerController.login);

router.get('/:id',[auth], managerController.getOneManager)

router.put('/:id',[auth], managerController.updateManager)

router.delete('/:id',[auth], managerController.deleteManager)

module.exports = router;
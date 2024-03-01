var express = require('express');
var router = express.Router();
const contactsController = require('../controllers/contactsControllers');
const { body } = require('express-validator');


// GET contacts listing
router.get('/list', contactsController.contacts_list);

// GET contacts add
router.get('/add', contactsController.contacts_create_get);

// POST contacts delete 
router.post('/:id/delete', contactsController.contacts_delete_post);

// GET contacts view
router.get('/:id', contactsController.contact_detail);

// GET contacts edit
router.get('/:id/edit', contactsController.contacts_edit_get);

// POST contacts add
router.post('/', 
body('first_name').trim().notEmpty().withMessage('First Name can not be empty!'), 
body('last_name').trim().notEmpty().withMessage('Last Name can not be empty!'), 
body('email').trim().not().isEmpty().withMessage('Email address can not be empty!').isEmail().withMessage('Email must be a valid email address!'),
contactsController.contacts_create_post);

// POST contacts edit
router.post('/:id/edit',
body('first_name').trim().notEmpty().withMessage('First Name can not be empty!'), 
body('last_name').trim().notEmpty().withMessage('Last Name can not be empty!'), 
body('email').trim().not().isEmpty().withMessage('Email address can not be empty!').isEmail().withMessage('Email must be a valid email address!'),
contactsController.contacts_edit_post);

module.exports = router;

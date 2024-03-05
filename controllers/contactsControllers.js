const contactsRepo = require('../src/contactsRepo');
const Contact = require('../models/contacts.js')
const { validationResult } = require('express-validator');

/* GET contacts listing. */
exports.contacts_list = function(req, res, next) {
    const data = contactsRepo.findAll();
    res.render('contacts/list', { title: 'Contacts', contacts: data } );
};

/* GET contacts add */
exports.contacts_create_get = function(req, res, next) {
    res.render('contacts/add', { title: 'Add a Contact'} );
};

/* GET a contact */
exports.contact_detail = function(req, res, next) {
    const contact = contactsRepo.findById(req.params.id);
    if (contact) {
      res.render('contacts/view', { title: 'Contact', contact: contact} );
    } else {
      res.redirect('contacts/list');
    }
};

/* GET contacts edit */
exports.contacts_edit_get = function(req, res, next) {
    const contact = contactsRepo.findById(req.params.id);
    res.render('contacts/add', { title: 'Edit Contact', layout: 'edit', contact: contact} );
};

/* POST contacts delete */
exports.contacts_delete_post = function(req, res, next) {
    contactsRepo.deleteById(req.params.id);
    res.redirect('/contacts/list');
};

/* POST contacts add */
exports.contacts_create_post = function(req, res, next) {
    const result = validationResult(req);
    const {first_name, last_name, email, notes} = req.body
    if (!result.isEmpty()) {
        res.render('contacts/add', {title: 'Add a Contact', msg: result.array(), contact: {first_name, last_name, email, notes}});
    } else {
        const newContact = new Contact('', first_name, last_name, email, notes);
        contactsRepo.create(newContact);
        res.redirect('/contacts/list');
    }
};

// Post contact edit
exports.contacts_edit_post = function(req, res, next) {
    const result = validationResult(req);
    const {first_name, last_name, email, notes} = req.body
    if (!result.isEmpty()) {
      const contact = contactsRepo.findById(req.params.id);
      res.render('contacts/add', {title: 'Edit Contact', layout: 'edit', msg: result.array(), contact: {...contact, first_name, last_name, email, notes}});
    } else {
        const updatedContact = new Contact(req.params.id, first_name, last_name, email, notes);
        contactsRepo.update(updatedContact);
        res.redirect('/contacts/list');
    }
  };
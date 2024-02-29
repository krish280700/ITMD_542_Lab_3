var express = require('express');
var router = express.Router();
const contactsJSON = require('../crud.js');
const contactsController = require('../controllers/contactsControllers');
const { body } = require('express-validator');


// GET todos listing
router.get('/list', contactsController.contacts_list);

// GET todos add
router.get('/add', contactsController.contacts_create_get);

// POST todos delete 
router.post('/:id/delete', contactsController.contacts_delete_post);

// 
router.get('/:id', contactsController.contact_detail);

/* POST todos add */
router.post('/', 
body('first_name').trim().notEmpty().withMessage('First Name can not be empty!'), 
body('last_name').trim().notEmpty().withMessage('Last Name can not be empty!'), 
body('email').trim().not().isEmpty().withMessage('Email address can not be empty!').isEmail().withMessage('Email must be a valid email address!'),
contactsController.contacts_create_post);

// 
router.get('/:id/edit', contactsController.contacts_edit_get);

// 
router.post('/:id/edit',
body('first_name').trim().notEmpty().withMessage('First Name can not be empty!'), 
body('last_name').trim().notEmpty().withMessage('Last Name can not be empty!'), 
body('email').trim().not().isEmpty().withMessage('Email address can not be empty!').isEmail().withMessage('Email must be a valid email address!'),
contactsController.contacts_edit_post);


// router.get('/edit', (req, res) => {
//   const contact = {}
//   res.render('contacts/add', { contact, layout: 'add' });});
// router.get('/view', (req, res) => {
//   res.render('contacts/view');
// });

// Edit Module
// router.get('/:id/edit', (req, res) => {
//   try {
//     const { id } = req.params;
//     const contact = contactsJSON.getContactById(id);

//     if (!contact) {
//       // Handle the case where the contact is not found
//       res.status(404).send('Contact not found');
//       return;
//     }

//     res.render('contacts/add', { contact, layout: 'edit' });
//   } catch (error) {
//     console.error('Error retrieving contact for editing:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// Route to handle creating a new contact
// router.post('/', (req, res) => {
//   try {
//     // Validate the form data
//     if (!validateContactData(req.body)) {
//       const contacts = contactsJSON.getAllContacts();
//       return res.render('contacts/add', { errorMessage: 'Please fill in all required fields.', contacts, layout: 'layout' });
//     }

//     const sanitizedData = sanitizeContactData(req.body);

//     const newContact = new Contact(sanitizedData.fName, sanitizedData.lName, sanitizedData.email, sanitizedData.notes);
  
//     const createdContact = contactsJSON.createContact(newContact);
//     if (!createdContact) {
//       return res.status(500).send('Failed to create contact');
//     }
//     res.redirect('/contacts/list');
//   } catch (error) {
//     console.error('Error creating contact:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// router.get('/:id', (req, res) => {
//   try {
//     const { id } = req.params;
//     const contact = contactsJSON.getContactById(id);
//     if (!contact) {
//       // Handle the case where the contact is not found
//       res.status(404).send('Contact not found');
//       return;
//     }
//     // Format createdAt and updatedAt dates for better readability
//     const formattedContact = {
//       ...contact,
//       createdAt: new Date(contact.createdAt).toLocaleString(),
//       updatedAt: new Date(contact.updatedAt).toLocaleString(),
//     };
//     res.render('contacts/view', { contact: formattedContact, layout: 'layout' });
//     } catch (error) {
//       console.error('Error retrieving contact:', error);
//       res.status(500).send('Internal Server Error');
//     }
// });

// Route to handle deleting a contact
// router.post('/:id/delete', (req, res) => {
//   try {
//     const { id } = req.params;

//     // Attempt to delete the contact
//     const success = contactsJSON.deleteContact(id);

//     if (!success) {
//       // Handle the case where the contact deletion fails
//       res.status(500).send('Failed to delete contact');
//       return;
//     }
//     res.redirect('/contacts/list');
//   } catch (error) {
//     console.error('Error deleting contact:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// updating an existing contact
// router.post('/:id', (req, res) => {
//   try {
//     const { id } = req.params;
//     const { firstName, lastName, emailAddress, notes } = req.body;

//     // Validation
//     if (!validateContactData(req.body)) {
//       const contact = contactsJSON.getContactById(id);
//       return res.render('contacts/add', { errorMessage: 'Please fill in all required fields.', contact, layout: 'layout' });
//     }

//     const sanitizedData = sanitizeContactData(req.body);

//     const existingContact = contactsJSON.getContactById(id);

//     if (!existingContact) {
//       // Handle the case where the contact is not found
//       res.status(404).send('Contact not found');
//       return;
//     }

//     // Update the existing contact
//     existingContact.fName = sanitizedData.fName;
//     existingContact.lName = sanitizedData.lName;
//     existingContact.email = sanitizedData.email;
//     existingContact.notes = sanitizedData.notes;

//     // Attempt to update the contact
//     const success = contactsJSON.updateContact(existingContact);

//     if (!success) {
//       // Handle the case where the contact update fails
//       return res.status(500).send('Failed to update contact');
//     }

//     res.redirect(`/contacts/${id}`);
//   } catch (error) {
//     console.error('Error updating contact:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
module.exports = router;

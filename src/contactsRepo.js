const path = require('node:path');
const Contacts = require('../models/contacts');
const betterSqlite3 = require('better-sqlite3');

const db = new betterSqlite3(path.join(__dirname, '../data/contacts.sqlite'), { verbose: console.log });

const createStmt = db.prepare("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name, last_name, email, notes, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
createStmt.run();

const repo = {
    findAll: () => {
        const stmt = db.prepare("SELECT * FROM contacts");
        const rows = stmt.all();
        let contacts = [];
        rows.forEach((row) => {
            const aContact = new Contacts(row.id, row.first_name, row.last_name, row.email, row.notes);
            contacts.push(aContact);
        });
        return contacts;
    },
    findById: (id) => {
        const stmt = db.prepare("SELECT * FROM contacts WHERE id = ?");
        const row = stmt.get(id);
        return new Contacts(row.id, row.first_name, row.last_name, row.email, row.notes);
    },
    create: (data) => {
        const {first_name, last_name, email, notes} = data
        const stmt = db.prepare(`INSERT INTO contacts (first_name, last_name, email, notes) VALUES (? , ?, ?, ?)`);
        const info = stmt.run(first_name, last_name, email, notes);
        console.log(`Contact created with id: ${info.lastInsertRowid}`);
    },
    deleteById: (id) => {
        const stmt = db.prepare("DELETE FROM contacts WHERE id = ?");
        const info = stmt.run(id);
        console.log(`Rows affected: ${info.changes}`);
    },
    update: (contact) => {
        const {id, first_name, last_name, email, notes} = contact
        const stmt = db.prepare("UPDATE contacts SET first_name = ?, last_name = ?, email = ?, notes = ? WHERE id = ?");
        const info = stmt.run(first_name, last_name, email, notes, id);
        console.log(`Rows affected: ${info.changes}`);
    },

};

module.exports = repo;
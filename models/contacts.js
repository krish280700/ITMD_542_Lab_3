class Contact {
    constructor(id, first_name, last_name, email, notes) {
      this.id = id
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email || '';
      this.notes = notes || '';
      this.created_at = new Date().toLocaleString();
      this.modified_at = new Date().toLocaleString();
    }
  }
  
  
module.exports = Contact;
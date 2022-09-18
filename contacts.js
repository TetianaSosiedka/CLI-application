const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const writeFile = async (newData) =>
  await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const idToString = String(contactId);
  const contactById = allContacts.find((item) => item.id === idToString);
  return contactById || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const idToString = String(contactId);
  const index = allContacts.findIndex((item) => item.id === idToString);
  if (index === -1) {
    return null;
  }
  const [removedContact] = allContacts.splice(index, 1);
  writeFile(allContacts);
  return removedContact;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  writeFile(allContacts);
  return newContact;
}

listContacts();

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

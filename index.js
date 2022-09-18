//console.log("My first home task for node.js");

const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;
    case "get":
      const contactById = await contacts.getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log("Found contact: ", contactById);
      break;
    case "remove":
      const removedContact = await contacts.removeContact(id);
      if (!removedContact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log("Deleted contact: ", removedContact);
      break;
    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log("New contact: ", newContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);

//{
//   name: "Tetiana Sosiedka",
//   email: "tasha.sosedka@gmail.com",
//   phone: "(068) 961-1240",
// }

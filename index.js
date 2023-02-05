const contactsOperation = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactsOperation.listContacts();
      console.log(contacts);
      break;

    case 'get':
      const contactByID = await contactsOperation.getContactById(id);
      console.log(contactByID);
      if (!contactByID) {
        throw new Error(`product with id={id} not found`);
      }
      break;

    case 'add':
      const contactAdd = await contactsOperation.addContact(name, email, phone);
      console.log(contactAdd);
      break;

    case 'remove':
      const contactRemove = await contactsOperation.removeContact(id);
      console.log(contactRemove);
      if (!contactRemove) {
        throw new Error(`product with id={id} not found`);
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

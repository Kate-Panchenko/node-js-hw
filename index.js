const db = require("./contacts");

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

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const allContacts = await db.listContacts();
			return console.table(allContacts);

		case "get":
			const getContacts = await db.getContactById(id);
			return console.table(getContacts);

		case "add":
			const addContact = await db.addContact(name, email, phone);
			return console.table(addContact);

		case "remove":
			const removeContact = await db.removeContact(id);
			return console.table(removeContact);

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);

"use strict";

const contacts = [
    {name: "Don John", phone: "12-322-622", email: "don.john@ymail.com"},
    {name: "Elizabeth Westland", phone: "66-112-312", email: "e47wl@outlook.com"},
    {name: "John Smith", phone: "12-345-678", email: "john.smith@gmail.com"},
    {name: "Anna Bell", phone: "23-456-789", email: "anna.bell@example.com"},
    {name: "Michael Roe", phone: "34-567-890", email: "michael.roe@example.com"},
    {name: "Samantha Dawn", phone: "45-678-901", email: "s.dawn@example.com"},
    {name: "David York", phone: "56-789-012", email: "d.york@example.com"},
    {name: "Jessica Ray", phone: "67-890-123", email: "jessica.ray@example.com"},
    {name: "Oliver Twist", phone: "78-901-234", email: "o.twist@example.com"},
    {name: "Charlotte King", phone: "89-012-345", email: "charlotte.king@example.com"},
];

const sortIcon = document.getElementById('sort-icon');
const addIcon = document.getElementById('add-icon');
const configIcon = document.getElementById('config-icon');
const searchBar = document.getElementById('search-bar');
const dropdownMenu = document.getElementById('dropdown-menu');

sortIcon.addEventListener('click', () => {
    toggleSortIcon();
    sortContacts();
});

addIcon.addEventListener('click', () => {
    displayAddNewContactMenu();
})

configIcon.addEventListener('click', () => {
    displayConfigMenu();
})

function displayConfigMenu() {
    const configMenu = document.getElementById('config-menu');
    const configButton = document.getElementById('config-button');
    const exitConfig = document.getElementById('exit-config');

    configMenu.style.display = "flex";

    // helper functions for handling click events
    const handleConfigButtonClick = () => {
        const fontValue = document.getElementById('update-font').value;
        const sizeValue = document.getElementById('update-size').value.trim();

        if (fontValue) {
            document.body.style.fontFamily = fontValue;
        }

        if (sizeValue) {
            document.body.style.fontSize = sizeValue + 'px';
        }
    }

    const handleExitMenuClick = () => {
        configMenu.style.display = "none";
        configButton.removeEventListener('click', handleConfigButtonClick);
        exitConfig.removeEventListener('click', handleExitMenuClick);
    }

    // Event listenders
    configButton.addEventListener('click', handleConfigButtonClick);
    exitConfig.addEventListener('click', handleExitMenuClick);
}

searchBar.addEventListener('input', () => {
    searchForContact(searchBar.value);
});

dropdownMenu.addEventListener('change', sortContacts);

function displayAddNewContactMenu() {
    const addContactMenu = document.getElementById('add-entry');
    const addEntryButton = document.getElementById('add-entry-button');
    const exitAddEntryButton = document.getElementById('exit-add-entry');

    addContactMenu.style.display = "flex";

    // helper functions for handling click events
    const handleAddEntryClick = () => {
        addNewContact();
        addEntryButton.removeEventListener('click', handleAddEntryClick);
    }

    const handleExitAddEntryClick = () => {
        addContactMenu.style.display = "none";
        addEntryButton.removeEventListener('click', handleAddEntryClick);
    }

    // Event listenders
    addEntryButton.addEventListener('click', handleAddEntryClick);
    exitAddEntryButton.addEventListener('click', handleExitAddEntryClick);
}

function addNewContact() {
    const enteredName = document.getElementById('add-name');
    const enteredTel = document.getElementById('add-tel');
    const enteredEmail = document.getElementById('add-email');

    const telRegEx = /^[0-9-\s]+$/;
    const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const isValidName = enteredName?.value != '';
    const isValidTel = enteredTel?.value != '' && telRegEx.test(enteredTel?.value);
    const isValidEmail = enteredEmail?.value != '' && emailRegEx.test(enteredEmail?.value);

    if (!(isValidName && isValidTel || isValidEmail)) {
        alert('invalid contact info');
        return;
    }

    const newContact = {};

    newContact.name = isValidName ? enteredName.value : '';
    newContact.phone = isValidTel ? enteredTel.value : '';
    newContact.email = isValidEmail ? enteredEmail.value : '';

    contacts.push(newContact);

    document.getElementById('add-entry').style.display = "none";
    renderContacts();
}

function searchForContact(typedCharacters) {
    const filteredContacts = []
    
    contacts.forEach(contact => {
        for (const key in contact) {
            if (contact[key].toString().toLowerCase().includes(typedCharacters.toLowerCase())) {
                filteredContacts.push(contact);
                break;
            }
        }
    })

    filteredContacts.forEach(contact => console.log(contact.name));
    renderContacts(filteredContacts);
}

function renderContacts(contactList = contacts) {
    const section = document.getElementById('entries');
    section.innerHTML = ''; // Restes content
    const ul = document.createElement('ul');
    ul.className = 'contact-list';

    contactList.forEach((contact, index) => {
        const li = document.createElement('li');
        li.className = 'contact-item';

        const contactInfoDiv = document.createElement('div');
        contactInfoDiv.className = 'contact-info';

        const nameDiv = document.createElement('div');
        nameDiv.className = 'name';
        nameDiv.textContent = contact.name;

        const phoneDiv = document.createElement('div');
        phoneDiv.className = 'phone';
        phoneDiv.textContent = contact.phone;

        const emailLink = document.createElement('a');
        emailLink.href = `mailto:${contact.email}`;
        emailLink.className = 'email';
        emailLink.textContent = contact.email;

        contactInfoDiv.appendChild(nameDiv);
        contactInfoDiv.appendChild(phoneDiv);
        contactInfoDiv.appendChild(emailLink);

        const contactActionsDiv = document.createElement('div');
        contactActionsDiv.className = 'contact-actions';

        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit';
        editIcon.addEventListener('click', () => modifyEntry(index));

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash-alt';
        deleteIcon.addEventListener('click', () => deleteContact(index));

        contactActionsDiv.appendChild(editIcon);
        contactActionsDiv.appendChild(deleteIcon);

        li.appendChild(contactInfoDiv);
        li.appendChild(contactActionsDiv);

        ul.appendChild(li);
    });

    section.innerHTML = '';
    section.appendChild(ul);
}

function deleteContact(index) {
    const contact = contacts[index]
    const text = `You are about to delete ${contact.name} from the address book.\nPress "ok" to proceed`
    const isConfirmed = confirm(text)

    if (isConfirmed) {
        console.log('isConfirmed')
        contacts.splice(index, 1);
        renderContacts();
    }
}

function modifyEntry(index) {
    const contact = contacts[index];
    const editmeny = document.getElementById('modify-entry');
    const modifyEntryButton = document.getElementById('modify-entry-button');
    const exitModifyEntryButton = document.getElementById('exit-modify-entry');

    editmeny.style.display = "flex";

    modifyEntryButton.addEventListener('click', () => {
        handleModifyEntryClick(contact)
    });

    exitModifyEntryButton.addEventListener('click', () => {
        editmeny.style.display = "none";
    })
}

function handleModifyEntryClick(contact) {
    const name = document.getElementById('edit-name')
    const tel = document.getElementById('edit-tel')
    const email = document.getElementById('edit-email')

    contact.name = name?.value ? name.value : contact.name;
    contact.phone = tel?.value ? tel.value : contact.phone;
    contact.email = email?.value ? email.value : contact.email;

    document.getElementById('modify-entry').style.display = "none";
    renderContacts();
}

// Initial rendering of contacts
renderContacts();

function sortContacts() {
    const sortDirection = sortIcon.classList.contains('fa-sort-alpha-down') ? 'ascending' : 'descending';
    const sortParameter = dropdownMenu.options[dropdownMenu.selectedIndex].value;

    contacts.sort((a, b) => {
        let aValue = (a[sortParameter] && typeof a[sortParameter] === 'string') ? a[sortParameter] : '';
        let bValue = (b[sortParameter] && typeof b[sortParameter] === 'string') ? b[sortParameter] : '';

        // Sorting logic
        if (sortDirection === 'descending') {
            return bValue.localeCompare(aValue);
        } else {
            return aValue.localeCompare(bValue);
        }
    });

    contacts.forEach(contact => console.log(contact.name));
    renderContacts();
}

function toggleSortIcon() {
    sortIcon.classList.toggle('fa-sort-alpha-down');
    sortIcon.classList.toggle('fa-sort-alpha-up-alt');
}


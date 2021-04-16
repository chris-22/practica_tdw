function Product(name, birth, img, wiki) {
    this.type = "Product";
    this.name = name;
    this.birth = birth;
    this.img = img;
    this.wiki = wiki;
    this.persons = [];
    this.entities = [];
}
function Entity(name, birth, img, wiki) {
    this.type = "Entity";
    this.name = name;
    this.birth = birth;
    this.img = img;
    this.wiki = wiki;
    this.persons = [];
}
function Person(name, birth, img, wiki) {
    this.type = "Person";
    this.name = name;
    this.birth = birth;
    this.img = img;
    this.wiki = wiki;
}

let html = new Product("HTML", "1993", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/230px-HTML5_logo_and_wordmark.svg.png", "https://es.wikipedia.org/wiki/HTML");
let css = new Product("CSS", "17/12/1996", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/165px-CSS3_logo_and_wordmark.svg.png", "https://es.wikipedia.org/wiki/Hoja_de_estilos_en_cascada");
let ibm = new Entity("IBM", "16/06/1911", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/368px-IBM_logo.svg.png", "https://es.wikipedia.org/wiki/IBM");
let w3c = new Entity("World Wide Web Consortium", "1/10/1994", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/W3C%C2%AE_Icon.svg/368px-W3C%C2%AE_Icon.svg.png", "https://es.wikipedia.org/wiki/World_Wide_Web_Consortium")
let alanTuring = new Person("Alan Turing", "23/06/1912", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/330px-Alan_Turing_Aged_16.jpg", "https://es.wikipedia.org/wiki/Alan_Turing");
let timBerners = new Person("Timothy John Berners-Lee", "8/6/1955", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg/330px-Sir_Tim_Berners-Lee_%28cropped%29.jpg", "https://es.wikipedia.org/wiki/Tim_Berners-Lee");

let products = [html, css];
let entities = [ibm, w3c];
let persons = [alanTuring, timBerners];
let index = [products, entities, persons];

html.entities = [1];
w3c.persons = [1];

let loged = false;

let loginForm = '<div id="loginForm" class="col-sm-6 align-self-center">' +
    '<form class="row justify-content-end">' +
    '<div class="col-sm-4">' +
    '<input type="text" class="form-control" id="userInput" placeholder="Usuario">' +
    '</div>' +
    '<div class="col-sm-4">' +
    '<input type="password" class="form-control" id="passwordInput" placeholder="Contraseña">' +
    '</div>' +
    '<div class="col-sm-auto">' +
    '<input type="button" id="loginButton" class="btn btn-primary" value="Login" onclick="checkLogin()">' +
    '</div>' +
    '</form>' +
    '</div>';

let writerButtons = '<div id="writerButtons" class="col-sm-auto align-self-center">' +
    '<div class="row justify-content-end">' +
    '<div id="addProductButtonColumn" class="col-sm-auto align-self-center">' +
    '<input type="button" id="addProductButton" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal" value="Añadir Producto" onclick="showAddProductForm()">' +
    '</div>' +
    '<div id="addEntityColumn" class="col-sm-auto align-self-center">' +
    '<input type="button" id="addEntityButton" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal" value="Añadir Entidad" onclick="showAddEntityForm()">' +
    '</div>' +
    '<div id="addPersonColumn" class="col-sm-auto align-self-center">' +
    '<input type="button" id="addPersonButton" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal" value="Añadir Persona" onclick="showAddPersonForm()">' +
    '</div>' +
    '<div id="logoutButtonColumn" class="col-sm-auto align-self-center">' +
    '<input type="button" id="logoutButton" class="btn btn-danger" value="Logout" onclick="logout()">' +
    '</div>' +
    '</div>' +
    '</div>';

let entitiesAuxList = [];
let personsAuxList = [];

function onLoad() {
    let body = document.body;
    let main = document.createElement("main");
    let header = document.getElementById("headerRow");

    if (localStorage.getItem("users") === null)
        loadUsers();
    if (localStorage.getItem("index") === null)
        loadIndex();
    main.appendChild(buildIndexGrid());
    header.innerHTML += loginForm;
    body.appendChild(main);
    browsingHistory = [];
}

function loadUsers() {
    let users = JSON.stringify(
        {
            "users": [
                { "name": "x", "password": "x" },
                { "name": "y", "password": "y" },
                { "name": "z", "password": "z" }
            ]
        }
    );

    localStorage.setItem("users", users);
}

function loadIndex() {
    let _index = JSON.stringify(index);
    localStorage.setItem("index", _index);
}

function buildIndexGrid() {
    let index = JSON.parse(localStorage.getItem("index"));
    let container = document.createElement("div");
    let productsColumn = buildColumnCards(index[0]);
    let entitiesColumn = buildColumnCards(index[1]);
    let personsColumn = buildColumnCards(index[2]);

    container.className = "row align-items-start p-3 m-0";
    container.id = "indexGrid";
    productsColumn.className = "col-sm-4 p-0";
    productsColumn.id = "productsColumn";
    entitiesColumn.className = "col-sm-4 p-0";
    entitiesColumn.id = "entitiesColumn";
    personsColumn.className = "col-sm-4 p-0";
    personsColumn.id = "personsColumn";

    container.append(productsColumn, entitiesColumn, personsColumn);

    return container;
}

function buildColumnCards(list) {
    let column = document.createElement("div");

    for (let i = 0; i < list.length; i++) {
        let element = list[i];
        let card = buildCard(element, i);
        column.appendChild(card);
    }

    return column;
}

function buildCard(element, elementPosition) {
    let card = document.createElement("div");
    let cardBody = document.createElement("div");
    let cardBodyRow = document.createElement("div");
    let imageColumn = document.createElement("div");
    let textColumn = document.createElement("div");
    let paragraph = document.createElement("p");
    let elementLogo = document.createElement("img");
    let elementName = document.createTextNode(element.name);

    card.className = "card m-2 cardItem";
    card.id = elementPosition;
    cardBody.className = "card-body"
    cardBody.setAttribute("onclick", "goTo" + element.type + "Page(" + elementPosition + ")");
    cardBodyRow.className = "row justify-content-between p-3";
    imageColumn.className = "col-sm-3 align-self-center";
    textColumn.className = "col-sm-auto align-self-center";
    elementLogo.className = "img-fluid rounded";
    elementLogo.src = element.img;

    imageColumn.appendChild(elementLogo);
    paragraph.appendChild(elementName);
    textColumn.appendChild(paragraph);
    cardBodyRow.append(imageColumn, textColumn);
    cardBody.appendChild(cardBodyRow);
    card.appendChild(cardBody);

    return card;
}

function checkLogin() {
    let user = document.getElementById("userInput").value;
    let password = document.getElementById("passwordInput").value;
    let users = JSON.parse(localStorage.getItem("users")).users;

    for (savedUser of users) {
        if (user === savedUser.name && password === savedUser.password)
            login();
    }
}

function login() {
    changeLoginFormToWriterButtons();
    addEditButtons();
    loged = true;
}

function changeLoginFormToWriterButtons() {
    let header = document.getElementById("headerRow");
    let loginForm = document.getElementById("loginForm");

    header.removeChild(loginForm);
    header.innerHTML += writerButtons;
}

function addEditButtons() {
    addEditButtonsToProductCards();
    addEditButtonsToEntityCards();
    addEditButtonsToPersonCards();
}

function addEditButtonsToProductCards() {
    let productCards = Array.from(document.getElementById("productsColumn").children);

    productCards.map(function (card) {
        let buttons = buildEditButtons();
        let editButton = buttons.children[0];
        let removeButton = buttons.children[1];
        editButton.setAttribute("onclick", "showEditProductForm(" + card.id + ")");
        removeButton.setAttribute("onclick", "removeProductOfIndex(" + card.id + ")");
        card.appendChild(buttons);
    });
}

function addEditButtonsToEntityCards() {
    let entityCards = Array.from(document.getElementById("entitiesColumn").children);

    entityCards.map(function (card) {
        let buttons = buildEditButtons();
        let editButton = buttons.children[0];
        let removeButton = buttons.children[1];
        editButton.setAttribute("onclick", "showEditEntityForm(" + card.id + ")");
        removeButton.setAttribute("onclick", "removeEntityOfIndex(" + card.id + ")");
        card.appendChild(buttons);
    });
}

function addEditButtonsToPersonCards() {
    let personCards = Array.from(document.getElementById("personsColumn").children);

    personCards.map(function (card) {
        let buttons = buildEditButtons();
        let editButton = buttons.children[0];
        let removeButton = buttons.children[1];
        editButton.setAttribute("onclick", "showEditPersonForm(" + card.id + ")");
        removeButton.setAttribute("onclick", "removePersonOfIndex(" + card.id + ")");
        card.appendChild(buttons);
    });
}

function buildEditButtons() {
    let buttonsRow = document.createElement("div");
    let editButton = document.createElement("input");
    let removeButton = document.createElement("input");

    buttonsRow.className = "card-footer align-self-center editButton col-12 row m-0 justify-content-around";
    editButton.className = "btn btn-primary col-5 m-1";
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#myModal");
    editButton.type = "button";
    editButton.value = "Editar";
    removeButton.className = "btn btn-danger col-5 m-1";
    removeButton.type = "button";
    removeButton.value = "Eliminar";

    buttonsRow.append(editButton, removeButton);

    return buttonsRow;
}

function showAddProductForm() {
    let modalHeaderTitle = document.getElementById("modalHeaderTitle");

    modalHeaderTitle.innerHTML = "Añadir Producto";

    modifyModalFormToAddProduct();
}

function showEditProductForm(elementPosition) {
    modifyModalFormToAddProduct();

    let index = JSON.parse(localStorage.getItem("index"));
    let modalHeaderTitle = document.getElementById("modalHeaderTitle");
    let confirmButton = document.getElementById("modalConfirmButton");

    modalHeaderTitle.innerHTML = "Editar Producto";
    confirmButton.setAttribute("onclick", 'editProductOfIndex(' + elementPosition + ')');

    modifyModalFormToEditElement(index[0], elementPosition);
}

function modifyModalFormToAddProduct() {
    modifyModalFormToAddItem();

    let modalForm = document.getElementById("modalForm");
    let confirmButton = document.getElementById("modalConfirmButton");
    let oldInputBirth = document.getElementById("inputBirth");
    let newInputBirth = createTextField("Fecha de lanzamiento: ", "inputBirth");
    let entitiesList = createEntitiesSelectionButtons();
    let personsLabel = document.createElement("label");
    let personsList = createPersonsSelectionButtons();

    modalForm.replaceChild(newInputBirth, oldInputBirth);
    modalForm.append(entitiesList, personsLabel, personsList);
    confirmButton.setAttribute("onclick", 'addProductToIndex()');
}

function createEntitiesSelectionButtons() {
    let index = JSON.parse(localStorage.getItem("index"));
    let selectionButtons = createElementsSelectionButtons(index[1], "addToEntitiesAuxList(event)");
    let label = selectionButtons.children[0];
    let labelText = document.createTextNode("Entidades relacionadas: ")

    label.appendChild(labelText);

    return selectionButtons;
}

function addToEntitiesAuxList(event) {
    addToAuxList(event.target, entitiesAuxList);
}

function showAddEntityForm() {
    let modalHeaderTitle = document.getElementById("modalHeaderTitle");
    modalHeaderTitle.innerHTML = "Añadir Entidad";
    modifyModalFormToAddEntity();
}

function showEditEntityForm(elementPosition) {
    modifyModalFormToAddEntity();

    let index = JSON.parse(localStorage.getItem("index"));
    let modalHeaderTitle = document.getElementById("modalHeaderTitle");
    let confirmButton = document.getElementById("modalConfirmButton");

    modalHeaderTitle.innerHTML = "Editar Entidad";
    confirmButton.setAttribute("onclick", 'editEntityOfIndex(' + elementPosition + ')');

    modifyModalFormToEditElement(index[1], elementPosition);
}

function modifyModalFormToAddEntity() {
    modifyModalFormToAddItem();

    let modalForm = document.getElementById("modalForm");
    let confirmButton = document.getElementById("modalConfirmButton");
    let oldInputBirth = document.getElementById("inputBirth");
    let newInputBirth = createTextField("Fecha de fundación: ", "inputBirth");
    let personsLabel = document.createElement("label");
    let personsList = createPersonsSelectionButtons();

    personsLabel.id = "personsLabel";
    personsList.id = "personsList";

    modalForm.replaceChild(newInputBirth, oldInputBirth);
    modalForm.append(personsLabel, personsList);
    confirmButton.setAttribute("onclick", 'addEntityToIndex()');
}

function createPersonsSelectionButtons() {
    let index = JSON.parse(localStorage.getItem("index"));
    let selectionButtons = createElementsSelectionButtons(index[2], "addToPersonsAuxList(event)");
    let label = selectionButtons.children[0];
    let labelText = document.createTextNode("Personas relacionadas: ")

    label.appendChild(labelText);

    return selectionButtons;
}

function addToPersonsAuxList(event) {
    addToAuxList(event.target, personsAuxList);
}

function addToAuxList(button, auxList) {
    let elementPosition = button.id.substr(16);
    if (auxList.includes(elementPosition)) {
        auxList.splice(auxList.indexOf(elementPosition), 1);
        button.className = "btn btn-outline-secondary m-1";
    } else {
        auxList.push(elementPosition);
        button.className = "btn btn-primary m-1";
    }
}

function createElementsSelectionButtons(list, onClickFunction) {

    let container = document.createElement("div");
    let elementsLabel = document.createElement("label");
    let elementsList = document.createElement("div");

    for (let i = 0; i < list.length; i++) {
        let element = list[i];
        let inputButton = document.createElement("input");
        inputButton.type = "button";
        inputButton.className = "btn btn-outline-secondary m-1";
        inputButton.value = element.name;
        inputButton.id = "selectionButton-" + i;
        inputButton.setAttribute('onclick', onClickFunction);
        elementsList.appendChild(inputButton);
    }

    container.append(elementsLabel, elementsList);

    return container;
}

function showAddPersonForm() {
    let modalHeaderTitle = document.getElementById("modalHeaderTitle");
    modalHeaderTitle.innerHTML = "Añadir Persona";
    modifyModalFormToAddPerson();
}

function showEditPersonForm(elementPosition) {
    modifyModalFormToAddPerson();

    let index = JSON.parse(localStorage.getItem("index"));
    let modalHeaderTitle = document.getElementById("modalHeaderTitle");
    let confirmButton = document.getElementById("modalConfirmButton");

    modalHeaderTitle.innerHTML = "Editar Persona";
    confirmButton.setAttribute("onclick", 'editPersonOfIndex(' + elementPosition + ')');

    modifyModalFormToEditElement(index[2], elementPosition);

}

function modifyModalFormToAddPerson() {
    modifyModalFormToAddItem();

    let modalForm = document.getElementById("modalForm");
    let confirmButton = document.getElementById("modalConfirmButton");
    let oldInputBirthLabel = document.getElementById("inputBirth");
    let newInputBirthLabel = createTextField("Fecha de nacimiento: ", "inputBirth");
    let logoUrlLabel = document.getElementById("logoUrlLabel");

    modalForm.replaceChild(newInputBirthLabel, oldInputBirthLabel);
    confirmButton.setAttribute("onclick", 'addPersonToIndex()');
    logoUrlLabel.innerHTML = "URL Retrato";
}

function modifyModalFormToAddItem() {
    let modalForm = document.getElementById("modalForm");
    let confirmButton = document.getElementById("modalConfirmButton");
    let nameTextField = createTextField("Nombre: ", "inputName");
    let birthTextField = document.createElement("div");
    let logoTextField = createTextField("URL Logo: ", "logoUrl");
    let wikiUrlTextFild = createTextField("URL Wiki: ", "wikiUrl");

    modalForm.innerHTML = "";
    confirmButton.value = "Añadir";
    birthTextField.id = "inputBirth";

    modalForm.append(nameTextField, birthTextField, logoTextField, wikiUrlTextFild);
}

function modifyModalFormToEditElement(list, elementPosition) {
    let nameTextField = document.getElementById("inputName");
    let birthTextField = document.getElementById("inputBirth");
    let logoTextField = document.getElementById("logoUrl");
    let wikiUrlTextField = document.getElementById("wikiUrl");
    let confirmButton = document.getElementById("modalConfirmButton");

    nameTextField.value = list[elementPosition].name;
    birthTextField.value = list[elementPosition].birth;
    logoTextField.value = list[elementPosition].img;
    wikiUrlTextField.value = list[elementPosition].wiki;

    confirmButton.value = "Editar"
}

function createTextField(textLabel, inputTextId) {
    let textField = document.createElement("div");
    let label = document.createElement("label");
    let inputText = document.createElement("input");

    textField.className = "mb-3";
    label.for = inputTextId;
    label.className = "col-form-label";
    label.id = inputTextId + "Label";
    label.innerHTML = textLabel;
    inputText.type = "text";
    inputText.className = "form-control";
    inputText.id = inputTextId;

    textField.append(label, inputText);

    return textField;
}

function logout() {
    changeWriterButtonsToLoginForm();
    removeEditButtons();
    loged = false;
}

function changeWriterButtonsToLoginForm() {
    let header = document.getElementById("headerRow");
    let writerButtons = document.getElementById("writerButtons");

    header.removeChild(writerButtons);
    header.innerHTML += loginForm;
}

function removeEditButtons() {
    let editButtons = document.getElementsByClassName("editButton");

    while (editButtons.length > 0) {
        editButtons[0].remove();
    }
}
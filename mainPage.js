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

let html = new Product("HTML", "---", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/230px-HTML5_logo_and_wordmark.svg.png", "https://es.wikipedia.org/wiki/HTML");
let css = new Product("CSS", "---", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/165px-CSS3_logo_and_wordmark.svg.png", "https://es.wikipedia.org/wiki/Hoja_de_estilos_en_cascada");
let alanTuring = new Person("Alan Turing", "23/06/1912", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/330px-Alan_Turing_Aged_16.jpg", "https://es.wikipedia.org/wiki/Alan_Turing")
let ibm = new Entity("IBM", "16/06/1911", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/368px-IBM_logo.svg.png", "https://es.wikipedia.org/wiki/IBM")

let products = [html, css];
let entities = [ibm];
let persons = [alanTuring];
let index = [products, entities, persons];

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
    main.appendChild(readIndex());
    header.innerHTML += loginForm;
    body.appendChild(main);
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

function readIndex() {
    if (localStorage.getItem("index") === null)
        loadIndex();
    let containerLists = document.createElement("div");

    containerLists.className = "row align-items-start p-3 m-0";
    containerLists.id = "indexList";

    createElementsGridPage(containerLists);

    return containerLists;
}


function loadIndex() {
    let _index = JSON.stringify(index);
    localStorage.setItem("index", _index);
}

function createElementsGridPage(container) {
    let index = JSON.parse(localStorage.getItem("index"));
    let productsColumn = buildColumnCards(index[0]);
    let entitiesColumn = buildColumnCards(index[1]);
    let personsColumn = buildColumnCards(index[2]);


    productsColumn.className = "col-sm-4";
    productsColumn.id = "productsColumn";
    entitiesColumn.className = "col-sm-4";
    entitiesColumn.id = "entitiesColumn";
    personsColumn.className = "col-sm-4";
    personsColumn.id = "personsColumn";

    container.append(productsColumn, entitiesColumn, personsColumn);
}

function buildColumnCards(list) {
    let column = document.createElement("div");

    for (let i = 0; i < list.length; i++) {
        let element = list[i];
        let card = createCard(element, i);
        column.appendChild(card);
    }

    return column;

}

function createCard(element, elementPosition) {
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

function goToProductPage(elementPosition) {
    let main = document.getElementsByTagName("main")[0];
    let index = JSON.parse(localStorage.getItem("index"));

    main.innerHTML = "";
    main.appendChild(buildElementPage(index[0][elementPosition]));
}

function goToEntityPage(elementPosition) {
    let main = document.getElementsByTagName("main")[0];
    let index = JSON.parse(localStorage.getItem("index"));

    main.innerHTML = "";
    main.appendChild(buildElementPage(index[1][elementPosition]));
}

function goToPersonPage(elementPosition) {
    let main = document.getElementsByTagName("main")[0];
    let index = JSON.parse(localStorage.getItem("index"));

    main.innerHTML = "";
    main.appendChild(buildElementPage(index[2][elementPosition]));
}

function buildElementPage(element) {
    let header = document.getElementsByTagName("header")[0];
    let row = document.createElement("div");
    let dataColumn = document.createElement("div");
    let wikiColumn = document.createElement("div");
    let nameField = createTextLabel("Nombre: ", element.name);
    let birthField = createTextLabel("Fecha de nacimiento: ", element.birth);
    let references = getListOfReferences(element);
    let wikiFrame = document.createElement("iframe");

    row.className = "row p-3 m-0";
    dataColumn.className = "col-sm-4 align-self-center";
    wikiColumn.className = "col-sm-8";
    wikiFrame.src = element.wiki;
    wikiFrame.height = (window.innerHeight - header.clientHeight) * 0.9;
    wikiFrame.width = Math.trunc(window.innerWidth / 12) * 7;

    dataColumn.append(nameField, birthField);
    wikiColumn.appendChild(wikiFrame);
    row.append(dataColumn, wikiColumn, references);

    return row;
}

function createTextLabel(labelText, textInfo) {
    let container = document.createElement("div");
    let label = document.createElement("label");
    let textLabel = document.createTextNode(labelText);
    let paragraph = document.createElement("p");
    let textParagraph = document.createTextNode(textInfo);

    container.className = "row";
    label.className = "col-auto";
    paragraph.className = "col-auto";

    paragraph.appendChild(textParagraph);
    label.appendChild(textLabel);
    container.append(label, paragraph);

    return container;
}

function getListOfReferences(element) {
    let container = document.createElement("div");
    if (!(element.type === "Person")) {
        console.log("__________");
        let personsList = buildListOfPersons(element.persons);
        container.appendChild(personsList);
    }
    if (element.type === "Product") {
        let entitiesList = buildListOfEntities(element.entities);
        container.appendChild(entitiesList);
    }

    container.className = "col-auto";

    return container;
}

function buildListOfEntities(list) {
    let index = JSON.parse(localStorage.getItem("index"));
    let container = buildListOfElements(list, "Entidades involucradas: ");
    let entitiesListButtons = Array.from(container.children[1].children);
    console.log(entitiesListButtons);

    entitiesListButtons.map(function (button) {
        let elementPosition = button.id.substr(11);

        button.value = index[1][elementPosition].name;
        button.setAttribute("onclick", "goToEntityPage(" + elementPosition + ")");
    });


    return container;
}

function buildListOfPersons(list) {
    let index = JSON.parse(localStorage.getItem("index"));
    let container = buildListOfElements(list, "Personas involucradas: ");
    let personsListButtons = Array.from(container.children[1].children);

    personsListButtons.map(function (button) {
        let elementPosition = button.id.substr(11);

        button.value = index[2][elementPosition].name;
        button.setAttribute("onclick", "goToPersonPage(" + elementPosition + ")");
    });


    return container;
}

function buildListOfElements(list, text) {
    let container = document.createElement("div");
    let elementsLabel = document.createElement("label");
    let elementsLabelText = document.createTextNode(text);
    let elementsList = document.createElement("div");

    for (let i = 0; i < list.length; i++) {
        let element = list[i];
        let inputButton = document.createElement("input");
        inputButton.type = "button";
        inputButton.className = "btn btn-outline-secondary m-1";
        inputButton.id = "goToButton-" + element;
        elementsList.appendChild(inputButton);
    }

    container.className = "row";
    elementsLabel.appendChild(elementsLabelText);
    container.append(elementsLabel, elementsList);

    return container;

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
        let buttons = createEditButtons();
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
        let buttons = createEditButtons();
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
        let buttons = createEditButtons();
        let editButton = buttons.children[0];
        let removeButton = buttons.children[1];
        editButton.setAttribute("onclick", "showEditPersonForm(" + card.id + ")");
        removeButton.setAttribute("onclick", "removePersonOfIndex(" + card.id + ")");
        card.appendChild(buttons);
    });
}

function createEditButtons() {
    let buttonRow = document.createElement("div");
    let editButton = document.createElement("input");
    let removeButton = document.createElement("input");

    buttonRow.className = "card-footer align-self-center editButton col-12 row m-0 justify-content-around";
    editButton.className = "btn btn-primary col-5 m-1";
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#myModal");
    editButton.type = "button";
    editButton.value = "Editar";
    removeButton.className = "btn btn-danger col-5 m-1";
    removeButton.type = "button";
    removeButton.value = "Eliminar";

    buttonRow.append(editButton, removeButton);

    return buttonRow;
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

function addProductToIndex() {
    let index = JSON.parse(localStorage.getItem("index"));
    let item = createNewProduct();

    index[0].push(item);

    updateIndex(index);
}

function addEntityToIndex() {
    let index = JSON.parse(localStorage.getItem("index"));
    let item = createNewEntity();

    index[1].push(item);

    updateIndex(index);
}

function addPersonToIndex() {
    let index = JSON.parse(localStorage.getItem("index"));
    let item = createNewPerson();

    index[2].push(item);

    updateIndex(index);
}

function updateIndex(index) {
    let main = document.getElementsByTagName("main")[0];
    let indexList = document.getElementById("indexList");

    localStorage.setItem("index", JSON.stringify(index));
    main.replaceChild(readIndex(), indexList);

    addEditButtons();
    personsAuxList = [];
    entitiesAuxList = [];
}

function editProductOfIndex(elementPosition) {
    let index = JSON.parse(localStorage.getItem("index"));
    let item = createNewProduct();

    index[0][elementPosition] = item;

    updateIndex(index);
}

function editEntityOfIndex(elementPosition) {
    let index = JSON.parse(localStorage.getItem("index"));
    let item = createNewEntity();

    index[0][elementPosition] = item;

    updateIndex(index);
}
function editPersonOfIndex(elementPosition) {
    let index = JSON.parse(localStorage.getItem("index"));
    let item = createNewPerson();

    index[0][elementPosition] = item;

    updateIndex(index);
}


function createNewProduct() {
    let data = getDataOfElement();
    let name = data[0];
    let birth = data[1];
    let img = data[2];
    let wiki = data[3];
    let item = new Product(name, birth, img, wiki);

    item.entities = entitiesAuxList;
    item.persons = personsAuxList;

    return item;
}

function createNewEntity() {
    let data = getDataOfElement();
    let name = data[0];
    let birth = data[1];
    let img = data[2];
    let wiki = data[3];

    let item = new Entity(name, birth, img, wiki);
    item.persons = personsAuxList;

    return item;
}

function createNewPerson() {
    let data = getDataOfElement();
    let name = data[0];
    let birth = data[1];
    let img = data[2];
    let wiki = data[3];

    let item = new Person(name, birth, img, wiki);

    return item;
}

function getDataOfElement() {
    let name = document.getElementById("inputName").value;
    let birth = document.getElementById("inputBirth").value;
    let logoUrl = document.getElementById("logoUrl").value;
    let wikiUrl = document.getElementById("wikiUrl").value;

    return [name, birth, logoUrl, wikiUrl];
}

//implementar eliminar las referencias 
function removeProductOfIndex(elementPosition) {
    let index = JSON.parse(localStorage.getItem("index"));

    index[0].splice(elementPosition, 1);

    updateIndex(index);
}

function removeEntityOfIndex(elementPosition) {
    let index = JSON.parse(localStorage.getItem("index"));

    index[1].splice(elementPosition, 1);

    updateIndex(index);
}
function removePersonOfIndex(elementPosition) {
    let index = JSON.parse(localStorage.getItem("index"));

    index[2].splice(elementPosition, 1);

    updateIndex(index);
}

function logout() {
    changeWriterButtonsToLoginForm();
    removeEditButtons();
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

function buildModalWindow() {
    let container = document.createElement("div");
    let modalDialog = document.createElement("div");
    let modalContent = document.createElement("div");
    let modalHeader = buildModalHeader();
    let modalBody = buildModalBody();

    let modalFooter = document.createElement("div");
    let cancelButton = document.createElement("button");
    let confirmButton = document.createElement("input");


}

function buildModalHeader() {
    let modalHeader = document.createElement("div");
    let modalHeaderTitle = document.createElement("h5");
    let closeButton = document.createElement("button");

    modalHeader.id = "modalHeader";
    modalHeader.className = "modal-header";
    modalHeaderTitle.id = "modalHeaderTitle";
    modalHeaderTitle.className = "modal-title";
    closeButton.type = "button";
    closeButton.className = "btn-close";
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");

    modalHeader.append(modalHeaderTitle, closeButton);

    return modalHeader;
}

function buildModalBody() {
    let modalBody = document.createElement("div");
    let modalForm = document.createElement("form");

    modalBody.className = "modal-body";
    modalForm.id = "modalForm";

    modalBody.appendChild(modalForm);

    return modalBody;
}
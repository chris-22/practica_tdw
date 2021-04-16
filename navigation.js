let browsingHistory = [];
let actualPage;

function goToProductPage(productPosition) {
    let index = JSON.parse(localStorage.getItem("index"));
    let product = index[0][productPosition];
    let main = document.getElementsByTagName("main")[0];
    let page = buildElementPage(product);
    let oldBirthField = page.children[1].children[0].children[1];
    let birthField = createTextLabel("Fecha de lanzamiento: ", product.birth);

    oldBirthField.replaceWith(birthField);
    main.innerHTML = "";
    main.appendChild(page);

    browsingHistory.push(actualPage);
    actualPage = [0, productPosition];
}

function goToEntityPage(entityPosition) {
    let index = JSON.parse(localStorage.getItem("index"));
    let entity = index[1][entityPosition];
    let main = document.getElementsByTagName("main")[0];
    let page = buildElementPage(entity);
    let oldBirthField = page.children[1].children[0].children[1];
    let birthField = createTextLabel("Fecha de fundación: ", entity.birth);

    oldBirthField.replaceWith(birthField);
    main.innerHTML = "";
    main.appendChild(page);

    browsingHistory.push(actualPage);
    actualPage = [1, entityPosition]
}

function goToPersonPage(personPosition) {
    let index = JSON.parse(localStorage.getItem("index"));
    let person = index[2][personPosition];
    let main = document.getElementsByTagName("main")[0];
    let page = buildElementPage(person);
    let oldBirthField = page.children[1].children[0].children[1];
    let birthField = createTextLabel("Fecha de nacimiento: ", person.birth);

    oldBirthField.replaceWith(birthField);
    main.innerHTML = "";
    main.appendChild(page);

    browsingHistory.push(actualPage);
    actualPage = [2, personPosition];
}

function buildElementPage(element) {
    let container = document.createElement("div");
    let header = document.getElementsByTagName("header")[0];
    let returnButtonRow = document.createElement("div");
    let returnButton = document.createElement("input");
    let row = document.createElement("div");
    let dataColumn = document.createElement("div");
    let wikiColumn = document.createElement("div");
    let nameField = createTextLabel("Nombre: ", element.name);
    let birthField = document.createElement("div");
    let references = getListOfReferences(element);
    let wikiFrame = document.createElement("iframe");

    container.className = "col-auto";
    returnButton.type = "button";
    returnButton.className = "btn btn-primary m-1 col-2";
    returnButton.value = "Volver";
    returnButton.onclick = goBack;
    returnButtonRow.className = "row p-3 m-0";
    row.className = "row p-3 m-0";
    dataColumn.className = "col-sm-4 align-self-start";
    dataColumn.id = "dataColumn";
    wikiColumn.className = "col-sm-8";
    wikiFrame.src = element.wiki;
    wikiFrame.height = (window.innerHeight - header.clientHeight) * 0.9;
    wikiFrame.width = Math.trunc(window.innerWidth / 12) * 7.5;

    dataColumn.append(nameField, birthField, references);
    wikiColumn.appendChild(wikiFrame);
    row.append(dataColumn, wikiColumn);
    returnButtonRow.appendChild(returnButton);
    container.append(returnButtonRow, row);

    return container;
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
        let personPosition = button.id.substr(11);
        let person = index[2][personPosition];
        button.value = person.name;
        button.setAttribute("onclick", "goToPersonPage(" + personPosition + ")");
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
        inputButton.className = "btn btn-outline-dark m-1";
        inputButton.id = "goToButton-" + element;
        elementsList.appendChild(inputButton);
    }

    container.className = "row";
    elementsLabel.appendChild(elementsLabelText);
    container.append(elementsLabel, elementsList);

    return container;
}

function goBack() {
    let index = JSON.parse(localStorage.getItem("index"));
    let main = document.getElementsByTagName("main")[0];

    main.innerHTML = "";
    if (browsingHistory.length <= 1) {
        browsingHistory = [];
        actualPage = [];
        main.appendChild(buildIndexGrid());
        if (loged)
            addEditButtons();
    }
    else {
        let pageData = browsingHistory.pop()
        let element = index[pageData[0]][pageData[1]];
        actualPage = [pageData[0], pageData[1]];
        main.appendChild(buildElementPage(element));
    }
}
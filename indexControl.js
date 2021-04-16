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
    let indexGrid = document.getElementById("indexGrid");

    localStorage.setItem("index", JSON.stringify(index));
    main.replaceChild(buildIndexGrid(), indexGrid);

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

    index[1][elementPosition] = item;

    updateIndex(index);
}
function editPersonOfIndex(elementPosition) {
    let index = JSON.parse(localStorage.getItem("index"));
    let item = createNewPerson();

    index[2][elementPosition] = item;

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

function removeProductOfIndex(elementPosition) {
    let index = JSON.parse(localStorage.getItem("index"));

    index[0].splice(elementPosition, 1);

    updateIndex(index);
}

function removeEntityOfIndex(elementPosition) {
    let index = JSON.parse(localStorage.getItem("index"));

    index[1].splice(elementPosition, 1);

    removeEntityReferences(index, elementPosition);
    updateIndex(index);
}

function removeEntityReferences(index, elementPosition) {
    let products = index[0];

    products.map((product) => removeReferences(product.entities, elementPosition));
}

function removePersonOfIndex(elementPosition) {
    let index = JSON.parse(localStorage.getItem("index"));

    index[2].splice(elementPosition, 1);

    removePersonReferences(index, elementPosition);
    updateIndex(index);
}

function removePersonReferences(index, elementPosition) {
    let products = index[0];
    let entities = index[1];

    products.map((product) => removeReferences(product.persons, elementPosition));
    entities.map((entity) => removeReferences(entity.persons, elementPosition));
}

function removeReferences(list, element) {
    console.log(element);
    let pos = list.indexOf(element.toString());
    if (pos !== -1) {
        list.splice(pos, 1);
    }
}
const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const removeElementsByClass = (className) => {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

const getCarts = () => {
    const target = document.getElementById('calculator');
    removeAllChildNodes(target);

    const numberInput = document.createElement('input');
    numberInput.setAttribute("id", 'numInput');
    numberInput.setAttribute("type", 'number');
    numberInput.setAttribute("min", '0');
    numberInput.setAttribute("max", '20');
    numberInput.setAttribute("class", 'form-control m-2');
    numberInput.required = true;

    const createCartsButton = document.createElement('button');
    createCartsButton.setAttribute("onclick", "individualCartCalculator()")
    createCartsButton.setAttribute("class", "btn btn-primary");
    createCartsButton.innerText = "Enter";

    const inputLabel = document.createElement('label');
    inputLabel.innerText = "Enter the number of currently active carts (GM, Bulky, and Grocery) in the process of being picked"
    inputLabel.setAttribute('for', 'numInput');
    inputLabel.setAttribute('class', 'form-label, text-start');

    target.appendChild(inputLabel);
    target.appendChild(numberInput);
    target.appendChild(createCartsButton);
}

const individualCartCalculator = () => {
    const target = document.getElementById('calculator');
    const oldError = document.getElementById('errorMessage');
    if (oldError) {
        oldError.remove();
    }
    const numInput = document.getElementById('numInput');
    if (numInput.value != "" && !isNaN(numInput.value) && (0 <= parseInt(numInput.value) && parseInt(numInput.value) <= 20)) {
        populateCarts(numInput.value);
    } else {
        const errorMessage = document.createElement('h1');
        errorMessage.innerText = `Please enter a number from 0 to 20`;
        errorMessage.setAttribute("class", "text-danger")
        errorMessage.setAttribute("id", "errorMessage")
        target.appendChild(errorMessage);
    }
}

const populateCarts = (numCarts) => {
    const target = document.getElementById('calculator');
    removeElementsByClass('cartElement');
    removeElementsByClass('cartElementBtn');
    for (let i = 0; i < numCarts; i++) {
        target.appendChild(createCartElement(i));
    }

    const enterCartsButton = document.createElement('button');
    enterCartsButton.setAttribute("onclick", "calculateCurrentTotalsByBatches()")
    enterCartsButton.setAttribute("class", "btn btn-primary cartElementBtn");
    enterCartsButton.innerText = "Enter carts";
    target.appendChild(enterCartsButton);
}

const calculateCurrentTotalsByBatches = () => {
    const batches = document.getElementsByClassName("cartElement");
    let groceryEaches = 0;
    let pickupEaches = 0;
    for (let i = 0; i < batches.length; i++) {
        const batchEaches = parseInt(batches[i].firstChild.value);
        const selectField = batches[i].lastChild;
        const batchType = selectField.options[selectField.selectedIndex].value;
        if (batchType == "bulky" || batchType == "opu") {
            pickupEaches += batchEaches;
        } else if (batchType == "gro") {
            groceryEaches += batchEaches;
        }
    }
    storeBatchEaches(pickupEaches, groceryEaches);
    populateRemainingDueToday()
}

const storeBatchEaches = (pickupEaches, groceryEaches) => {
    localStorage.setItem('activePickupEaches', pickupEaches)
    localStorage.setItem('activeGroceryEaches', groceryEaches)
}

const populateRemainingDueToday = () => {
    const target = document.getElementById('calculator');

    const dueTodayElement = document.createElement('div');
    dueTodayElement.setAttribute("class", "input-group m-3 dueTodayElement");

    const opuEachesDueTodayInput = document.createElement('input');
    opuEachesDueTodayInput.setAttribute('class', 'form-control');
    opuEachesDueTodayInput.setAttribute("id", `opuEachesDueTodayInput`);
    opuEachesDueTodayInput.setAttribute("type", "number");
    opuEachesDueTodayInput.setAttribute("placeholder", "Total Eaches of Pickup Due Today");
    opuEachesDueTodayInput.setAttribute("min", "0");
    opuEachesDueTodayInput.setAttribute("max", "200");

    const opuInputLabel = document.createElement('label');
    opuInputLabel.innerText = "Enter the total number of pickup eaches due today"
    opuInputLabel.setAttribute('for', 'opuEachesDueTodayInput');
    opuInputLabel.setAttribute('class', 'form-label text-start');

    const groEachesDueTodayInput = document.createElement('input');
    groEachesDueTodayInput.setAttribute('class', 'form-control');
    groEachesDueTodayInput.setAttribute("id", `groEachesDueTodayInput`);
    groEachesDueTodayInput.setAttribute("type", "number");
    groEachesDueTodayInput.setAttribute("placeholder", "Total Eaches of Grocery Due Today");
    groEachesDueTodayInput.setAttribute("min", "0");
    groEachesDueTodayInput.setAttribute("max", "200");

    const groInputLabel = document.createElement('label');
    groInputLabel.innerText = "Enter the total number of grocery eaches due today"
    groInputLabel.setAttribute('for', 'opuEachesDueTodayInput');
    groInputLabel.setAttribute('class', 'form-label text-start');

    const dueTodayExplanation = document.createElement('p');
    dueTodayExplanation.setAttribute('class', 'text-start');

    const enterDueTodayButton = document.createElement('button');
    enterDueTodayButton.setAttribute("onclick", "calculateCurrentTotalsByBatches()")
    enterDueTodayButton.setAttribute("class", "btn btn-primary");
    enterDueTodayButton.innerText = "Enter Today's Eaches";


    dueTodayElement.appendChild(dueTodayExplanation);
    dueTodayElement.appendChild(opuInputLabel);
    dueTodayElement.appendChild(opuEachesDueTodayInput);
    dueTodayElement.appendChild(groInputLabel);
    dueTodayElement.appendChild(groEachesDueTodayInput);

    target.appendChild(dueTodayElement);
    target.appendChild(enterDueTodayButton);
}

const createCartElement = (cartId) => {
    const cartElement = document.createElement('div');
    cartElement.setAttribute("class", "input-group m-3 cartElement");

    const cartInput = document.createElement('input');
    cartInput.setAttribute('class', 'form-control');
    cartInput.setAttribute("id", `cartInput${cartId}`);
    cartInput.setAttribute("type", "number");
    cartInput.setAttribute("placeholder", "Total Eaches of Cart");
    cartInput.setAttribute("min", "0");
    cartInput.setAttribute("max", "200");

    const cartSelect = document.createElement('select');
    cartSelect.setAttribute('class', 'form-select cartSelect');
    cartSelect.setAttribute('id', `cartTypeSelector${cartId}`);

    const genericOption = document.createElement('option');
    genericOption.setAttribute("value", '');
    genericOption.innerText = 'Select a batch type...';
    genericOption.selected = true;

    const pickupOption = document.createElement('option');
    pickupOption.setAttribute("value", 'opu');
    pickupOption.innerText = 'GM/Pickup';

    const bulkyOption = document.createElement('option');
    bulkyOption.setAttribute("value", 'bulky');
    bulkyOption.innerText = 'Bulky';

    const groceryOption = document.createElement('option');
    groceryOption.setAttribute("value", 'gro');
    groceryOption.innerText = 'Grocery';

    cartSelect.appendChild(genericOption);
    cartSelect.appendChild(pickupOption);
    cartSelect.appendChild(bulkyOption);
    cartSelect.appendChild(groceryOption);

    cartElement.appendChild(cartInput);
    cartElement.appendChild(cartSelect);

    return cartElement;
}

const enterNumDueToday = () => {
    const target = document.getElementById('calculator');
    removeAllChildNodes(target);
    const testElement = document.createElement('h1');
    testElement.innerText = "This sums it up";
    target.appendChild(testElement);
}
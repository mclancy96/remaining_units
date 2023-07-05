const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
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

const populateCarts = () => {
    const target = document.getElementById('calculator');
    const testElement = document.createElement('h1');
    testElement.innerText = "We did it";
    target.appendChild(testElement);
}

const enterNumDueToday = () => {
    const target = document.getElementById('calculator');
    removeAllChildNodes(target);
    const testElement = document.createElement('h1');
    testElement.innerText = "This sums it up";
    target.appendChild(testElement);
}
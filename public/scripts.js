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
    const testElement = document.createElement('h1');
    testElement.innerText = "Yo yo. this worked";
    target.appendChild(testElement);
}

const enterNumDueToday = () => {
    const target = document.getElementById('calculator');
    const testElement = document.createElement('h1');
    testElement.innerText = "This sums it up";
    target.appendChild(testElement);
}
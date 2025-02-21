const formElement = document.getElementById("merch-form");
const nameInputElement = document.getElementById("form-input-name");
const emailInputElement = document.getElementById("form-input-email");
const numberInputElement = document.getElementById("form-input-number");
const idInputElement = document.getElementById("form-input-id");
const hostelInputElement = document.getElementById("form-input-hostel");
const sizeInputElementsList = [...document.getElementsByClassName("form-input-size")];
const agreeTnCInput = document.getElementById("form-input-agreetnc");

const inputContainersList = document.getElementsByClassName("form-input-container");
const nameInputElementContainer = document.getElementById("form-input-name-container");
const emailInputElementContainer = document.getElementById("form-input-email-container");
const numberInputElementContainer = document.getElementById("form-input-number-container");
const idInputElemenContainer = document.getElementById("form-input-id-container");
const hostelInputElementContainer = document.getElementById("form-input-hostel-container");
const sizeInputElementsListContainer = document.getElementById("form-input-size-container");
const agreeTnCInputContainer = document.getElementById("form-input-agreetnc-container");

const emailPattern = /f\d{8}@(pilani|hyderabad|goa)\.bits-pilani\.ac\.in/i;
const numberPattern = /\d{10}/;
const bitsIdPattern = /\d{4}(A|B)\d[a-z]{2}\d{4}[a-z]/i;

const notificationContainer = document.getElementById("notification-container");
const merchDisplayContainer = document.getElementById("illus-container");

const options = {
    method: 'GET'
}

let merchList;
let merchItemList;
let activeProductIndex = 0;
let sizeList;

fetch("https://fakestoreapi.com/products?limit=5")
    .then(res => res.json())
    .then(res => {
        merchList = res;
        merchList.forEach((merch, index) => {
            merchDisplayContainer.innerHTML += `
                            <div class="illus-item ${index ? 'item-right' : 'active-item'}">
                                <img class="illus-img" src="${merch.image}">
                                <p class="illus-desc">${merch.title}</p>
                            </div>
            `;
        });
        merchItemList = [...document.getElementsByClassName("illus-item")];
        sizeList = Array(5).fill(null)
    })
    .catch(error => new Notification(`Failed to fetch merch info.\nError: ${error}`));

class Notification {
    constructor(message, expTime = 3) {
        this.element = document.createElement("div");
        this.element.className = "notification-item";
        this.element.innerHTML = message.replace("\n", "<br>");

        notificationContainer.appendChild(this.element);

        setTimeout(() => this.destroy(), expTime*1000);
    }

    destroy() {
        const killTime = 0.5;

        this.element.style.transition = `opacity ${killTime}s`;
        this.element.style.opacity = 0;
        setTimeout(() => {
            notificationContainer.removeChild(this.element)
            delete this;
        }, killTime*1000)
    }
}

const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    let response = {};
    let failure = false;

    const name = nameInputElement.value;
    nameInputElementContainer.classList.remove("input-error", "input-empty");
    if (name.length < 5) {
        failure = true;
        if (name.length == 0) nameInputElementContainer.classList.add("input-empty");
        else nameInputElementContainer.classList.add("input-error")
    }
    else response.name = name;

    const email = emailInputElement.value;
    emailInputElementContainer.classList.remove("input-error", "input-empty");
    if (email.length == 0) {
        emailInputElementContainer.classList.add("input-empty");
        failure = true;
    }
    else if (!emailPattern.test(email)) {
        emailInputElementContainer.classList.add("input-error");
        failure = true;
    }
    else response.email = email;

    const number = numberInputElement.value;
    numberInputElementContainer.classList.remove("input-error", "input-empty");
    if (number.length == 0) {
        failure = true;
        numberInputElementContainer.classList.add("input-empty");
    }
    else if (!numberPattern.test(number)) {
        failure = true;
        numberInputElementContainer.classList.add("input-error");
    }
    else response.number = number;

    const bitsId = idInputElement.value;
    idInputElemenContainer.classList.remove("input-error", "input-empty");
    if (bitsId.length == 0) {
        failure = true;
        idInputElemenContainer.classList.add("input-empty");
    }
    else if (!bitsIdPattern.test(bitsId)) {
        failure = true;
        idInputElemenContainer.classList.add("input-error");
    }
    else response.bitsId = bitsId;

    const hostel = hostelInputElement.value;
    hostelInputElementContainer.classList.remove("input-empty");
    if (hostel == '') {
        failure = true;
        hostelInputElementContainer.classList.add("input-empty");
    }
    else response.hostel = hostel;

    const sizeElement = sizeInputElementsList.filter((element) => element.checked)[0];
    sizeInputElementsListContainer.classList.remove("input-empty");
    if (sizeElement === undefined) {
        failure = true;
        sizeInputElementsListContainer.classList.add("input-empty");
    }
    else response.size = sizeElement.value;

    agreeTnCInputContainer.classList.remove("input-empty");
    if (!agreeTnCInput.checked) {
        failure = true;
        agreeTnCInputContainer.classList.add("input-empty");
    }

    if (failure) new Notification("Please fill all the required detail in the correct format and agree to our Terms and Conditions in order to submit.", 3);

    if (tasteCookie(response.bitsId) === '1') {
        new Notification(`There is already a response from the provided BITS ID (${response.bitsId}). Each person can only fill this form once. If you think it was a mistake, then please contact us.`, 3);
        return;
    }
    else if (!failure) {
        const postResponse = fetch("https://www.foo.com", options);
        console.log(postResponse);
        bakeCookie(response.bitsId, 1);
        new Notification(`Your response has been successfully recorded for BITS ID ${response.bitsId}. Thank you for buying our merch.`, 5);
    }

    for (key in response) bakeCookie(key, response[key]);
}

const resetForm = (event) => [...inputContainersList].forEach((element) => element.classList.remove("input-error", "input-empty"));

const rehydrateForm = () => {
    const name = tasteCookie("name");
    if (name !== null) nameInputElement.value = name;

    const email = tasteCookie("email");
    if (email !== null) emailInputElement.value = email;

    const number = tasteCookie("number");
    if (number !== null) numberInputElement.value = number;

    const bitsId = tasteCookie("bitsId");
    if (bitsId !== null) idInputElement.value = bitsId;

    const hostel = tasteCookie("hostel");
    if (hostel !== null) hostelInputElement.value = hostel;

    const size = tasteCookie("size");
    if (size !== null) sizeInputElementsList.filter((sizeRadioElement) => sizeRadioElement.value)[0].checked = true;
}
rehydrateForm();

const rearrangeMerchItems = () => {
    for (let i = 0; i < merchList.length; i++) {
        const merchItem = merchItemList[i];
        merchItem.classList.remove("item-left", "active-item", "item-right");
        if (i < activeProductIndex) merchItem.classList.add("item-left");
        else if (i == activeProductIndex) merchItem.classList.add("active-item");
        else merchItem.classList.add("item-right");
    }
}

const navMerchSlider = (direction) => {
    activeProductIndex += direction;
    if (activeProductIndex == merchList.length) activeProductIndex = 0;
    else if (activeProductIndex < 0) activeProductIndex = merchList.length - 1;
    console.log(activeProductIndex, direction)
    rearrangeMerchItems();
}
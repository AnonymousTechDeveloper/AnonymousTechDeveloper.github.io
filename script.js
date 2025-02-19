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

const responseKeys = ["name", "email", "number", "bitsId", "hostel", "size"];

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

    if (tasteCookie(response.bitsId) === '1') {
        console.log("id exists");
        return;
    }
    for (key in response) bakeCookie(key, response[key]);
    if (!failure) bakeCookie(response.bitsId, 1);
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
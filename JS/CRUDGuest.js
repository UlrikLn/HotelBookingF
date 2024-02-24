
function getGuest() {
    const userName = document.getElementById('username').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const guest = {
        username: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone

        }
    console.log(guest);
    return guest;
}

async function postObjectAsJson(url, object, httpVerbum) {
    const objectAsJsonString = JSON.stringify(object);
    console.log(objectAsJsonString);
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    }

    const response = await fetch(url, fetchOptions)
    return response;

}

async function postGuest() {
    const guest = getGuest();
    const url = "http://localhost:8080/newguest";
    const response = await postObjectAsJson(url, guest, "POST");
    if (response) {
        alert("Room has been created");
    }
}

document.getElementById('btnCreate').addEventListener('click', postGuest);
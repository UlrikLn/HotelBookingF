const hotelId = new URLSearchParams(window.location.search).get('hotelId');

function getRoom() {
    const numberOfBeds = document.getElementById('NOfBeds').value;

    const room = {
        numberOfBeds: numberOfBeds,
        hotel: {
            hotelId: parseInt(hotelId)
        }
    }

    console.log(room);
    return room;
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

async function postRoom() {
    const hotel = getRoom();
    const url = "http://localhost:8080/newroom";
    const response = await postObjectAsJson(url, hotel, "POST");
    if (response) {
        alert("Room has been created");
    }
}

document.getElementById('btnCreate').addEventListener('click', postRoom);


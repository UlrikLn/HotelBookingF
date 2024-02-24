
function getHotel() {
    const name = document.getElementById('inpName').value;
    const street = document.getElementById('inpStreet').value;
    const city = document.getElementById('inpCity').value;
    const zip = document.getElementById('inpZip').value;
    const country = document.getElementById('inpCountry').value;

    const hotel = {
        name: name,
        street: street,
        city: city,
        zip: zip,
        country: country
    }

    console.log(hotel);
    return hotel;
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

async function postHotel() {
    const hotel = getHotel();
    const url = "http://localhost:8080/newhotel";
    const response = await postObjectAsJson(url, hotel, "POST");
    if (response) {
        alert("Hotel has been created");
    }
}

async function deleteHotel(hotelId) {
    const url = "http://localhost:8080/deletehotel/" + hotelId;
    const response = await postObjectAsJson(url, hotelId, "DELETE");
    if (response && response.ok) {
        alert("Hotel has been deleted");
    }
    else
    alert("Failed to delete the hotel, perhaps there is reservations on it?");
}

// Function to load hotel data when the page loads
async function loadHotelData() {
    // Extract hotelId from URL
    const queryParams = new URLSearchParams(window.location.search);
    const hotelId = queryParams.get('hotelId');

    try {
        const response = await fetch(`http://localhost:8080/hotelbyid/${hotelId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const hotelData = await response.json();

        // Populate the form fields with the fetched data
        document.getElementById("name").value = hotelData.name || '';
        document.getElementById("street").value = hotelData.street || '';
        document.getElementById("city").value = hotelData.city || '';
        document.getElementById("zip").value = hotelData.zip || '';
        document.getElementById("country").value = hotelData.country || '';
        document.getElementById("roomCount").value = hotelData.roomCount || '';
    } catch (error) {
        console.error('Error fetching hotel data:', error);
    }
}

// Function to get updated hotel data from the form
function getUpdatedHotel() {
    const hotelId = new URLSearchParams(window.location.search).get('hotelId');

    const updatedHotel = {
        hotelId: hotelId,
        name: document.getElementById("name").value,
        street: document.getElementById("street").value,
        city: document.getElementById("city").value,
        zip: document.getElementById("zip").value,
        country: document.getElementById("country").value,
        roomCount: document.getElementById("roomCount").value
    };

    return updatedHotel;
}

//Helt Den samme som postobejctJson bare med andet navn, var træt og har nok ikke lige lagt mærke til jeg kunne genbruge den
async function sendRequest(url, object, httpMethod) {
    const objectAsJsonString = JSON.stringify(object);
    console.log(objectAsJsonString);
    const fetchOptions = {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    };

    const response = await fetch(url, fetchOptions);
    return response;
}

async function updateHotel() {
    const updatedHotel = getUpdatedHotel();
    const hotelId = updatedHotel.hotelId;
    const url = `http://localhost:8080/updatehotel/${hotelId}`;
    const response = await sendRequest(url, updatedHotel, "PUT");

    if (response && response.ok) {
        alert("Hotel has been updated");
    } else {
        alert("Failed to update the hotel");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Add listener to btnCreate if it exists
    loadHotelData();
    const btnCreate = document.getElementById("btnCreate");
    if (btnCreate) {
        btnCreate.addEventListener('click', function () {
            postHotel();
        });
    }

    const btnEdit = document.getElementById("btnEdit");
    if (btnEdit) {
        btnEdit.addEventListener('click', function () {
            updateHotel();
        });
    }
});










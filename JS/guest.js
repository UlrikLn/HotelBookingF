let allGuests = [];
const reservationDateUrl = new URLSearchParams(window.location.search).get('date');
const roomIdUrl = new URLSearchParams(window.location.search).get('roomId');

document.addEventListener('DOMContentLoaded', () => {
    fetchAllGuests();
});

const fetchAllGuests = async () => {
    try {
        const response = await fetch(`http://localhost:8080/allguests`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allGuests = await response.json();
        displayGuests(allGuests);
    } catch (error) {
        console.error('Error fetching guests:', error);
    }
};

const populateGuestCard = (guest) => {
    const guestContainer = document.getElementById('guestContainer');
    if (guestContainer) {
        const guestCard = `
            <div class="guest-card">
                <div class="guest-id">Guest ID: ${guest.guestId}</div>
                <div class="username">Username: ${guest.username}</div> 
                <div class="firstName">Name: ${guest.firstName}</div>
                <div class="lastName">Details: ${guest.lastName}</div>
                <div class="email">Email: ${guest.email}</div>
                <div class="phone">Phone: ${guest.phone}</div>
                <button class="choose" onclick="choose(${guest.guestId})">Choose</button>
            </div>
        `;
        guestContainer.innerHTML += guestCard;
    } else {
        console.error('guestContainer element not found');
    }
};

const displayGuests = (guests) => {
    guests.forEach((guest) => {
        populateGuestCard(guest);
    });
};

function choose(guestId) {
    const roomId = parseInt(roomIdUrl);
    const guestIdInt = parseInt(guestId);

    if (isNaN(roomId) || isNaN(guestIdInt)) {
        console.error('Invalid room ID or guest ID');
        return;
    }

    const reservation = {
        reservationDate: reservationDateUrl,
        room: roomId,
        guest: guestIdInt
    }
    console.log(reservation);
    postReservation(reservation);
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

async function postReservation(reservation) {
    const url = `http://localhost:8080/newreservation/${reservation.guest}/${reservation.room}/${reservation.reservationDate}`;
    const response = await postObjectAsJson(url, reservation, "POST");
    if (response) {
        alert("Reservation has been created");
    }
}



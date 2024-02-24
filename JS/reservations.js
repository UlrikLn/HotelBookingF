const hotelId = new URLSearchParams(window.location.search).get('hotelId');
let allReversations = [];

const fetchAllReservationsByHotel = async () => {
    try {
        const response = await fetch('http://localhost:8080/allreservations/' + hotelId); // Adjust the URL as needed
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allReversations = await response.json();
        console.log(allReversations)
        displayReservations(allReversations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
    }

}

const reservationContainer = document.getElementById('reservationContainer');


const populateReservationCard = (reservation) => {
    const guestId = reservation.guest ? reservation.guest.guestId : 'No Guest ID';
    const username = reservation.guest ? reservation.guest.username : 'No Username';
    const roomId = reservation.room ? reservation.room.roomId : 'No Room ID';

    const reservationCard =
        `<div class="reservation-card">
            <div class="reservation-guestId">Reservation Guest Id: ${guestId}</div>
            <div class="reservation-username">Guest Username: ${username}</div>
            <div class="reservation-id">Reservation ID: ${reservation.reservationId}</div>
            <div class="reservation-roomId">Reservation Room Id: ${roomId}</div>
            <div class="reservation-date">Reservation Date: ${new Date(reservation.reservationDate).toLocaleDateString()}</div>   
            <button class="deleteButton" onclick="deleteReservation(${reservation.reservationId})">Delete</button>
        </div>`;

    reservationContainer.innerHTML += reservationCard;
}
const displayReservations = (reservations) => {
    reservations.forEach((reservation) => {
        populateReservationCard(reservation);
    });
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

async function deleteReservation(reservationId) {
    const url = "http://localhost:8080/deletereservation/" + reservationId;
    const response = await postObjectAsJson(url, reservationId, "DELETE");
    if (response.ok) {
        alert("Hotel has been deleted");
    }
}

document = addEventListener('DOMContentLoaded', () => {
    fetchAllReservationsByHotel();
});

const roomContainerDate = document.getElementById('roomContainer');
let allRoomsDate = [];
const hotelIdDate = new URLSearchParams(window.location.search).get('hotelId');
let allReversations = [];


const fetchAllRoomsDate = async () => {
    const hotelIdDate = new URLSearchParams(window.location.search).get('hotelId');

    try {
        // First, fetch all reservations
        await fetchAllReservationsByHotel();

        const response = await fetch(`http://localhost:8080/roomsbyhotelid/${hotelIdDate}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allRoomsDate = await response.json();
        console.log(allRoomsDate);
        // Kalder på metoden
        removeMatchedObjects(allReversations, allRoomsDate);
    } catch (error) {
        console.error('Error fetching rooms:', error);
    }
};

const fetchAllReservationsByHotel = async () => {
    try {
        const response = await fetch('http://localhost:8080/allreservations/' + hotelIdDate); // Adjust the URL as needed
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allReversations = await response.json();
        console.log(allReversations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
    }
};

function removeMatchedObjects(reservedRooms, allRoomsDate) {

    // laver en array af roomIds
    const roomIds = reservedRooms.map(reservation => reservation.room.roomId);
    //Her filter vi så rum som er reseveret
    const filteredRooms = allRoomsDate.filter(room => !roomIds.includes(room.roomId));
        displayRoomsDate(filteredRooms);
}

const populateRoomCardDate = (room) => {
    const reservationDateUrl = new URLSearchParams(window.location.search).get('date');
    const roomCard = `
        <div class="room-card">
            <div class="room-id">Room ID: ${room.roomId}</div> 
            <div class="room-number">Room Number: ${room.roomNumber}</div>
            <div class="room-NOfBeds">Number Of Beds: ${room.numberOfBeds}</div>
            <button class="reserve" onclick="reserve('${reservationDateUrl}', ${room.roomId})">Reserve</button>
        </div>
    `;
    roomContainerDate.innerHTML += roomCard;
};

const displayRoomsDate = (rooms) => {
    clearRoomContainerDate();
    rooms.forEach((room) => {
        populateRoomCardDate(room);
    });
};

const clearRoomContainerDate = () => {
    const roomContainerDate = document.getElementById('roomContainer');
    roomContainerDate.innerHTML = '';
};

function reserve(date, roomId) {
    console.log("Reserving for date: " + date + " and roomId: " + roomId);
    window.location.href = `allGuests.html?date=${date}&roomId=${roomId}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const checkAvailabilityButton = document.getElementById('checkAvailability');
    const hotelIdDate = new URLSearchParams(window.location.search).get('hotelId');

    // Check for the availability button and add event listener
    if (checkAvailabilityButton) {
        checkAvailabilityButton.addEventListener('click', () => {
            const reservationDate = document.getElementById('reservationDate').value;
            window.location.href = `roomByDate.html?date=${reservationDate}&hotelId=${hotelIdDate}`;
        });
    }

    // Fetch all rooms based on hotel ID
    fetchAllRoomsDate();
});


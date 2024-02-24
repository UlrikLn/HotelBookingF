const hotelId = new URLSearchParams(window.location.search).get('hotelId');
const roomContainer = document.getElementById('roomContainer');
const createRoomBtn = document.getElementById('createRoom');
let allRooms = [];

const clearRoomContainer = () => {
    roomContainer.innerHTML = '';
}

const fetchAllRooms = async () => {

    try {
        const response = await fetch(`http://localhost:8080/roomsbyhotelid/${hotelId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allRooms = await response.json();
        displayRooms(allRooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
    }
}

    const populateRoomCard = (room) => {
        const roomCard = `
         <div class="room-card">
            <div class="room-id">Room ID: ${room.roomId}</div> 
            <div class="room-number">Room Number: ${room.roomNumber}</div>
            <div class="room-NOfBeds">Number Of Beds: ${room.numberOfBeds}</div>
         </div>
    `;
        roomContainer.innerHTML += roomCard;
    }

    const displayRooms = (rooms) => {
        clearRoomContainer();
        rooms.forEach((room) => {
            populateRoomCard(room);
        });
    }

document.addEventListener('DOMContentLoaded', () => {
    fetchAllRooms();
});

createRoomBtn.addEventListener('click', function ()  {
    window.location.href = `createRoom.html?hotelId=${hotelId}`;
});


const editButton = document.getElementById("editButton");
let allHotels = [];

const fetchAllHotels = async () => {
    try {
        const response = await fetch('http://localhost:8080/allhotels'); // Adjust the URL as needed
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allHotels = await response.json();
        displayHotels(allHotels);
    } catch (error) {
        console.error('Error fetching hotels:', error);
    }

}

const hotelContainer = document.getElementById('hotelContainer');


const populateHotelCard = (hotel) => {
    const hotelCard = `
         <div class="hotel-card">
            <div class="hotel-id">Hotel ID: ${hotel.hotelId}</div> 
            <div class="hotel-name">Hotel Name: ${hotel.name}</div>
            <div class="hotel-street">Hotel Street: ${hotel.street}</div>
            <div class="hotel-city">Hotel City: ${hotel.city}</div> 
            <div class="hotel-zip">Hotel Zip: ${hotel.zip}</div>
            <div class="hotel-country">Hotel Country: ${hotel.country}</div>
            <div class="hotel-rooms">Hotel Rooms: ${hotel.roomCount}</div>
            <button class="deleteButton" onclick="deleteHotel(${hotel.hotelId})">Delete</button>
            <button class="editButton" onclick="editHotel(${hotel.hotelId})">Edit</button>
            <button class="viewButton" onclick="viewHotel(${hotel.hotelId})">View</button>
            <button class="seeReservationsButton" onclick="seeReservations(${hotel.hotelId})">See Reservations</button>
         </div>
    `;
    hotelContainer.innerHTML += hotelCard;
}

const displayHotels = (hotels) => {
    clearHotelContainer();
    hotels.forEach((hotel) => {
        populateHotelCard(hotel);
    });
}

const searchHotels = () => {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const filteredHotels = allHotels.filter(hotel =>
        hotel.name.toLowerCase().includes(searchText)
    );
    displayHotels(filteredHotels);
}

const clearHotelContainer = () => {
    hotelContainer.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAllHotels();

    document.getElementById('searchButton').addEventListener('click', searchHotels);

    document.getElementById('hotelContainer').addEventListener('click', function(event) {
        if (event.target.classList.contains('editButton')) {
            const hotelId = event.target.getAttribute('onclick').match(/\d+/)[0]; // Extracting hotelId from onclick attribute
            window.location.href = `editHotel.html?hotelId=${hotelId}`;
        }
        if (event.target.classList.contains('viewButton')) {
            const hotelId = event.target.getAttribute('onclick').match(/\d+/)[0]; // Extracting hotelId from onclick attribute
            window.location.href = `viewHotel.html?hotelId=${hotelId}`;
        }
        if (event.target.classList.contains('seeReservationsButton')) {
            const hotelId = event.target.getAttribute('onclick').match(/\d+/)[0]; // Extracting hotelId from onclick attribute
            window.location.href = `seeReservations.html?hotelId=${hotelId}`;
        }
    });
});




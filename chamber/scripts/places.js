import {places} from '../data/places.mjs'; // Import the places data

console.log

//------------------GRAB A REFERENCE TO THE DIVISION WHERE THE CARDS WILL BE DISPLAYED------------------/
const showPlaces = document.querySelector("#myplaces");

//------------------CREATE A FUNCTION THAT WILL DISPLAY THE PLACES------------------/
function displayItems(places) {
  if (!Array.isArray(places)) {
    console.error("Expected an array of places");
    return;
  }

// Clear any existing cards
showPlaces.innerHTML = ''; 

places.forEach(place => {
    // build the card element
    const thecard = document.createElement('div');
    thecard.classList.add("card");
    
    // build the photo element
    const thephoto = document.createElement('img');
    thephoto.classList.add("place-photo");
    thephoto.src = `images/${place.place_link}`; 
    thephoto.alt = place.name;
    thephoto.oneerror = () => {
        thephoto.src = "images/placeholder.png"; // Placeholder image in case of error
    };
    thecard.appendChild(thephoto)
    
    // build the title element
    const thetitle = document.createElement('h2');  
    thetitle.classList.add = ("place-title");
    thetitle.innerText = place.name;
    thecard.appendChild(thetitle);
    
    // build the address element
    const theaddress = document.createElement('address');
    theaddress.classList.add("place-address");
    theaddress.innerText = place.address;
    thecard.appendChild(theaddress);
    
    // build the description element
    const thedesc = document.createElement('p');
    thedesc.classList.add("place-description");
    thedesc.innerText = place.description;
    thecard.appendChild(thedesc);

    // append the card to the container
    showPlaces.appendChild(thecard);
  }); // end loop
} // end function displayItems 
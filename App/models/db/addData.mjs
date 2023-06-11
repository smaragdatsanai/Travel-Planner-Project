import {TravelPlan, Flight, Destination, Accommodation, Rating, Favourites, User, Itinerary, TravelPlanAccommodation, TravelPlanDestination, TravelPlanFlight, TravelPlanItinerary}  from "./database.mjs";
import faker from 'faker' 
import { sequelize } from "./dbConfig.mjs";
import fs from 'fs';
import axios from 'axios';
import cheerio from 'cheerio';
import bcrypt from 'bcrypt';


export async function createUser(){
    try{
        await sequelize.sync({ alter: true });
        const password = faker.internet.password()
        const Password_hash = await bcrypt.hash(password, 10)
        for (let i = 0; i < 10; i++) {
            const user= await User.create({
              Username: faker.internet.userName(),
              Password:  Password_hash,
              Email: faker.internet.email(),
              ProfileImage: 'https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg'
            });
            // console.log(user)
          }
    }catch(error){
        console.error('Error adding data to User');
        console.error(error);
    }
} 

export async function createAccommodation(){
  try{
    // console.log("entered")
    const hotelNames = ['Majestic Expanse Motel',
      'Queens Park Hotel',
      'Remote Cave Resort',
      'Grand Crown Hotel',
      'Lords Tower Hotel',
      'Olive Jungle Hotel & Spa',
      'Retro Hotel',
      'Diorama Hotel',
      'Nimbus Hotel',
      'Utopia Motel',
      'Bronze Aurora Hotel & Spa',
      'King Oak Motel',
      'Bronze Arc Hotel',
      'Dual Tide Resort',
      'Snowy Cabin Motel',
      'Exalted Shrine Resort',
      'Vertex Hotel',
      'Tower Hotel',
      'Lunar Hotel & Spa',
      'Royal Hotel',
      'Sublime Pool Resort',
      'Lord House Hotel',
      'Secret Comfort Hotel',
      'Historic Temple Hotel',
      'Regal Renaissance Hotel',
      'Crown Garden Hotel',
      'Sanctuary Motel',
      'Utopia Resort',
      'Monolith Hotel',
      'Palace Hotel']
        
      for (let i = 1; i < 79; i++){

        const randomIndex = Math.floor(Math.random() * hotelNames.length);
        const randomPrice = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
        // console.log("enteredFor")
        const accommodation=await Accommodation.create({
          name: hotelNames[randomIndex],
          location: faker.address.streetAddress(),
          price: randomPrice,
          DestinationId: i,
        })
        // console.log(accommodation)
      }

   

      for (let i = 1; i < 79; i++){
        const randomIndex = Math.floor(Math.random() * hotelNames.length);
        const randomPrice = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
        const randomDestionationId = Math.floor(Math.random() * i) + 1;
        await Accommodation.create({
          name: hotelNames[randomIndex],
          location: faker.address.streetAddress(),
          price: randomPrice,
          DestinationId: randomDestionationId,
        })
      }

  }catch(error){
      console.error('Error adding data to Accommodation');
      console.error(error);
  }
} 

export async function createFlight(){
  try{
    const airlineNames = [
      'AEGEAN',
      'Turkish Airlines',
      'Ryanair',
      'Swiss',
      'Emirates',
      'Qatar Airways',
      'Lufthansa',
      'British Airways'
    ]

    const departureAirports = [
      'John F. Kennedy International Airport (JFK)',
      'London Heathrow Airport (LHR)',
      'Los Angeles International Airport (LAX)',
      'Dubai International Airport (DXB)',
      'Tokyo Haneda Airport (HND)',
      'Paris Charles de Gaulle Airport (CDG)',
      'Beijing Capital International Airport (PEK)',
      'Sydney Airport (SYD)',
      'Frankfurt Airport (FRA)',
      'Singapore Changi Airport (SIN)',
      'Amsterdam Airport Schiphol (AMS)',
      'Istanbul Airport (IST)',
      'Hong Kong International Airport (HKG)',
      'Toronto Pearson International Airport (YYZ)',
      'Dubai World Central - Al Maktoum International Airport (DWC)',
      'O\'Hare International Airport (ORD)',
      'San Francisco International Airport (SFO)',
      'Abu Dhabi International Airport (AUH)',
      'Incheon International Airport (ICN)',
      'Denver International Airport (DEN)'
    ]

    const arrivalAirports = [
      'London Heathrow Airport (LHR) - United Kingdom',
      'Charles de Gaulle Airport (CDG) - France',
      'Frankfurt Airport (FRA) - Germany',
      'Amsterdam Airport Schiphol (AMS) - Netherlands',
      'Istanbul Atatürk Airport (IST) - Turkey',
      'Madrid-Barajas Airport (MAD) - Spain',
      'Barcelona-El Prat Airport (BCN) - Spain',
      'Leonardo da Vinci-Fiumicino Airport (FCO) - Italy',
      'Heathrow Airport (LHR) - United Kingdom',
      'Munich Airport (MUC) - Germany',
      'Zurich Airport (ZRH) - Switzerland',
      'Vienna International Airport (VIE) - Austria',
      'Copenhagen Airport (CPH) - Denmark',
      'Dublin Airport (DUB) - Ireland',
      'Brussels Airport (BRU) - Belgium',
      'Lisbon Portela Airport (LIS) - Portugal',
      'Stockholm Arlanda Airport (ARN) - Sweden',
      'Helsinki-Vantaa Airport (HEL) - Finland',
      'Oslo Airport (OSL) - Norway',
      'Athens International Airport (ATH) - Greece'
    ]

    for (let i = 0; i < 150; i++) {

      const randomAirline = Math.floor(Math.random() * airlineNames.length);
      const randomDepartureAirports = Math.floor(Math.random() * departureAirports.length);
      const randomArrivalAirports = Math.floor(Math.random() * arrivalAirports.length);

      const airline = airlineNames[randomAirline];
      const departureDate = faker.date.future();
      const arrivalDate = faker.date.between(departureDate, faker.date.future());
      const departureAirport = departureAirports[randomDepartureAirports];
      const arrivalAirport = arrivalAirports[randomArrivalAirports];
      const departureLocation = faker.address.city();
      const arrivalLocation = faker.address.city();
      const price = parseFloat(faker.commerce.price(200, 1000));
      
      const flight = await Flight.create({
        airline: airline,
        departureDate: departureDate,
        arrivalDate: arrivalDate,
        departureAirport: departureAirport,
        arrivalAirport: arrivalAirport,
        departureLocation: departureLocation,
        arrivalLocation: arrivalLocation,
        price: price
      })
    }

  }catch(error){
      console.error('Error adding data to Flight');
      console.error(error);
  }
} 
export async function createItinerary(){
  try{
    const activityName = ['Bungee jumping', 'Skydiving', 'Zip-Lining', 'Museums-Art Galleries', 'City-Tour', 'Day Trips', 'Relaxation and Wellness'];

    for (let i = 1; i < 11; i++) {
      const itinerary = await Itinerary.create({
        activityName: faker.random.arrayElement(activityName),
        location: faker.address.city(),
        price: faker.random.number({ min: 20, max: 100 }),
        TravelPlanId: i
      })
      // console.log(itinerary)
    }
  }catch(error){
      console.error('Error adding data to Itinerary');
      console.error(error);
  }
} 


export async function createTravelPlan(){
  try{
    for (let i = 0; i < 10; i++) {
      const name = faker.random.words()
      const startDate = faker.date.future()
      const endDate = faker.date.between(startDate, faker.date.future())
      const status = faker.random.arrayElement(['Planning', 'In Progress', 'Completed'])
      const budget = parseFloat(faker.finance.amount(200, 5000, 2))
    
      const travelPlan = await TravelPlan.create({
        name: name,
        startDate: startDate,
        endDate: endDate,
        status: status,
        budget: budget,
        UserId: i+1
      })
    }
  }catch(error){
      console.error('Error adding data to TravelPlan');
      console.error(error);
  }
} 


export async function createRating(){
  try{
    const goodRating = [
      "The travel plan exceeded all expectations! From breathtaking sights to exceptional accommodations, every moment was filled with joy and adventure.",
      "I had an incredible experience with this travel plan. The itinerary was well-planned, allowing me to explore amazing destinations and immerse myself in the local culture."
    ];
    
    const badRating = [
      "The travel plan fell short of expectations. The accommodations were subpar, and the itinerary lacked interesting activities, leaving me disappointed throughout the trip.",
      "I had a negative experience with this travel plan. The transportation arrangements were unreliable, causing delays and frustration. Additionally, the chosen attractions were overcrowded and did not live up to their hype."
    ];
    
    for (let i = 0; i < 10; i++) {
      const rating = faker.datatype.number({ min: 1, max: 5 });
      const description = rating < 3
        ? faker.random.arrayElement(badRating)
        : faker.random.arrayElement(goodRating);
    
      await Rating.create({
        rating: rating,
        description: description,
        travelPlanId: i+1,
        UserId: i+1
      })
    }
  }catch(error){
      console.error('Error adding data to Rating');
      console.error(error);
  }
} 

export async function createFavourites(){
  try{

      for (let i = 1; i < 11; i++){
        await Favourites.create({
          UserId: i,
          TravelPlanId: i
        })
      }
  }catch(error){
      console.error('Error adding data to Rating');
      console.error(error);
  }
} 


async function createDestination(countryName,cityName,image){
    try{
        await sequelize.sync({ alter: true });

        const Dest= await Destination.create({
            Country: countryName,
            City: cityName,
            Image: image
          });
    }catch(error){
        console.error('Error adding data to destination:', cityName);
    }
}

async function scrapeCityData(cityName) {
    try {
        const destinationUrl = `https://en.wikivoyage.org/wiki/${encodeURIComponent(cityName)}`;
        // console.log(destinationUrl);
        const destinationResponse = await axios.get(destinationUrl);
        const $ = cheerio.load(destinationResponse.data);
        
        // Find the <span> elements with the class 'fn org listing-name'
        const imgSrc = $('.wpb-banner-image').attr('src');
        // console.log(imgSrc);
        return imgSrc;
    } catch (error) {
      console.error('Error scraping city:', cityName);
      return null;
    //   console.error(error);
    }
  };


async function scrapeCountryData(countryName) {
    try {
        const destinationUrl = `https://en.wikivoyage.org/wiki/${encodeURIComponent(countryName)}`;
        // console.log(destinationUrl);
        const destinationResponse = await axios.get(destinationUrl);
        const $ = cheerio.load(destinationResponse.data);
        
        // Find the <span> elements with the class 'fn org listing-name'
        const cityElements = $('span.fn.org.listing-name');

        // Extract the city names from the elements
        const cities = cityElements.map((index, element) => $(element).text()).get();
        cities.forEach(async (city) => {
            // console.log(city);
            const img= await scrapeCityData(city);
            // console.log(img);
            if(img){
                await createDestination(countryName,city,img);
            }
            else{
                const image='https://cdn-icons-png.flaticon.com/512/1244/1244560.png?w=740&t=st=1686252279~exp=1686252879~hmac=fc38e27ee75b916dde495b5e96cc05ee36b09e0922004378f69d346160246db8'
                await createDestination(countryName,city,image);
            }
          });
        
    } catch (error) {
      console.error('Error scraping country:', countryName);
      console.error(error);
    }
  };

export async function fetchWikivoyageData() {
  try {
    const response = await axios.get('https://en.wikivoyage.org/wiki/Destinations');
    const $ = cheerio.load(response.data);
    
    const liItems = $('table li',);
    liItems.each(async (index, element) => {
      if (index <= 6) {
        const listItemText = $(element).text();
        // console.log(listItemText);
        scrapeCountryData(listItemText);
      }
    });
    
  } catch (error) {
    console.error('Error fetching data from Wikivoyage:', error);
  }
};


export async function createTravelPlanAccommodation(){
  try{
    for (let i = 1; i < 11; i++) {
      const travelPlan = await TravelPlan.findByPk(i)
      const accommodation = await Accommodation.findOne({ order: sequelize.random() });
    
      const checkInDate = faker.date.between(travelPlan.startDate, travelPlan.endDate);
      const checkOutDate = faker.date.between(checkInDate, travelPlan.endDate);
      // console.log("Selected check-in date:", checkInDate)
      // console.log("Selected check-out date:", checkOutDate)

      const travelPlanAccommodation = await TravelPlanAccommodation.create({
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        TravelPlanId: travelPlan.id,
        AccommodationId: accommodation.id
      })
      // console.log(travelPlanAccommodation)
    }
  }catch(error){
      console.error('Error adding data to TravelPlanAccomodation');
      console.error(error);
  }
} 



export async function createTravelPlanDestination(){
  try{
    for (let i = 1; i < 11; i++) {
      const travelPlan = await TravelPlan.findByPk(i)
      const destination = await Destination.findOne({ order: sequelize.random() });


      const travelPlanDestination = await TravelPlanDestination.create({
        TravelPlanId: travelPlan.id,
        DestinationId: destination.id,
        from: travelPlan.startDate,
        until: travelPlan.endDate
      })
      // console.log(travelPlanDestination)
    }
  }catch(error){
      console.error('Error adding data to TravelPlanDestination');
      console.error(error);
  }
} 


export async function createTravelPlanFlight(){
  try{
    for (let i = 1; i < 11; i++) {
      const travelPlan = await TravelPlan.findByPk(i)
      const flight = await Flight.findOne({ order: sequelize.random() });


      const travelPlanFlight = await TravelPlanFlight.create({
        TravelPlanId: travelPlan.id,
        FlightId: flight.id,
      })
      // console.log(travelPlanFlight)
    }
  }catch(error){
      console.error('Error adding data to TravelPlanFlight');
      console.error(error);
  }
} 

export async function createTravelPlanItinerary(){
  try{
    for (let i = 1; i < 11; i++) {
      const travelPlan = await TravelPlan.findByPk(i)
      const itinerary = await Itinerary.findOne({ order: sequelize.random() });

      const date = faker.date.between(travelPlan.startDate, travelPlan.endDate);
      const travelPlanItinerary = await TravelPlanItinerary.create({
        TravelPlanId: travelPlan.id,
        ItineraryId: itinerary.id,
        datetime: date
      })
      // console.log(travelPlanItinerary)
    }
  }catch(error){
      console.error('Error adding data to TravelPlanDestination');
      console.error(error);
  }
} 
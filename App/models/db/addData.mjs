import {TravelPlan, Flight, Destination, Accommodation, Rating, Favourites, User, Itinerary}  from "./database.mjs";
import faker from 'faker' 
import { sequelize } from "./dbConfig.mjs";
import fs from 'fs';
import axios from 'axios';
import cheerio from 'cheerio';



export async function createUser(){
    try{
        await sequelize.sync({ alter: true });
        const password= faker.internet.password()
        const Password_hash = await bcrypt.hash(password, 10)
        for (let i = 0; i < 10; i++) {
            const user= await User.create({
              Username: faker.internet.userName(),
              Password:  Password_hash,
              Email: faker.internet.email(),
              ProfileImage: 'https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg'
            });
            console.log(user)
          }
    }catch(error){
        console.error('Error adding data to User');
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
        console.log(destinationUrl);
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
        console.log(destinationUrl);
        const destinationResponse = await axios.get(destinationUrl);
        const $ = cheerio.load(destinationResponse.data);
        
        // Find the <span> elements with the class 'fn org listing-name'
        const cityElements = $('span.fn.org.listing-name');

        // Extract the city names from the elements
        const cities = cityElements.map((index, element) => $(element).text()).get();
        cities.forEach(async (city) => {
            console.log(city);
            const img= await scrapeCityData(city);
            console.log(img);
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
        console.log(listItemText);
        scrapeCountryData(listItemText);
      }
    });
    
  } catch (error) {
    console.error('Error fetching data from Wikivoyage:', error);
  }
};



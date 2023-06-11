import {Flight, Destination, Accommodation, Rating, Favourites, User, Itinerary, TravelPlanAccommodation, TravelPlanDestination, TravelPlanFlight, TravelPlanItinerary}  from "./db/database.mjs";

import { TravelPlan as dbTravelPlan} from "./db/database.mjs";
import { sequelize } from "./db/dbConfig.mjs";
import { Op } from "sequelize";

export class TravelPlan {
// , user_id, plan_name, destination, start_date, end_date
    constructor(plan_id) {
        this.plan_id = plan_id;
        // this.user_id = user_id;
        // this.plan_name = plan_name;
        // this.destination = destination;
        // this.start_date = start_date;
        // this.end_date = end_date;
    }
    
    fillForm() {

    }

    submitEmptyForm() {

    }

    createPlan() {

    }

    choosePlan() {

    }

    async viewPlan() {
        const foundPlan = await dbTravelPlan.findByPk(this.plan_id, {
            include: [
              {
                model: Flight
              },
              {
                model: Destination,
                through: TravelPlanDestination
              },
              {
                model: Accommodation,
                through: TravelPlanAccommodation
              }
            ]
          });
          

          if (foundPlan) {
            const plan = foundPlan.toJSON();
            
            return plan;
          } else {
            return null; 
          }
    }

    enrichPlan() {

    }

    chooseTopDestination() {

    }

    configureDetails() {

    }

    cantCreatePlan() {

    }
    
    planNotFound() {

    }
    
    dataAuthentication() {

    }
    
    provideSuggestions() {

    }
    
    getPlanVisibility() {

    }
    
    updateDatabase() {
        
    }
}

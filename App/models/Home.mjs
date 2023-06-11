import {TravelPlan, Flight, Destination, Accommodation, Rating, Favourites, User, Itinerary, TravelPlanAccommodation, TravelPlanDestination, TravelPlanFlight, TravelPlanItinerary}  from "./db/database.mjs";
import { sequelize } from "./db/dbConfig.mjs";
import { fn } from "sequelize";

export class Home {

    // constructor() {
    // }

    async getTopPlans(){
        try {
            console.log('ENTERED')

            // const plans = await Rating.findAll({
            //     include: [
            //       {
            //         model: TravelPlan,
            //         attributes: [
            //           'id',
            //           [sequelize.fn('AVG', sequelize.col('Rating.rating')), 'averageRating'],
            //         ],
            //       },
            //     ],
            //     group: ['TravelPlan.id'],
            //   });
            const plans = await Rating.findAll({
                attributes: ['travelPlanId',[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']],
                group: ['travelPlanId'],
                order: [[sequelize.col('averageRating'), 'DESC']],
              });
            const planList= plans.map(item => item.toJSON());
            console.log(planList)
            
            return planList;
          } catch (error) {
            // Handle the error appropriately
          }
    }



}

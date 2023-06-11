import { Flight } from './Flight.mjs';
import { Destination } from './Destination.mjs';
import { TravelPlanDestination } from './TravelPlanDestination.mjs';
import { Accommodation } from './Accommodation.mjs';
import { TravelPlanAccommodation } from './TravelPlanAccommodation.mjs';

class TravelPlan {
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
        const foundPlan = await TravelPlan.findByPk(planId, {
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

          const plan= await foundPlan.map(item => item.toJSON());
          return plan;
    }

    enrichPlan() {

    }

    chooseTopDestination() {
    // Retrieve the destinations of the travel plan
    const destinations = this.getDestinations();

    // Retrieve the feedbacks for the travel plan
    const feedbacks = Feedback.getFeedbacksByPlanId(this.plan_id);

    // Calculate the popularity of each destination based on user feedback ratings
    const popularityMap = {};
    destinations.forEach((destination) => {
      const destinationFeedbacks = feedbacks.filter(
        (feedback) => feedback.plan_id === this.plan_id && feedback.destination === destination.name
      );
      const totalFeedbacks = destinationFeedbacks.length;
      const totalRating = destinationFeedbacks.reduce((sum, feedback) => sum + feedback.stars, 0);
      const averageRating = totalRating / totalFeedbacks;
      popularityMap[destination.name] = averageRating;
    });

    // Sort the destinations by popularity in descending order
    const sortedDestinations = Object.entries(popularityMap).sort(
      (a, b) => b[1] - a[1]
    );

    // Return the top destinations
    const topDestinations = sortedDestinations.map(([destinationName]) => destinationName);
    return topDestinations;
  }

  getDestinations() {
    // Retrieve the destinations of the travel plan from the database
    // Example implementation, replace with your actual logic
    const destinations = Destination.findAll({
      where: {
        travelPlanId: this.plan_id,
      },
    });

    return destinations;
     }
   }
}
export { TravelPlan };
   

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

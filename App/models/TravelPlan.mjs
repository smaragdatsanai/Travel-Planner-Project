import { Destination } from './Destination.mjs';

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

    // Calculate the popularity of each destination based on user feedback
    const popularityMap = {};
    destinations.forEach((destination) => {
      const feedbacks = destination.getFeedbacks();
      const totalFeedbacks = feedbacks.length;
      const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
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

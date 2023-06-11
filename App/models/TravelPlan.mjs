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

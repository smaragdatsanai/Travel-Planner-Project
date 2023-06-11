class User {
    
    constructor(search) {
        // this.username = req.session.username;
        this.search=search
    }

    hasUserAccount() {

    }

    
    balanceNotification() { //if budget balance low

    }
    
    saveReport() {

    }
    
    requestBudgetDestribution() {

    }
    
    requestExpenses() {

    }
    
    buildPlan() {

    }
    
    requestPlanData() {

    }
    
    requestFromSuggestions() {

    }       
    
    setPlanVisibility() {

    }

    requestVisibility() {

    }
    
    requestReservationChanges() {

    }

    calculateSimilarity(str1, str2) {
        const commonChars = [...new Set([...str1].filter(char => str2.includes(char)))];
        const similarity = (commonChars.length / Math.max(str1.length, str2.length)) * 100;
        return similarity;
      }

    async search() {
        const foundPlans = await TravelPlan.findAll({
            where: {
              name: {
                [sequelize.Op.like]: `%${this.search}%`
              }
            }
          });

          const planList= await foundPlans.map(item => item.toJSON());
          const sortedPlans =  planList.sort((planA, planB) => {
            const similarityA = calculateSimilarity(planA.name, this.search);
            const similarityB = calculateSimilarity(planB.name, this.search);
            return similarityB - similarityA;
          });
      
          return sortedPlans;
    }



    updateDatabase() {
        
    }
}

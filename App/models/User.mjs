import { User as dbUser } from '../models/User.mjs';
import { TravelPlan} from "./db/database.mjs";
import { sequelize } from "./db/dbConfig.mjs";
import { Op } from "sequelize";

export class User {
  constructor(searchInput) {
    this.searchInput = searchInput;
  }
  
   async search() {
    console.log(this.searchInput)
    const foundPlans = await TravelPlan.findAll({
      where: {
        name:{        
          [Op.iLike]: `%${this.searchInput}%`
        }
      }
    });
    
    console.log(foundPlans)
    const planList = foundPlans.map(item => item.toJSON());
    
    console.log(planList)
    const sortedPlans = planList.sort((planA, planB) => {
      const similarityA = this.calculateSimilarity(planA.name, this.search);
      const similarityB = this.calculateSimilarity(planB.name, this.search);
      return similarityB - similarityA;
    });

    return sortedPlans;
  }

  calculateSimilarity(str1, str2) {
    const commonChars = [...new Set([...str1].filter(char => str2.includes(char)))];
    const similarity = (commonChars.length / Math.max(str1.length, str2.length)) * 100;
    return similarity;
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
    
    updateDatabase() {
        
    }
  
}

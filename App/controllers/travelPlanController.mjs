import { TravelPlan } from '../models/TravelPlan.mjs';

export async function getPlan(req, res, next) {
    try {

        const selectedPlan=new TravelPlan(req.params.planId)
        const plan=await selectedPlan.viewPlan()
        console.log(plan)
        if(plan){
            res.render('./TravelPlan',{travelPlan:plan})
        }
        else{
            res.render('./home',{message:'failed to view plan'})
        }
    }catch(error){
        next(error)
    }
}

export async function showTopDestinations(req, res, next) {
  try {
    const planId = req.params.planId;
    const selectedPlan = new TravelPlan(planId);
    const topDestinations = selectedPlan.chooseTopDestination();

    res.render('./topDestinations', { topDestinations });
  } catch (error) {
    next(error);
  }
}
    

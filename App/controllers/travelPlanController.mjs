import * as travelPlan from '../models/TravelPlan.mjs'

export async function getPlan(req, res, next) {
    try {

        const selectedPlan=new travelPlan(req.params.planId)
        const plan=selectedPlan.viewPlan()
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
    

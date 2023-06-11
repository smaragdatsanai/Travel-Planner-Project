import * as UserAcc from '../models/UserAccount.mjs' 
import { User } from '../models/User.mjs';
import { Home } from '../models/Home.mjs';
import { TravelPlan } from '../models/TravelPlan.mjs';

//////// SEARCH FOR PLAN ////////////////

export async function analyzeSearch(req, res, next) {
    try {
        const searchInput= req.body.searchInput;
        console.log(searchInput)
        const user = new User(searchInput)
        const plans=await user.search()
        console.log(plans)
        if (plans){
            res.render('./plans',{Plans:plans})
        }
        else{
            res.render('./home',{message:'No plans found'})
        }
    }catch(error){
        next(error)
    }
}

//HOME PAGE//


export async function homePageRender(req,res,next){
    try{
        console.log('HOME')
        const homePage=new Home()
        const topPlans = await homePage.getTopPlans()
        const slicedPlans = topPlans.slice(0, 5);
        console.log(slicedPlans)
        const displayPlans=[]
        for (const plan of slicedPlans) {
            const Plan= new TravelPlan(plan.travelPlanId)
            const newPlan= await Plan.viewPlan()
            displayPlans.push(newPlan)
        }
        // console.log(displayPlans)
        
        res.render('./home', {Plans:displayPlans,planRating:slicedPlans})
    }catch(error){
        next(error)
    }
}




// LOGIN REGISTER LOG OUT 

const doLogin = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    try{
        const user = await UserAcc.login(username,password)
        if (user) {
            req.session.username = req.body.username // το username μπαίνει σαν μεταβλητή συνεδρίας
            req.session.userId=user.UserId
            res.locals.username = req.session.username
            next() 
        }
        else {
            throw new Error("άγνωστο σφάλμα")
        }
    }catch(error){
        next(error)
    }
}

const doRegister = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    console.log(req.body)
    try {
        const user = await UserAcc.addUser(username,password,email)
        if (user) {
            res.locals.message="Η εγγραφή του χρήστη έγινε με επιτυχία"
            next()
        }
        else {
            throw new Error("άγνωστο σφάλμα κατά την εγγραφή του χρήστη")
        }
    } catch (error) {
        next(error)
    }
}

const doLogout = (req, res, next) => {
    req.session.destroy()
    next()
}


function checkIfAuthenticated(req, res, next) {
    if (req.session.username) { //αν έχει τεθεί η μεταβλητή στο session store θεωρούμε πως ο χρήστης είναι συνδεδεμένος
        res.locals.username = req.session.username
        res.locals.userType = req.session.userType
        next() //επόμενο middleware
    }
    else
        res.redirect("/") //αλλιώς ανακατεύθυνση στην αρχική σελίδα
}


export { checkIfAuthenticated, doLogin, doRegister, doLogout}
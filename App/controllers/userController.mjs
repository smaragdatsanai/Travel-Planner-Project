import * as UserAcc from '../models/UserAccount.mjs' 
import { User } from '../models/User.mjs';

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
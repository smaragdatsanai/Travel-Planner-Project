
import express from 'express'
const router = express.Router()

import * as Validator from '../validator/validation.mjs'


import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    console.log('loading .env')
    dotenv.config();
}


const AccommodationController = await import('../controllers/accommodationController.mjs')
const ActivitiesController = await import('../controllers/activitiesController.mjs')
const BudgetController = await import('../controllers/budgetController.mjs')
const DestinationController = await import('../controllers/destinationController.mjs')
const FeedbackController = await import('../controllers/feedbackController.mjs')
const TravelPlanController = await import('../controllers/travelPlanController.mjs')

const UserController = await import('../controllers/userController.mjs')

import multer from 'multer';
const upload = multer({ dest: 'public/uploads/' });


router.get("/", (req, res) => {
    // if (req.session.username)
        res.redirect("/home")
    // else
    //     res.redirect("/login")
}
);

router.get('/home',
    // UserController.checkIfAuthenticated,
    (req, res) => {
        res.render('./home')
    }
);



//USER 

router.get('/login', (req, res) => {
    res.render('./loginForm');
    }
);


router.get('/register', (req, res) => {
    res.render('./registrationForm');
    }
);



router.post("/doLogin",
    Validator.validateLogin,
    UserController.doLogin,
    (req, res) => {
        res.redirect('/home')
    }
);


router.post("/doRegister",
    Validator.validateNewUser,
    UserController.doRegister,
    UserController.doLogin,
    (req, res) => {
        res.redirect('/home')
    }
);


router.get('/logout',
    UserController.checkIfAuthenticated,
    UserController.doLogout,
    (req, res) => {
        res.redirect('./');
    }
);

router.get('/switchaccounts',
    UserController.checkIfAuthenticated,
    (req, res) => {
        UserController.doLogout,
        res.redirect('./login')
    }
);




// SEARCH FOR PLAN USE CASE 

router.post('/searchForPlan',
    UserController.analyzeSearch,
    (req, res) => {
       res.render('./home')
    }

)

router.get('/viewPlan/:planId',
    UserController.checkIfAuthenticated,
    TravelPlanController.getPlan

)
export default router;


import express from 'express'
const router = express.Router()

import * as Validator from '../validator/validation.mjs'


import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    console.log('loading .env')
    dotenv.config();
}

import multer from 'multer';

const upload = multer({ dest: 'public/uploads/' });


router.get("/", (req, res) => {
    
        res.render("./home")
}
);

export default router;

// Express.js
import express from 'express'
// Handlebars (https://www.npmjs.com/package/express-handlebars)
import { engine } from 'express-handlebars'

import session from 'express-session'
import createMemoryStore from 'memorystore'
import {router} from './routes.mjs'
import 'dotenv/config'


// Δημιουργία ενός memory store constructor 
const MemoryStore = createMemoryStore(session);


const myAppSession= session({
    secret: process.env.SESSION_SECRET,
    store: new MemoryStore({ checkPeriod: 86400 * 1000 }),
    resave: false,
    saveUninitialized: false,
    name: "reservEAT", // αλλιώς θα είναι connect.sid
    cookie: {
        maxAge: 1000 * 60 * 20 // 20 λεπτά
    }
})


const app = express()

app.use(myAppSession)

const port = process.env.PORT || '3000';

// Δηλώνουμε πως ο φάκελος "public" θα περιέχει τα στατικά αρχεία, π.χ. το http://127.0.0.1:3000/style.css θα επιστρέψει, το αρχείο /public/style.css
// Specify that the "public" folder will contain the static files, e.g. http://127.0.0.1:3000/style.css will return, the file /public/style.css
app.use(express.static('public'))

// Χρήση της Handlebars σαν template engine. Σημ.: η engine πρέπει να έχει ίδιο όνομα με το extname, για να αναγνωριστεί το extname (το κάνουμε αυτό για να έχουμε αρχεία με κατάληξη .hbs / το default είναι .handlebars)
// Use Handlebars as a template engine. Note: the engine must have the same name as the extname, in order for the extname to be recognized (we do this to have files ending in .hbs / the default is .handlebars)
app.engine('hbs', engine({ extname: 'hbs' }));

// Ορίζουμε πως η 'hbs' θα είναι η μηχανή template (δηλ. θα ενεργοποιείται με την res.render()) 
// Set 'hbs' to be the template engine (i.e. activated with res.render())
app.set('view engine', 'hbs');

app.use("/",router)

app.use((req,res)=> {
    res.redirect("/")
})

const server = app.listen(port, () => { console.log(`http://127.0.0.1:${port}`) });

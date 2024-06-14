// Importeer het npm pakket express uit de node_modules map
import express, { application, json, request } from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

app.use(express.urlencoded({extended: true }))

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
});

const apiUrl = "https://fdnd-agency.directus.app/items/";
const apiHouse = `${apiUrl}f_houses`;
const apiHouseIMG = `${apiUrl}f_houses?fields=*,poster_image.id,poster_image.height,poster_image.width`;
const apiList = `${apiUrl}f_list`;
const apiUsers = `${apiUrl}f_users`;
const apiFeedback = `${apiUrl}f_feedback`;

// https://fdnd-agency.directus.app/admin/content/f_houses
// https://fdnd-agency.directus.app/admin/content/f_list
// https://fdnd-agency.directus.app/admin/content/f_users
// https://fdnd-agency.directus.app/admin/content/f_feedback

app.get('/', function(request, response) {
  fetchJson('https://fdnd-agency.directus.app/items/f_houses')
  response.render('index')
});

// app.get("/lijsten", async function (request, response) {
//   const housesPromise = fetchJson(apiHouse);
//   const listPromise = fetchJson(apiList);
//   console.log(listPromise)

//   const [houses, lists] = await Promise.all([housesPromise, listPromise]);
//   console.log("houses:", houses);


//   response.render("lijsten", {
//     houses: houses.data,
//     lists: lists.data
//   });
// });



app.get('/lijsten', function (request, response) {
  fetchJson('https://fdnd-agency.directus.app/items/f_houses/') 
    
    .then((apiData) => {
      // lijsten naar lijsten.ejs {
      response.render('lijsten.ejs', {
        // apiHouse:apihouse naar houses:apiData.data.
        // "houses" is the name that you will use in your html to call the data
        // "apiData.data" is the data that you got from the fetch function on line 65 
        // and the reason you add ".data" at the end of apiData is because data is the 
        // container-name of the actual data that you need 
        houses: apiData.data
      })  
      console.log(apiData.data)
      // console.log(apiData.houses) 
      // response.redirect(303, '/')
  })
 })

//  app.get('/house', function (request, response) {
//   fetchJson('https://fdnd-agency.directus.app/items/f_houses')
//   .then((apiData) => {
//       console.log(apiData.data)
//       response.render('lijsten', {
//         data: apiData.data
//       })
// });
// })

const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
// const scraper = require('./scraper');

app.use(cors());

const PORT = process.env.PORT || 3000;
const campusSite = 'https://lego.isscatering.dk/aastvej/en';
const midtownSite = 'https://lego.isscatering.dk/midtown/en';


app.get('/', async (req, res) => {
   res.json('Hello from index');
})

app.get('/midtownMenu', async (req, res) => {
   axios(midtownSite)
      .then(response => {
         const html = response.data
         const $ = cheerio.load(html)
         const menuItemsArray = []

         $('.menu-row.show-description.row', html).each(function () {
            const title = $(this).find('.element.title.col-md-12.col-xs-12').text().trim()
            const description = $(this).find('.element.show-description.description.col-md-12.col-xs-12').text().trim()

            menuItemsArray.push({
               title,
               description
            })
         })

         console.log(menuItemsArray);
         res.json(menuItemsArray)

      }).catch(err => console.log(err));
})

app.get('/campusMenu', async (req, res) => {
   axios(campusSite)
      .then(response => {
         const html = response.data
         const $ = cheerio.load(html)
         const menuItemsArray = []

         $('.menu-row.show-description.row', html).each(function () {
            const title = $(this).find('.element.title.col-md-12.col-xs-12').text().trim()
            const description = $(this).find('.element.show-description.description.col-md-12.col-xs-12').text().trim()

            menuItemsArray.push({
               title,
               description
            })
         })

         console.log(menuItemsArray);
         res.json(menuItemsArray)

      }).catch(err => console.log(err));
})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

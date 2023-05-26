const axios = require('axios');
const cheerio = require('cheerio');



function getMenu(url) {
   axios(url)
      .then(response => {
         const html = response.data
         const menu = cheerio.load(html)
         const menuItemsArray = []

         menu('.menu-row.show-description.row', html).each(function () {
            const title = menu(this).find('.element.title.col-md-12.col-xs-12').text().trim()
            const description = menu(this).find('.element.show-description.description.col-md-12.col-xs-12').text().trim()

            menuItemsArray.push({
               title,
               description
            })
         })

         console.log('FROM SCRAPER');
         console.log(menuItemsArray);

         return menuItemsArray;
         // response.json(menuItemsArray) 
      }).catch(err => console.log(err));
   // return menuItemsArray
}

module.exports = { getMenu }

// getMenu('https://lego.isscatering.dk/aastvej');
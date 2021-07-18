const expressHandlebars = require('express-handlebars');
const hbs = expressHandlebars.create({});
hbs.handlebars.registerHelper("splitYear", (date) => (date) ? date.slice(0,4) : '');
hbs.handlebars.registerHelper("convertToHours", (mins) => {
    let hours = Math.floor(mins/60)
    let min = Math.round(((mins/60)-hours) * 60)
    return hours+'h '+min+'m'
});
hbs.handlebars.registerHelper("ratingRoundToFive", (rating) => (rating/2));
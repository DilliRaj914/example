
module.exports = (app) => {
    const Details = require('../controllers/apicontroller');

    
    // app.post('/details', Details.create);

   
    app.get('/details',  Details.find);


    app.get('/details/:detailsId',  Details.findOneAndUpdate);


    app.put('/details/:detailsId', Details.findById);


    app.delete('/details/:detailsId',   Details.findByIdAndRemove);
}
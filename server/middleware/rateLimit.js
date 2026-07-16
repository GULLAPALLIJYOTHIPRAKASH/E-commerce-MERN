const rateLimit = require('express-rate-limit');


// auth
const AuthRateLimit = rateLimit({
    windowMs:  15* 60 *1000, // 15minutes
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders:false,
    handler: (req, res) => {
        return res.status(429).json({
            success: false,
            message: "Too many authentication requests. Please try again after 15 minutes."
        });
    }
});


// Shop all api
const ShopRateLimit = rateLimit({
    windowMs: 15* 60 * 1000,
    limit:100,
    standardHeaders:"draft-8",
    legacyHeaders:false,
    handler: (req ,res) => {
        return res.status(429).json({
                success:false,
                message:"Too many requests. Please try again after 15 minutess"
            })
        
    }
});






module.exports = {AuthRateLimit , ShopRateLimit}
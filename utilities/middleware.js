   const reviews=require("../schema/review.js");
 let listing=require("../schema/scema.js");
   module.exports = (req, res, next) => {
    console.log(req.originalUrl); 
    if (!req.isAuthenticated()) {
        req.session.redirecturl=req.originalUrl;
        req.flash("success", "You have to be logged in first");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveredirecturl = (req, res, next) => {
    if( req.session.redirecturl){
   res.locals.redirecturl= req.session.redirecturl;//this is storing in locals because passport will delete the redirect url from session so passport cant access the locals
    }
    next();
};

module.exports.author=async(req,res,next)=>{
     let{id,reviewid}=req.params;
     let review= await reviews.findById(reviewid);
     if(!review.author.equals( res.locals.currentUser._id)){
       req.flash( "success","you are not a author of this review");
       return res.redirect(`/listing/${id}`);
     }
     next();
};
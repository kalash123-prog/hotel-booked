 require('dotenv').config(); // this used to access from .env file which is used for connecting and storing our files to cludeflare
 //then it will generate one link and save it in mongodbs
//  console.log(process.env.API_KEY)
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
 const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodoverride=require("method-override");
const ejsmate=require("ejs-mate");
const wrapasync=require("./utilities/wrap.js");
const expresserror=require("./utilities/error.js");
const reviews=require("./schema/review.js");
const cookieparser=require("cookie-parser");
const Session=require("express-session");
const MongoStore = require('connect-mongo').default;
const flash=require("connect-flash");
const passport=require("passport");//it is used in authenticating library
const passportlocal=require("passport-local");
const User=require("./schema/user.js");
const middleware=require("./utilities/middleware.js");
const {saveredirecturl,author}=require("./utilities/middleware.js");
const Booking = require("./schema/booking.js");
const Razorpay = require("razorpay");
const multer = require('multer'); //this multer package is used to parse or get files from form because we cannot store files from form
const {storage}=require("./configure.js");
const upload = multer({storage});//this will upload files from form to this file 'uploads/'.
app.use(methodoverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
let listing=require("./schema/scema.js");
const { required } = require("joi");
const TripPlan = require("./schema/tripPlan.js");
const { generateTripPlan } = require("./services/tripPlannerService.js");
app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs", ejsmate);
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}

main().then(()=>{
 console.log("connect successfully");
}).catch((err)=>{
    console.log(err);
});

app.listen(8080,()=>{
console.log("listening");
});
//cookies are small pice of data which is stored by website or server to users browser
// in authentication we use cookies to stay logged on website 
// shopping apps if we add some items in carts so it will save 
// it also give  realted videos on youtube by cokkies by tracking it
// app.use(cookieparser("seceret code"));//to other paths can access it we use this middleware,"seceret code" this is use to signesd cookies

// app.get("/getcokkies",(req,res)=>{
// res.cookie("hello","dosto");
// res.cookie("ilove","dhurandhar");// wesend a cookies to server by name and value pair
// res.send("cookie send successfully");
// });

// app.get("/greet",(req,res)=>{
// let {hello="anonymous"}=req.cookies;
// res.send(`name is ${hello}`);
// });
// //if we want to access the cookies on another path like /listing path then we have to download one package whis is cokkie parser 
// // and to use it we first have pass with middle ware then only cookie will parse to another path.
// app.get("/",(req,res)=>{
// console.dir(req.cookies);
// res.send("working successfully");
// });

// //we use signed cookies because user shoud not tamper our cookies means user cant chnage our cookie.

// app.get("/signedcookies",(req,res)=>{
// res.cookie("name","shreeya" ,{signed:true});
// res.send("signed cookie");
// });
// //to verify
// app.get("/verify",(req,res)=>{
// console.dir(req.signedCookies);//req.signedCookies we use this because it prints which are signed cookies an req.cookies print only unsigned cookiies
// res.send("verified");
// });
// //if we change entire value then it will give empty in our server.
// //if we change only value masn single word then it will give false on server

// app.get("/testing",(req,res)=>{
// let {cart}=req.cookies;
// res.send(`user has ${cart} in cart`);
// });

//express session creates a unique id for user when user login and save there information by req.session and server  send  a sessionid it to users browser 
//then if try to click any button or to move to another page then it will browser will send the same session to server and checks and we stay logged in


const store = MongoStore.create({
    mongoUrl:process.env.MONGO_URI,
    crypto:{
      secret:"myseceretcode",
    },
   touchafter:24*3600,
});

const sessionoption={
      store,
    secret:"myseceretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() +7*24*60*60*1000,// it use to save our information upto 7 weeks in cookie 
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}

app.use(Session(sessionoption));
app.use(flash());

app.use(passport.initialize());//it is use to initialize
app.use(passport.session());//it is used in when we have multiple request in one session so session will remember the password so we dont have to login again when we request again
passport.use(new passportlocal(User.authenticate()));//Defines authentication strategy using username and password

passport.serializeUser(User.serializeUser());//it is used to store user information in session
passport.deserializeUser(User.deserializeUser());// it is used to remove information from session

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error"); 
  res.locals.currentUser = req.user;     
  next();
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.get("/listing/search-page", (req, res) => {
  res.render("search-page.ejs", { listings: [] });
});

app.get("/sign",(req,res)=>{
res.render("sign.ejs");
});

app.post("/signup",wrapasync(async(req,res)=>{
    try{
let {email,username,password}=req.body;
let newuser=new User({
email:email,
username:username,
});
 let register=await User.register(newuser,password); //it is used to store username with password also check if the usename is unique or not
 console.log(register);
 req.login(register,(err)=>{// this function is provide by passport where we can auto login after registeration
  if(err){
    return next(err);
  }
 req.flash("success","welcome!");
 res.redirect("/listing");
});
}
catch(e){
req.flash("success",e.message);
res.redirect("/sign");
}
}));

app.get("/login",(req,res)=>{
console.log(req.user);
res.render("login.ejs");
});

app.post(
    "/login",saveredirecturl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: false,
    }),
    async (req, res) => {
        req.flash("success", "you are successfully logged in");
        const redirectUrl = res.locals.redirecturl || "/listing"; 
        res.redirect(redirectUrl);
    }
);
// app.post("/login",passport.authenticate("local",{failureRedirect:"/login",failureFlash:false}),//this is used to check the given given password is cooreect or not
// async(req,res)=>{
// req.flash("success","you are successfully logged in");
// res.redirect( res.locals.redirecturl);
// });

app.get("/logout",(req,res)=>{
  req.logout((err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","you are successfully logout");
    res.redirect("/listing");
  });
});
app.get("/listing/payment",(req,res)=>{
 res.send("✅ Payment Successful!");
});
app.get("/listing",wrapasync(async(req,res)=>{
 let listings=await listing.find({})
 res.render("home1.ejs",{listings});
}));


app.get("/listing/new",middleware,(req,res)=>{
   res.render("new.ejs");
});
app.get("/request-book/:id", middleware, wrapasync(async (req, res) => {
  const { id } = req.params;
  const { checkIn, checkOut, guests } = req.query;

  const list = await listing.findById(id).populate("owner");

  res.render("request.ejs", {
    list,
    checkIn,
    checkOut,
    guests
  });
}));
app.post("/create-checkout-session", middleware, async (req, res) => {
  const { listingId, checkIn, checkOut, guests } = req.body;

  const list = await listing.findById(listingId);

  // 🔒 Check booking conflict BEFORE payment
  const conflict = await Booking.findOne({
    room: listingId,
    checkIn: { $lt: new Date(checkOut) },
    checkOut: { $gt: new Date(checkIn) },
  });

  if (conflict) {
    req.flash("error", "Room already booked ❌");
    return res.redirect(`/listing/${listingId}`);
  }

  // 🧮 Calculate total
  const nights = Math.ceil(
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
  );

  const total = nights * list.price * 100;

  const order = await razorpay.orders.create({
    amount: total,
    currency: "INR",
    receipt: "order_rcptid_11",
  });

  res.render("payment.ejs", {
    order,
    list,
    checkIn,
    checkOut,
    guests,
    total
  });
});
app.get("/payment-success", middleware, async (req, res) => {
  const { listingId, checkIn, checkOut, guests } = req.query;

  // 🔒 Double-check (VERY IMPORTANT)
  const conflict = await Booking.findOne({
    room: listingId,
    checkIn: { $lt: new Date(checkOut) },
    checkOut: { $gt: new Date(checkIn) },
  });

  if (conflict) {
    req.flash("error", "Room already booked ❌");
    return res.redirect(`/listing/${listingId}`);
  }

  await Booking.create({
    room: listingId,
    user: req.user._id,
    checkIn,
    checkOut,
    guests
  });

  req.flash("success", "Payment successful & booking confirmed 🎉");
  res.redirect(`/listing/${listingId}`);
});

//show route
app.get("/listing/:id", wrapasync(async (req, res) => {
  let { id } = req.params;

  let list = await listing.findById(id)
    .populate("owner")
    .populate({
      path: "reviews",
      populate: { path: "author" }
    });

  // ✅ get bookings
  let bookings = await Booking.find({ room: id });

  // ✅ convert to date ranges
  let bookedDates = bookings.map(b => ({
    from: b.checkIn,
    to: b.checkOut
  }));

  // ✅ SEND to EJS (THIS WAS MISSING ❗)
  res.render("show.ejs", { list, bookings, bookedDates });
}));
// app.get("/listing/:id",wrapasync(async(req,res)=>{
//     let {id}=req.params;
//  let list= await listing.findById(id).populate({path:"reviews",
//     populate:{
//     path:"author",
//  }}).populate("owner");//.populate() is used to replace ObjectIds with actual data from another collection.
//  console.log(list);
//  res.render("show.ejs",{list});
// }));

app.post("/listing",upload.single("image"),wrapasync(async(req,res)=>{//upload.single("image") this is used to upload files on uploads
 let {title,description,price,image,location,country,category}=req.body;
 
let url=req.file.path;
let filename=req.file.filename;
let newuser= new listing({
    title:title,
    description:description,
    image:{url,filename},
    price:price,
    location:location,
    category:category,
    country:country,
    owner: req.user._id,
    
});
await newuser.save();
req.flash("success","new listing added"); //this is "new listing added" temopary storage means in session then it is called to /listing ,so now express will run from top to bottom so it will find middleware where req.flash take msg from tempory storwge and save it to success varible and send it to ejs file using  locals
res.redirect("/listing");//Flash = message that stays for one request only

}));



// app.post("/listing/:id/book", middleware, wrapasync(async (req, res) => {
//   const { id } = req.params;
//   let { checkIn, checkOut, guests } = req.body;

//   checkIn = new Date(checkIn);
//   checkOut = new Date(checkOut);

//   const list = await listing.findById(id);

//   // ✅ Guest validation
//   if (guests > list.maxGuests) {
//     req.flash("error", "Exceeds maximum guest limit ❌");
//     return res.redirect(`/listing/${id}`);
//   }

//   // 🔒 Check double booking
//   const conflict = await Booking.findOne({
//     room: id,
//     checkIn: { $lt: checkOut },
//     checkOut: { $gt: checkIn },
//   });

//   if (conflict) {
//     req.flash("error", "Room already booked for selected dates ❌");
//     return res.redirect(`/listing/${id}`);
//   }

//   // ✅ Create booking
//   await Booking.create({
//     room: id,
//     user: req.user._id,
//     checkIn,
//     checkOut,
//     guests,
//   });

//   req.flash("success", "Room booked successfully ✅");
//   res.redirect(`/listing/${id}`);
// }));




app.get("/listing/:id/edit",middleware,wrapasync(async(req,res)=>{
let {id}=req.params;
let user= await listing.findById(id);
res.render("edit.ejs",{user});
}));

app.patch("/listing/:id",upload.single("image"),wrapasync(async(req,res)=>{
console.log(req.user);
let {id}=req.params;
let url=req.file.path;
let filename=req.file.filename;
let {title,description,price,image,location,country}=req.body;
 await listing.findByIdAndUpdate(id,{ title:title,
    description:description,
    price:price,
    image:{url,filename},
    location:location,
    country:country},{runValidators:true , returndocument:"after"});
    req.flash("success","list is edit");
    res.redirect("/listing");
}));

app.delete("/listing/:id",middleware,wrapasync(async(req,res)=>{
let {id}=req.params;
 await listing.findByIdAndDelete(id);
 req.flash("success","listing is deleted");
 res.redirect("/listing");
}));

app.post("/listing/:id/review",wrapasync(async(req,res)=>{
    let {id}=req.params;
    let {comment,rating}=req.body;
    let list=await listing.findById(id);
    let review=new reviews({
    comment:comment,
    rating:rating,
    author:req.user._id,
    });
    
    list.reviews.push(review._id);
    await list.save();
    await review.save();
    req.flash("success","new review added");
    res.redirect(`/listing/${list._id}`);
}));

app.delete("/listing/:id/review/:reviewid",author,wrapasync(async(req,res)=>{
let {id,reviewid}=req.params;
await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}})//this is to remove reference id from listing database
await reviews.findByIdAndDelete(reviewid);//and this is to remove actual review
req.flash("success","review is deleted");
res.redirect(`/listing/${id}`);
}));

app.post("/listing/search", wrapasync(async (req, res) => {

  let { location, minPrice, maxPrice, category } = req.body;

  let query = {};

  // Location filter (case insensitive)
  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  //  Price filter
  if (minPrice || maxPrice) {
    query.price = {};

    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }

  // Category filter
  if (category) {
    query.category = category;
  }

  let listings = await listing.find(query);

  res.render("search.ejs", { listings });

}));
app.post("/listing/category",wrapasync(async(req,res)=>{
      let { category } = req.body;

 let listings=await listing.find({category:category});
   
 res.render("category.ejs",{listings});
}));

app.get("/my-bookings", middleware, wrapasync(async (req, res) => {
  console.log(req.user._id);
  let bookings = await Booking.find({ user: req.user._id })
    .populate("room");

  res.render("bookings.ejs", { bookings });
}));
app.get("/trip", middleware, (req, res) => {
  res.render("trip-planner.ejs");
});

app.post("/trip/plan", middleware, wrapasync(async (req, res) => {
  const { destination, checkIn, checkOut, guests, budget } = req.body;

  const hotels = await listing.find({
    location: { $regex: destination, $options: "i" },
  }).limit(6);

  const aiPlan = await generateTripPlan({ destination, checkIn, checkOut, guests, budget, hotels });

  await TripPlan.create({
    user: req.user._id,
    destination,
    checkIn: new Date(checkIn),
    checkOut: new Date(checkOut),
    guests: Number(guests),
    budget: Number(budget),
    aiPlan,
    recommendedHotels: hotels.map((h) => h._id),
  });

  res.render("trip-result.ejs", { destination, checkIn, checkOut, guests, budget, aiPlan, hotels });
}));

app.post("/chatbot", async (req, res) => {
  try {
    const { message, history } = req.body;
    console.log("Message received:", message); // check terminal

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: message }
      ],
      max_tokens: 500,
    });

    const reply = completion.choices[0].message.content;
    console.log("Reply:", reply); // check terminal
    res.json({ reply });

  } catch (err) {
    console.log("CHATBOT ERROR:", err.message); // THIS will show exact problem
    res.status(500).json({ reply: "Error: " + err.message });
  }
});
app.use((req,res,next)=>{
next(new expresserror(404,"page not found"));
});

app.use((err,req,res,next)=>{
  let {status=500,message="something went wrong"}=err;
  res.render("error.ejs",{message});
//   res.status(status).send(message);
});

//Cast to ObjectId failed for value "{ Userid: '69d8add62cd975b063fe47cd' }" (type Object) at path "_id" for model "Booking"

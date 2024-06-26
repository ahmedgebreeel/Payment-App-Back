const stripe = require('stripe')(process.env.SECRET_KEY);
const User = require('../models/user.model');

//creating session
 const createSession = async(req:any, res:any)=>{
    try {
      // console.log(req.body);
      const {fullName, email, amount} = req.body
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Donation',
              },
              unit_amount: amount * 100 , // Amount in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/api/checkout/success?fullName=${fullName}&email=${email}&amount=${amount}`,
        cancel_url: 'http://localhost:3000/api/checkout/cancel',
      });
      // console.log(session.url);
      
      res.json({ checkoutUrl: session.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating Checkout session' });
    }
  }

  // success and cancel
const success = async(req:any, res:any) => {
  try {
    const {fullName, email, amount} = req.query
    let user = await User.findOne({ where: { email: email } });

    if (user) {
      // If user exists, update their amount
      user.amount += parseFloat(amount); 
      await user.save(); // Save the changes to the user
    } else {
      // If user doesn't exist, create a new user
      user = await User.create({
        fullName,
        email,
        amount
      });
    }

    res.redirect("http://localhost:4200/success")
  } catch (error) {
    console.log("error in success controller",error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const cancel = async(req:any, res:any)=>{
  try {
    res.redirect("http://localhost:4200/cancel");

  } catch (error) {
    console.log("error in cancel controller",error);
    res.status(500).json({ error: 'Internal Server Error' });
    
  }
}


module.exports = {createSession, success, cancel}
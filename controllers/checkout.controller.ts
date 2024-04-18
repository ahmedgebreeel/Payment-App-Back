const stripe = require('stripe')(process.env.SECRET_KEY);
async function createSession(req:any, res:any){
    try {
      console.log(req.body);
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
        success_url: 'https://your-website.com/success',
        cancel_url: 'https://your-website.com/cancel',
      });
      console.log(session.url);
      
      res.json({ checkoutUrl: session.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating Checkout session' });
    }
  }



module.exports = {createSession}
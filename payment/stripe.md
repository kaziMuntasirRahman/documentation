# STRIPE PAYMENT GATEWAY INTEGRATION
## Frontend
### 1. visit stripe website and read documentation very carefully [stripe.com/docs/stripe-js/react](https://docs.stripe.com/sdks/stripejs-react)  also visit their github repo.
### 2. install stripe using npm 
```bash
npm install --save @stripe/react-strip
```
### 3. create an instance loadStripe() outside component and add publishable key inside loadStripe parenthesis
```js
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
```
### 4. import and use `<Elements/>` component from stripe and set stripePromise as the value of stripe property.
```js
<Elements stripe={stripePromise}>
</Elements>
```
### 5. create and add checkout form inside `<Elements/>` components.
```js
<Elements stripe={stripePromise}>
     <CheckoutForm/>
</Elements>
```
---
## all about `<CheckoutForm/>`
### 6.
```js
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  // handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // stripe.js has not loaded yet. make sure to disable
      //form submission until stripe.js has loaded
      return;
    }

    const card = elements.getElement(CardElement)
    if (!card) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card', card
    })

    if(error){
      console.log(error)
    }else{
      console.log("Payment Method: ", paymentMethod);
    }

  }  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col ">
      <CardElement
        className="max-w-2xl border border-black p-5"
        options={{
          style: {

            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: 'black',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      >
      </CardElement>
      <button className="btn btn-primary btn-wide mt-5" type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

export default CheckoutForm;
```

### 7. STRIPE signup/login and get Publishable-key
* give name, email, country and password in sign up form. (choose sign in if you are an existing user)
* select US as country as bd is not available.
* verify the email address.
* after login, skip every options and select 'API keys for developer'.
* get the publishable key, which start with 'pk_',
* copy the key and save it inside .env file.
* get the variable inside loadStripe instance //const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)
* After providing a publishable key, we could see a form with 'card number' and 'MM/YY CVC'

### 8. after finishing programming, find test card for testing program implementation. find test card in [stripe.com/docs/testing](https://stripe.com/docs/testing)
**one of the demo card info**
- card number: 4242 4242 4242 4242
- valid future date: 12/34
- use any three digit for CVC (four digits for American Express card).
- use any value you like for other form fields.


## Backend 
### 9. install stripe in the server side
```bash
npm install --save stripe
```

### 10. require stripe secret key. you will get this in the same page where publishable key was. (do not use it directly, use it as environment variable)
```js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
```

### 11. create paymentIntent
```js
app.post('/create-payment-intent', async(req, res)=>{
const {price} = req.body
const amount = parseInt(price * 100)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'] 
    })

    res.send({
      clientSecret: paymentIntent.client_secret
    })
})
```

## Back to frontend
### 12. in `<CheckoutForm/>` 
- add useEffect in checkoutForm
```js
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()
  const [cart] = useCart()
  const [clientSecret, setClientSecret] = useState('')
  const [formError, setFormError] = useState('')
  const [transactionId, setTransactionId] = useState('')

  const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2)

  useEffect(() => {
    const paymentIntent = async () => {
      const response = await axiosSecure.post('create-payment-intent', { price: totalPrice })
      console.log(response.data.clientSecret)
      setClientSecret(response.data.clientSecret)
    }
    paymentIntent()
    console.log(totalPrice)
  }, [totalPrice])

  // handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // stripe.js has not loaded yet. make sure to disable
      //form submission until stripe.js has loaded
      return;
    }

    const card = elements.getElement(CardElement)
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card', card
    })

    if (error) {
      console.log(error)
      setFormError(error.message)
    } else {
      console.log("Payment Method: ", paymentMethod);
      setFormError('')
    }

    //confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || 'Anonymous',
          email: user?.email || 'Anonymous'
        }
      }
    })
    if (confirmError) {
      console.log("Confirm error: ", confirmError)
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Payment Operation Failed.",
        showConfirmButton: false,
        footer: "See you later.",
        timer: 2000
      });
    } else {
      console.log("paymentIntent: ", paymentIntent)
      setTransactionId(paymentIntent.id)
      if (paymentIntent.status === 'succeeded') {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Payment Successful.",
          showConfirmButton: false,
          footer: "See you later.",
          timer: 2000
        });
      }
    }

  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col ">
      <p>Pay: <strong>${totalPrice}</strong></p>
      <CardElement
        className="max-w-2xl border border-black p-5"
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: 'black',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      >
      </CardElement>
      <p className="text-sm text-red-600 my-2">{formError}</p>
      {
        transactionId ? 
        <p className="text-sm text-green-800 my-2">{transactionId}</p>
        :
        <></>
      }
      <button className="btn btn-primary btn-wide mt-5" type="submit" disabled={!stripe || !clientSecret || !user}>Pay</button>
    </form>
  );
};

export default CheckoutForm;
```
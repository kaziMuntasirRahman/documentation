### 1. visit search sslcommerz or visit sslcommerz.com

### 2. for development purpose, we will use developer (or sandbox payment system) option. go developer.sslcommerz.com

### 3. navigate sandbox account.

### 4. A modal will appear with 9 steps.

- application domain (any domain : ie. https://tech-hunt0.web.app/)
- company name (any. ie: Tech Hunt)
- company address (any ie: Purba Kodomtoli, Dhaka)
- Your Name (any ie: Kazi Muntasir Rahman)
- email
- phone number
- username
- password
- confirm password

after filling all the info, a confirmation modal will be appear. click `confirm registration`.

a `verification email` will be sent with a 8 digit verification code. verify your email address with the code. after successfully verify the verification code, a confirmation mail will be sent. _Voila_

### 5. Login in SSLcommerz

Login into demo store with `username` and `password`.

### 6. visit [sslcommerz docs](https://developer.sslcommerz.com/doc/v4/#overview) and follow the instructions

### initiate payment

when user click on make payment after pressing `pay` button,payment will be initiated

```js
$ https://sandbox.sslcommerz.com/gwprocess/v4/api.php
```

client side post post request hit

```js
const handleCreatePayment = async () => {
  const paymentInfo = {
    amount: 10000,
    currency: 'USD',
    payment_method_types: ['card'],
    description: 'My First API Call'
  }
  const response = await axios.post('/create-payment', paymentInfo)
  console.log(response.data)
}
```

backend api route

```js
// add this middleware
app.use(express.urlencoded()) 

// send post request
app.post('/create-payment', async (req, res) => {

  const paymentInfo = req.body
  
  const initiateData = {
    store_id: 'testbox',// change store id
    store_passwd: 'qwerty', //change store password
    total_amount: 100, // change store amount
    currency: 'EUR', // change store currency
    tran_id: 'REF123', // generate and store transaction id (Math.random())
    success_url: 'http://localhost:5000/success-payment', //backend url
    fail_url: 'http://yoursite.com/fail.php',
    cancel_url: 'http://yoursite.com/cancel.php',
    cus_name: 'Customer Name',
    cus_email: 'cust@yahoo.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    shipping_method: 'NO', // is added custom. skip all ship_ part if the this value is No.
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: '1000',
    ship_country: 'Bangladesh',
    multi_card_name: 'mastercard,visacard,amexcard',
    value_a: 'ref001_A',
    value_b: 'ref002_B',
    value_c: 'ref003_C',
    value_d: 'ref004_D'
  }

  const response = await axios({
    method: "POST",
    url: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    data: initiateData, //qs.stringify(initiateData) ------------suggested by chatgpt
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })

  console.log(response)

  res.send(result)
})
```

hit success url after successful payment

```js
app.post('/success-payment', async (req, res) => {
  const successData = req.body
  console.log(successData)
})
```

---

### Install `axios` in the server side
```bash
npm i axios
```























---
## demo post request and response

POST gwprocess/v4/api.php

Request Example

$ curl -X POST https://sandbox.sslcommerz.com/gwprocess/v4/api.php
-d
'store_id=testbox&
store_passwd=qwerty&
total_amount=100&
currency=EUR&
tran_id=REF123&
success_url=http://yoursite.com/success.php&
fail_url=http://yoursite.com/fail.php&
cancel_url=http://yoursite.com/cancel.php&
cus_name=Customer Name&
cus_email=cust@yahoo.com&
cus_add1=Dhaka&
cus_add2=Dhaka&
cus_city=Dhaka&
cus_state=Dhaka&
cus_postcode=1000&
cus_country=Bangladesh&
cus_phone=01711111111&
cus_fax=01711111111&
ship_name=Customer Name&
ship_add1 =Dhaka&
ship_add2=Dhaka&
ship_city=Dhaka&
ship_state=Dhaka&
ship_postcode=1000&
ship_country=Bangladesh&
multi_card_name=mastercard,visacard,amexcard&
value_a=ref001_A&
value_b=ref002_B&
value_c=ref003_C&
value_d=ref004_D'

Response Example
{
"status":"SUCCESS",
"failedreason":"",
"sessionkey":"F298BC45B0688E02768900C4F6B28C8B",
"gw":{
"visa":"dbbl_visa,brac_visa,city_visa,ebl_visa,visacard",
"master":"dbbl_master,brac_master,city_master,ebl_master,mastercard",
"amex":"city_amex,amexcard",
"othercards":"dbbl_nexus,qcash,fastcash",
"internetbanking":"city,bankasia,ibbl,mtbl",
"mobilebanking":"dbblmobilebanking,bkash,abbank,ibbl"
},
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtml.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=",
"directPaymentURLBank":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=visavard",
"directPaymentURLCard":"",
"directPaymentURL":"",
"redirectGatewayURLFailed":"",
"GatewayPageURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/gw.php?Q=PAY&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B",
"storeBanner":"https:\/\/securepay.sslcommerz.com\/testbox\/stores\/banners\/easyv1.png?v=5c5f37e4c6ee6",
"storeLogo":"https:\/\/securepay.sslcommerz.com\/testbox\/stores\/logos\/logo_SCZ100197.jpg?v=5c5f37e4c6f30",
"desc":[
{
"name":"AMEX",
"type":"amex",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/amex.png",
"gw":"amexcard",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=amexcard"
},
{
"name":"VISA",
"type":"visa",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/visa.png",
"gw":"visacard",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=visavard"
},
{
"name":"MASTER",
"type":"master",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/master.png",
"gw":"mastercard",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=mastercard"
},
{
"name":"AMEX-City Bank",
"type":"amex",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/amex.png",
"gw":"city_amex",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=city_amex"
},
{
"name":"NEXUS",
"type":"othercards",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/dbblnexus.png",
"gw":"dbbl_nexus",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=dbbl_nexus"
},
{
"name":"QCash",
"type":"othercards",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/qcash.png",
"gw":"qcash",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=qcash"
},
{
"name":"Fast Cash",
"type":"othercards",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/fastcash.png",
"gw":"fastcash"
},
{
"name":"BKash",
"type":"mobilebanking",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/bkash.png",
"gw":"bkash",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=bkash"
},
{
"name":"DBBL Mobile Banking",
"type":"mobilebanking",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/dbblmobilebank.png",
"gw":"dbblmobilebanking",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=dbblmobilebanking"
},
{
"name":"AB Direct",
"type":"mobilebanking",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/abbank.png",
"gw":"abbank",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=abbank"
},
{
"name":"IBBL",
"type":"internetbanking",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/ibbl.png",
"gw":"ibbl",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=ibbl"
},
{
"name":"Citytouch",
"type":"internetbanking",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/citytouch.png",
"gw":"city",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=city"
},
{
"name":"MTBL",
"type":"internetbanking",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/mtbl.png",
"gw":"mtbl",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=mtbl"
},
{
"name":"Bank Asia",
"type":"internetbanking",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/bankasia.png",
"gw":"bankasia",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=bankasia"
},
{
"name":"VISA-Eastern Bank Limited",
"type":"visa",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/visa.png",
"gw":"ebl_visa",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=ebl_visa"
},
{
"name":"MASTER-Eastern Bank Limited",
"type":"master",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/master.png",
"gw":"ebl_master",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=ebl_master"
},
{
"name":"VISA-City Bank",
"type":"visa",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/visa.png",
"gw":"city_visa",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=city_visa"
},
{
"name":"MASTER-City bank",
"type":"master",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/master.png",
"gw":"city_master",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=city_master"
},
{
"name":"VISA-Brac bank",
"type":"visa",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/visa.png",
"gw":"brac_visa",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=brac_visa"
},
{
"name":"MASTER-Brac bank",
"type":"master",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/master.png",
"gw":"brac_master",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=brac_master"
},
{
"name":"VISA-Dutch bank",
"type":"visa",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/visa.png",
"gw":"dbbl_visa",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=dbbl_visa"
},
{
"name":"MASTER-Dutch Bangla",
"type":"master",
"logo":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/image\/gw\/master.png",
"gw":"dbbl_master",
"r_flag":"1",
"redirectGatewayURL":"https:\/\/sandbox.sslcommerz.com\/gwprocess\/v4\/bankgw\/indexhtmlOTP.php?mamount=10228.84&ssl_id=19021022820J3Tctm708jSQiZU&Q=REDIRECT&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B&tran_type=success&cardname=dbbl_master"
}
],
"is_direct_pay_enable":"1"
}

---

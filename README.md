# Crypto-Pay


Crypto-Pay is an api for evm-chain crypto payment integration written in pure javascript.

## Features

- Accept payments across multiple EVM networks
- Accept any token you want
- Can be added to any website that uses javascript (Wix, Shopify, etc.)
- Integrates with Web3Modal
- Create affiliate codes for your own referral program


Inside the body of your HTML before the closing body tag, insert the following script:

```sh
 <script type="module">
     import { cryptoPayButton } from 'https://unpkg.com/@cryptocadet/crypto-pay-vanilla@1.13.0';
      cryptoPayButton({
        apiKey: 'YOUR_API_KEY',
        productId:  'YOUR_PRODUCT_ID',
        containerSelector:  'ELEMENT_ID',
        style: null,
        email: 'required',
        shippingAddress: 'required',
        label:  'Now in Red',
        lang: 'en',
        eth: 'false',
        sol: 'true'
        

      });
```

The pay portal defaults to 'eth' but you can set this to false. In order to add Solana, sol should be set to 'true'.

ELEMENT_ID is the name of any id appearing within your document that you want to append the button to. YOUR_API_KEY is the apiKey generated for your account at [Ascendant.Finance](https://app.ascendant.finance). YOUR_PROD_ID is the id you create for the particular product linked to this button. The 'email' and 'shippingAddress' variables can be required in order to request the user's email and shipping address upon payment. Styles can be input via the style variable to change the button style. The lang property corresponds to the ISO 639-1 Code for the following supported languages:

- ar (Arabic)
- de (German)
- en (English)
- es (Spanish)
- fr (French)
- pt (Portuguese)
- zh (Chinese)


## Styles

In the head of the html, add a link tag with a reference to the stylesheet:

```sh
<link href="https://unpkg.com/@cryptocadet/crypto-pay-vanilla@1.13.0/dist/style.css" rel="stylesheet">
```


## License 

MIT

## Contributions

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer




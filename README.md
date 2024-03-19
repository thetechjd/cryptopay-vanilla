# Crypto-Pay


Crypto-Pay is an api for evm-chain crypto payment integration written in pure javascript.

## Features

- Accept payments across multiple EVM networks
- Accept any token you want
- Can be added to any website that uses javascript (Wix, Shopify, etc.)
- Integrates with Web3Modal
- Create affiliate codes for your own referral program


Inside the body of your HTML before the </body> tag, insert the following script:

```sh
 <script type="module">
      import { cryptoPayButton } from './src/main.js';
      cryptoPayButton('buttonSpot','YOUR_API_KEY', 'YOUR_PROD_ID');
    </script>
```

In your page or index file, dynamically import the created component:


## Styles

React Crypto Pay Modal style can be customized by targeting the cryptopaymodal and cryptopaybutton classes and the style tag in JSX. Web3Modal styles can be imported by adding the following in the component file:

```sh
import 'react-crypto-pay/dist/style.css'
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




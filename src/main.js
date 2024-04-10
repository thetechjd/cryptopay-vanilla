export function cryptoPayButton({apiKey, productId, label, style, containerSelector, email, shippingAddress, lang}) {
  document.addEventListener('DOMContentLoaded', function(event) {
    const container = document.getElementById(containerSelector);

    const translation = {
      "en": "Open",
      "fr": "Ouvrir",
      "ar": "افتح",
      "es": "Abrir",
      "pt": "Abrir",
      "de": "Öffnen",
      "zh": "打开"
    }
    
    // Inject the modal HTML
    const modalHTML = `
    <div id="modalContainer" style="display: none;">
      <div id="modalContent">
        <span><img id="logo" src="https://unpkg.com/@cryptocadet/crypto-pay-vanilla@1.14.0/dist/assets/cryptocadetlogo_white.png"/>cryptocadet&trade;</span>
        <a href="#" id="metamaskLink"><button><img src="https://unpkg.com/@cryptocadet/crypto-pay-vanilla@1.14.0/dist/assets/MetaMask_Fox.png"/> ${translation[lang]} Metamask</button></a>
        <a href="#" id="coinbaseLink"><button><img src="https://unpkg.com/@cryptocadet/crypto-pay-vanilla@1.14.0/dist/assets/coinbase_icon.png"/> ${translation[lang]} Coinbase Wallet</button></a>
      </div>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    
    const modalContainer = document.getElementById("modalContainer");
    const metamaskLink = document.getElementById("metamaskLink");
    const coinbaseLink = document.getElementById("coinbaseLink");

    function showModal() {
      modalContainer.style.display = "block";
      modalContainer.style.width = "90%";
    }

    function hideModal() {
      modalContainer.style.display = "none";
    }
    
    
    // Function to handle click outside the modal to close it
    function handleClickOutside(event) {
      if (modalContainer && !modalContainer.contains(event.target)) {
        hideModal();
      }
    }
  

    // Add click event listener to the document for closing modal on click outside
    document.addEventListener('mousedown', handleClickOutside);

    if (!document.getElementById("showModalButton")) {
      const button = document.createElement('button');
      button.id = 'showModalButton';
      button.textContent = label; // Set button text
      button.style = style;

      (container ? container : document.body).appendChild(button);

      button.addEventListener('click', function() {
        // Detect if it's a mobile device
        function isMobileDevice() {
          const userAgent = navigator.userAgent || navigator.vendor || window.opera;
          return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
        }

        let refCode = "";
        if (typeof window !== "undefined") {
          const q = new URLSearchParams(window.location.search);
          if (q.get("referrer")) {
            refCode = q.get("referrer");
          }
        }
        
        if (isMobileDevice()) {
          const metamaskURL = `https://metamask.app.link/dapp/portal.cryptocadet.app?pubKey=${apiKey}&prod=${productId}&referrer=${refCode}&email=${email}&shippingAddress=${shippingAddress}&lang=${lang}`;
          const coinbaseURL = `https://go.cb-w.com/dapp?cb_url=https%3A%2F%2Fportal.cryptocadet.app%3FpubKey%3D${apiKey}%26prod%3D${productId}%26referrer%3D${refCode}%26email%3D${email}%26shippingAddress%3D${shippingAddress}%26lang%3D${lang}`;

          metamaskLink.setAttribute("href", metamaskURL);
          coinbaseLink.setAttribute("href", coinbaseURL);
          
          showModal(); // Instead of directly manipulating style, we call showModal
        } else {
          // For non-mobile devices
          let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=400,height=500,left=${window.screen.width},top=0`;
          const newWindow = window.open("", "_blank", params);

          const apiUrl = `https://api.cryptocadet.app/api/user/get-user`;
          const data = { apiKey };

          fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
          .then(response => response.json())
          .then(data => {
            if (data) {
              const newUrl = `https://portal.cryptocadet.app?pubKey=${apiKey}&prod=${productId}&referrer=${refCode}&email=${email}&shippingAddress=${shippingAddress}&lang=${lang}`;
              newWindow.location = newUrl;
            } else {
              newWindow.close();
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            newWindow.close();
          });
        }
      });
    }
  });
}

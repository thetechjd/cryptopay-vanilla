function generateUniqueId(prefix) {
  // Generates a unique ID using a prefix and a random string
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

  



export function cryptoPayButton({apiKey, productId, label, style, containerSelector, email, shippingAddress, lang, eth = true, sol}) {
  document.addEventListener('DOMContentLoaded', function(event) {
    const container = document.getElementById(containerSelector);

//const buttonStyle = "padding: 10px 20px; background-color: #0c0a09; color: #fff; border: none; border-radius: 5px; cursor: pointer;"

   
    // Translation dictionary for various languages
    const translation = {
      "en": "Open",
      "fr": "Ouvrir",
      "ar": "افتح",
      "es": "Abrir",
      "pt": "Abrir",
      "de": "Öffnen",
      "zh": "打开"
    };

    // Generate unique IDs for each component
    const modalContainerId = generateUniqueId("modalContainer");
    const metamaskLinkId = generateUniqueId("metamaskLink");
    const coinbaseLinkId = generateUniqueId("coinbaseLink");
    const phantomLinkId = generateUniqueId("phantomLink");

    
 
      
    
    
    

    
    // Inject the modal HTML with unique IDs
    const modalHTML = `
    <div class="modalContainer" id="${modalContainerId}" style="display: none;">
      <div class="modalContent" id="modalContent">
        <span><img id="logo" src="https://unpkg.com/@cryptocadet/crypto-pay-vanilla/dist/assets/cryptocadetlogo_white.png"/>cryptocadet&trade;</span>
        <a href="#" id="${metamaskLinkId}" style="text-decoration: none" ><button><img style="height: 24px" src="https://unpkg.com/@cryptocadet/crypto-pay-vanilla/dist/assets/MetaMask_Fox.png"/> ${translation[lang]} Metamask</button></a>
        <a href="#" id="${coinbaseLinkId}" style="text-decoration: none" ><button><img style="height: 24px" src="https://unpkg.com/@cryptocadet/crypto-pay-vanilla/dist/assets/coinbase_icon.png"/> ${translation[lang]} Coinbase</button></a>
        <a href="#" id="${phantomLinkId}" style="text-decoration: none" ><button><img style="height: 24px" src="https://unpkg.com/@cryptocadet/crypto-pay-vanilla/dist/assets/phantom-logo.png"/> ${translation[lang]} Phantom</button></a>
      </div>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modalContainer = document.getElementById(modalContainerId);
    const metamaskLink = document.getElementById(metamaskLinkId);
    const coinbaseLink = document.getElementById(coinbaseLinkId);
    const phantomLink = document.getElementById(phantomLinkId)

    // Functions to show and hide the modal
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

   

    const buttonId = generateUniqueId("showModalButton");
    if (!document.getElementById(buttonId)) {
      const button = document.createElement('button');
      button.className = 'showModalButton'
      button.id = buttonId;
      button.textContent = label; // Set button text
      button.style = style;

      
      if(container){
        container.appendChild(button);
      } else {
        return null;
      }

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

        const queryParams = new URLSearchParams({
          pubKey: apiKey,
          prod: productId,
          referrer: refCode,
          email: email,
          shippingAddress: shippingAddress,
          lang: lang,
          eth: eth,
          sol: sol
        })
    
        
        const encodedUrl = encodeURIComponent(`https://portal.cryptocadet.app?${queryParams.toString()}`);
      
       
       
        
        if (isMobileDevice()) {
          const metamaskURL = `https://metamask.app.link/dapp/portal.cryptocadet.app?pubKey=${apiKey}&prod=${productId}&referrer=${refCode}&email=${email}&shippingAddress=${shippingAddress}&lang=${lang}`;
          const coinbaseURL = `https://go.cb-w.com/dapp?cb_url=https%3A%2F%2Fportal.cryptocadet.app%3FpubKey%3D${apiKey}%26prod%3D${productId}%26referrer%3D${refCode}%26email%3D${email}%26shippingAddress%3D${shippingAddress}%26lang%3D${lang}`;
          const phantomURL = `https://phantom.app/ul/browse/${encodedUrl}`

          metamaskLink.setAttribute("href", metamaskURL);
          coinbaseLink.setAttribute("href", coinbaseURL);
          phantomLink.setAttribute("href", phantomURL)
          
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

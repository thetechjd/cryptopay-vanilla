// Function to generate a unique ID
function generateUniqueId(prefix) {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

// Function to detect if a mobile device is being used
function isMobileDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
}

// Function to add item to localStorage array
function addItemToLocalStorageArray(key, item) {
  let existingItems = localStorage.getItem(key);
  let itemsArray = existingItems ? JSON.parse(existingItems) : [];
  itemsArray.push(item);
  localStorage.setItem(key, JSON.stringify(itemsArray));
}

export function cryptoPayButton({
  apiKey, productId, label, style, cartStyle, containerSelector, email, shippingAddress, lang = 'en', eth = true, sol, redirect, onSuccess, shoppingCart, noQuantity, displayName, priceOnly
}) {
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
    };

    const modalContainerId = generateUniqueId("modalContainer");
    const metamaskLinkId = generateUniqueId("metamaskLink");
    const coinbaseLinkId = generateUniqueId("coinbaseLink");
    const phantomLinkId = generateUniqueId("phantomLink");

    // Inject the modal HTML with unique IDs
    const modalHTML = `
      <div class="modalContainer" id="${modalContainerId}" style="display: none;">
        <div class="modalContent">
          <span>
            <img id="logo" src="https://unpkg.com/@cryptocadet/crypto-pay-vanilla/dist/assets/cryptocadetlogo_white.png"/>cryptocadet&trade;
          </span>
          <a href="#" id="${metamaskLinkId}" style="text-decoration: none">
            <button>
              <img style="height: 24px" src="https://unpkg.com/@cryptocadet/crypto-pay-vanilla/dist/assets/MetaMask_Fox.png"/> ${translation[lang]} Metamask
            </button>
          </a>
          <a href="#" id="${coinbaseLinkId}" style="text-decoration: none">
            <button>
              <img style="height: 24px" src="https://unpkg.com/@cryptocadet/crypto-pay-vanilla/dist/assets/coinbase_icon.png"/> ${translation[lang]} Coinbase
            </button>
          </a>
          <a href="#" id="${phantomLinkId}" style="text-decoration: none">
            <button>
              <img style="height: 24px" src="https://unpkg.com/@cryptocadet/crypto-pay-vanilla/dist/assets/phantom-logo.png"/> ${translation[lang]} Phantom
            </button>
          </a>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modalContainer = document.getElementById(modalContainerId);
    const metamaskLink = document.getElementById(metamaskLinkId);
    const coinbaseLink = document.getElementById(coinbaseLinkId);
    const phantomLink = document.getElementById(phantomLinkId);

    // Functions to show and hide the modal
    function showModal() {
      modalContainer.style.display = "block";
      modalContainer.style.width = "90%";
    }

    function hideModal() {
      modalContainer.style.display = "none";
    }

    // Handle click outside the modal to close it
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
      button.className = 'showModalButton';
      button.id = buttonId;
      button.textContent = label;
      button.style = style;

      if (container) {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.style.display = 'flex';
        buttonWrapper.style.flexDirection = 'column';

        const buttonSpan = document.createElement('span');
        buttonSpan.appendChild(button);

        if (shoppingCart) {
          const cartId = generateUniqueId("cartButton");
          const cartButton = document.createElement('button');
          cartButton.innerHTML = '&#128722;';
          cartButton.className = 'cartButton';
          cartButton.id = cartId;
          cartButton.style = cartStyle;
          cartButton.addEventListener('click', () => {
            addItemToLocalStorageArray(`${apiKey}-cart`, { displayName: displayName, productId: productId });
          });
          buttonSpan.appendChild(cartButton);
        }

        buttonWrapper.appendChild(buttonSpan);
        container.appendChild(buttonWrapper);
      } else {
        return null;
      }

      button.addEventListener('click', async function() {
        let refCode = "";
        if (typeof window !== "undefined") {
          const q = new URLSearchParams(window.location.search);
          if (q.get("referrer")) {
            refCode = q.get("referrer");
          }
        }

        if (!localStorage.getItem(`${apiKey}-cart`)) {
          addItemToLocalStorageArray(`${apiKey}-cart`, { displayName: displayName, productId: productId });
        }

        if (isMobileDevice()) {
          const metamaskURL = `https://metamask.app.link/dapp/portal.cryptocadet.app?pubKey=${apiKey}&prod=${localStorage.getItem(`${apiKey}-cart`) ? localStorage.getItem(`${apiKey}-cart`) : productId}&referrer=${refCode}&email=${email}&shippingAddress=${shippingAddress}&lang=${lang}&shoppingCart=${localStorage.getItem(`${apiKey}-cart`) ? true : false}&noQuantity=${noQuantity}&priceOnly=${priceOnly}&walletApp=true`;
          const coinbaseURL = `https://go.cb-w.com/dapp?cb_url=https%3A%2F%2Fportal.cryptocadet.app%3FpubKey%3D${apiKey}%26prod%3D${localStorage.getItem(`${apiKey}-cart`) ? localStorage.getItem(`${apiKey}-cart`) : productId}%26referrer%3D${refCode}%26email%3D${email}%26shippingAddress%3D${shippingAddress}%26lang%3D${lang}%26shoppingCart%3D${localStorage.getItem(`${apiKey}-cart`) ? true : false}%26noQuantity%3D${noQuantity}%26priceOnly%3D${priceOnly}%26walletApp%3Dtrue`;
          const queryParams = new URLSearchParams({
            pubKey: apiKey,
            prod: productId,
            referrer: refCode,
            email: email,
            shippingAddress: shippingAddress,
            lang: lang,
            eth: eth,
            sol: sol,
            walletApp: true,
            shoppingCart: localStorage.getItem(`${apiKey}-cart`) ? true : false,
            noQuantity: noQuantity,
            priceOnly: priceOnly,
            ref: "https://cryptocadet.io" 
          });
          const encodedUrl = encodeURIComponent(`https://portal.cryptocadet.app?${queryParams.toString()}`);
          const phantomURL = `https://phantom.app/ul/browse/${encodedUrl}`;

          metamaskLink.setAttribute("href", metamaskURL);
          coinbaseLink.setAttribute("href", coinbaseURL);
          phantomLink.setAttribute("href", phantomURL);

          localStorage.removeItem(`${apiKey}-cart`);

          showModal();
        } else {
          let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
            width=400,height=500,left=${window.screen.width},top=0`;
          const newWindow = window.open("", "_blank", params);

          const apiUrl = `https://api.cryptocadet.app/api/user/checkout`;
          const data = { apiKey };

          try {
            const response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });

            if (response.ok) {
              const newUrl = `https://portal.cryptocadet.app?pubKey=${apiKey}&prod=${localStorage.getItem(`${apiKey}-cart`) ? localStorage.getItem(`${apiKey}-cart`) : JSON.stringify({ productId: productId })}&referrer=${refCode}&email=${email}&shippingAddress=${shippingAddress}&lang=${lang}&eth=${eth}&sol=${sol}&redirect=${redirect}&shoppingCart=${localStorage.getItem(`${apiKey}-cart`) ? true : false}&noQuantity=${noQuantity}&priceOnly=${priceOnly}`;
              console.log('Navigating to:', newUrl);
              localStorage.removeItem(`${apiKey}-cart`);
              newWindow.location = newUrl;

              window.addEventListener('message', (event) => {
                if (event.data === "Receipt added successfully") {
                  if (onSuccess) {
                    try {
                      onSuccess();
                    } catch (err) {
                      console.log('Could not complete success function');
                    }
                  }
                }
              });
            } else {
              newWindow.close();
            }
          } catch (error) {
            console.error("Error:", error);
            newWindow.close();
          }
        }
      });
    }
  });
}

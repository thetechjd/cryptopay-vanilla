function generateUniqueId(prefix) {
  // Generates a unique ID using a prefix and a random string
  return "".concat(prefix, "-").concat(Math.random().toString(36).substr(2, 9));
}
function cryptoPayButton(_ref) {
  var apiKey = _ref.apiKey,
    productId = _ref.productId,
    label = _ref.label,
    style = _ref.style,
    containerSelector = _ref.containerSelector,
    email = _ref.email,
    shippingAddress = _ref.shippingAddress,
    lang = _ref.lang;
  document.addEventListener('DOMContentLoaded', function (event) {
    var container = document.getElementById(containerSelector);

    //const buttonStyle = "padding: 10px 20px; background-color: #0c0a09; color: #fff; border: none; border-radius: 5px; cursor: pointer;"

    // Translation dictionary for various languages
    var translation = {
      "en": "Open",
      "fr": "Ouvrir",
      "ar": "افتح",
      "es": "Abrir",
      "pt": "Abrir",
      "de": "Öffnen",
      "zh": "打开"
    };

    // Generate unique IDs for each component
    var modalContainerId = generateUniqueId("modalContainer");
    var metamaskLinkId = generateUniqueId("metamaskLink");
    var coinbaseLinkId = generateUniqueId("coinbaseLink");

    // Inject the modal HTML with unique IDs
    var modalHTML = "\n    <div class=\"modalContainer\" id=\"".concat(modalContainerId, "\" style=\"display: none;\">\n      <div class=\"modalContent\" id=\"modalContent\">\n        <span><img id=\"logo\" src=\"https://unpkg.com/@cryptocadet/crypto-pay-vanilla@1.16.0/dist/assets/cryptocadetlogo_white.png\"/>cryptocadet&trade;</span>\n        <a href=\"#\" id=\"").concat(metamaskLinkId, "\" style=\"text-decoration: none\" ><button><img style=\"height: 24px\" src=\"https://unpkg.com/@cryptocadet/crypto-pay-vanilla@1.16.0/dist/assets/MetaMask_Fox.png\"/> ").concat(translation[lang], " Metamask</button></a>\n        <a href=\"#\" id=\"").concat(coinbaseLinkId, "\" style=\"text-decoration: none\" ><button><img style=\"height: 24px\" src=\"https://unpkg.com/@cryptocadet/crypto-pay-vanilla@1.16.0/dist/assets/coinbase_icon.png\"/> ").concat(translation[lang], " Coinbase Wallet</button></a>\n      </div>\n    </div>");
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    var modalContainer = document.getElementById(modalContainerId);
    var metamaskLink = document.getElementById(metamaskLinkId);
    var coinbaseLink = document.getElementById(coinbaseLinkId);

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
    var buttonId = generateUniqueId("showModalButton");
    if (!document.getElementById(buttonId)) {
      var button = document.createElement('button');
      button.className = 'showModalButton';
      button.id = buttonId;
      button.textContent = label; // Set button text
      button.style = style;
      if (container) {
        container.appendChild(button);
      } else {
        return null;
      }
      button.addEventListener('click', function () {
        // Detect if it's a mobile device
        function isMobileDevice() {
          var userAgent = navigator.userAgent || navigator.vendor || window.opera;
          return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
        }
        var refCode = "";
        if (typeof window !== "undefined") {
          var q = new URLSearchParams(window.location.search);
          if (q.get("referrer")) {
            refCode = q.get("referrer");
          }
        }
        if (isMobileDevice()) {
          var metamaskURL = "https://metamask.app.link/dapp/portal.cryptocadet.app?pubKey=".concat(apiKey, "&prod=").concat(productId, "&referrer=").concat(refCode, "&email=").concat(email, "&shippingAddress=").concat(shippingAddress, "&lang=").concat(lang);
          var coinbaseURL = "https://go.cb-w.com/dapp?cb_url=https%3A%2F%2Fportal.cryptocadet.app%3FpubKey%3D".concat(apiKey, "%26prod%3D").concat(productId, "%26referrer%3D").concat(refCode, "%26email%3D").concat(email, "%26shippingAddress%3D").concat(shippingAddress, "%26lang%3D").concat(lang);
          metamaskLink.setAttribute("href", metamaskURL);
          coinbaseLink.setAttribute("href", coinbaseURL);
          showModal(); // Instead of directly manipulating style, we call showModal
        } else {
          // For non-mobile devices
          var params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,\nwidth=400,height=500,left=".concat(window.screen.width, ",top=0");
          var newWindow = window.open("", "_blank", params);
          var apiUrl = "https://api.cryptocadet.app/api/user/get-user";
          var data = {
            apiKey: apiKey
          };
          fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data) {
              var newUrl = "https://portal.cryptocadet.app?pubKey=".concat(apiKey, "&prod=").concat(productId, "&referrer=").concat(refCode, "&email=").concat(email, "&shippingAddress=").concat(shippingAddress, "&lang=").concat(lang);
              newWindow.location = newUrl;
            } else {
              newWindow.close();
            }
          })["catch"](function (error) {
            console.error("Error:", error);
            newWindow.close();
          });
        }
      });
    }
  });
}

export { cryptoPayButton };

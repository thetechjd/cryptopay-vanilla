function cryptoPayButton(containerSelector, apiKey, productId) {
  document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById(containerSelector);

    // Inject the modal HTML
    var modalHTML = "\n     <div id=\"modalContainer\">\n       <div id=\"modalContent\">\n         <span><img id=\"logo\" src=\"https://unpkg.com/@cryptocadet/crypto-pay-vanilla@1.10.0/dist/assets/cryptocadetlogo_white.png\"/>cryptocadet&trade;</span>\n         <a href=\"#\" id=\"metamaskLink\"><button><img src=\"https://unpkg.com/@cryptocadet/crypto-pay-vanilla@1.10.0/dist/assets/MetaMask_Fox.png\"/> Open Metamask</button></a>\n         <a href=\"#\" id=\"coinbaseLink\"><button><img src=\"https://unpkg.com/@cryptocadet/crypto-pay-vanilla@1.10.0/dist/assets/coinbase_icon.png\"/>Open Coinbase Wallet</button></a>\n       </div>\n     </div>";
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Check if button already exists
    if (!document.getElementById("showModalButton")) {
      // Create the button
      var button = document.createElement('button');
      button.id = 'showModalButton';
      button.textContent = 'Pay With Crypto'; // Set button text

      // Append the button to the container
      (container ? container : document.body).appendChild(button);

      // Listen for button clicks (if necessary)
      button.addEventListener('click', function () {
        var showModalButton = document.getElementById("showModalButton");
        var modalContainer = document.getElementById("modalContainer");
        var metamaskLink = document.getElementById("metamaskLink");
        var coinbaseLink = document.getElementById("coinbaseLink");
        function isMobileDevice() {
          var userAgent = navigator.userAgent || navigator.vendor || window.opera;
          return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
        }
        showModalButton.addEventListener("click", function () {
          var refCode = "";
          if (typeof window !== "undefined") {
            var q = new URLSearchParams(window.location.search);
            if (q.get("referrer")) {
              refCode = q.get("referrer");
            }
          }
          if (isMobileDevice()) {
            // Construct the URLs
            var metamaskURL = "https://metamask.app.link/dapp/portal.cryptocadet.app?pubKey=".concat(apiKey, "&prod=").concat(productId, "&referrer=").concat(refCode);
            var coinbaseURL = "https://go.cb-w.com/dapp?cb_url=https%3A%2F%2Fportal.cryptocadet.app%3FpubKey%3D".concat(apiKey, "%26prod%3D").concat(productId, "%26referrer%3D").concat(refCode);

            // Set the href attributes
            metamaskLink.setAttribute("href", metamaskURL);
            coinbaseLink.setAttribute("href", coinbaseURL);

            // Show the modal
            modalContainer.style.display = "block";
            modalContainer.style.width = "90%";
          } else {
            var params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,\n  width=400,height=500,left=".concat(window.screen.width, ",top=0");
            var newWindow = window.open("", "_blank", params);

            // Define your API URL and the data you want to send
            var apiUrl = "https://api.cryptocadet.app/api/user/get-user";
            var data = {
              apiKey: apiKey
            };
            fetch(apiUrl, {
              method: "POST",
              // Specify the method
              headers: {
                "Content-Type": "application/json"
                // Additional headers if required
              },
              body: JSON.stringify(data) // Convert data to JSON string
            }).then(function (response) {
              return response.json();
            }) // Parse the JSON response
            .then(function (data) {
              console.log("Success:", data);

              // Check if the response meets your criteria for opening a new window
              if (data) {
                var newUrl = "https://portal.cryptocadet.app?pubKey=".concat(apiKey, "&prod=").concat(productId, "&referrer=").concat(refCode);
                console.log("Navigating to:", newUrl);
                newWindow.location = newUrl;
              } else {
                console.log("Closing window due to unsuccessful response");
                newWindow.close();
              }
            })["catch"](function (error) {
              console.error("Error:", error);
              console.log("Closing window due to error");
              newWindow.close();
            });
          }
        });
      });
    }
  });
}

export { cryptoPayButton };

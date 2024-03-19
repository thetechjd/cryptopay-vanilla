export function cryptoPayButton(containerSelector, apiKey, productId) {
  document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById(containerSelector);
   
     // Inject the modal HTML
     const modalHTML = `
     <div id="modalContainer">
       <div id="modalContent">
         <span><img id="logo" src="./dist/assets/cryptocadetlogo_white.png"/>cryptocadet&trade;</span>
         <a href="#" id="metamaskLink"><button><img src="./dist/assets/MetaMask_Fox.png"/> Open Metamask</button></a>
         <a href="#" id="coinbaseLink"><button><img src="./dist/assets/coinbase_icon.png"/>Open Coinbase Wallet</button></a>
       </div>
     </div>`;
     document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Check if button already exists
    if (!document.getElementById("showModalButton")) {
      // Create the button
      const button = document.createElement('button');
      button.id = 'showModalButton';
      button.textContent = 'Pay With Crypto'; // Set button text

      // Append the button to the container
      (container ? container : document.body).appendChild(button);

      // Listen for button clicks (if necessary)
      button.addEventListener('click', function() {
        const showModalButton = document.getElementById("showModalButton");
        const modalContainer = document.getElementById("modalContainer");
        const metamaskLink = document.getElementById("metamaskLink");
        const coinbaseLink = document.getElementById("coinbaseLink");
  
       
        
        function isMobileDevice() {
          const userAgent =
            navigator.userAgent || navigator.vendor || window.opera;
          return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
            userAgent.toLowerCase()
          );
        }
  
        showModalButton.addEventListener("click", function () {
          let refCode = "";
  
          if (typeof window !== "undefined") {
            const q = new URLSearchParams(window.location.search);
            if (q.get("referrer")) {
              refCode = q.get("referrer");
            }
          }
          if (isMobileDevice()) {
            // Construct the URLs
            const metamaskURL = `https://metamask.app.link/dapp/portal.cryptocadet.app?pubKey=${apiKey}&prod=${productId}&referrer=${refCode}`;
            const coinbaseURL = `https://go.cb-w.com/dapp?cb_url=https%3A%2F%2Fportal.cryptocadet.app%3FpubKey%3D${apiKey}%26prod%3D${productId}%26referrer%3D${refCode}`;
  
            // Set the href attributes
            metamaskLink.setAttribute("href", metamaskURL);
            coinbaseLink.setAttribute("href", coinbaseURL);
  
            // Show the modal
            modalContainer.style.display = "block";
            modalContainer.style.width = "90%";
          } else {
           
            let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
  width=400,height=500,left=${window.screen.width},top=0`;
            const newWindow = window.open("", "_blank", params);
  
            // Define your API URL and the data you want to send
            const apiUrl = `https://api.cryptocadet.app/api/user/get-user`;
            const data = {
              apiKey,
            };
  
            fetch(apiUrl, {
              method: "POST", // Specify the method
              headers: {
                "Content-Type": "application/json",
                // Additional headers if required
              },
              body: JSON.stringify(data), // Convert data to JSON string
            })
              .then((response) => response.json()) // Parse the JSON response
              .then((data) => {
                console.log("Success:", data);
  
                // Check if the response meets your criteria for opening a new window
                if (data) {
                  const newUrl = `https://portal.cryptocadet.app?pubKey=${apiKey}&prod=${productId}&referrer=${refCode}`;
                  console.log("Navigating to:", newUrl);
                  newWindow.location = newUrl;
                } else {
                  console.log("Closing window due to unsuccessful response");
                  newWindow.close();
                }
              })
  
              .catch((error) => {
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






function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

// Function to generate a unique ID
function generateUniqueId(prefix) {
  return "".concat(prefix, "-").concat(Math.random().toString(36).substr(2, 9));
}

// Function to detect if a mobile device is being used
function isMobileDevice() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
}

// Function to add item to localStorage array
function addItemToLocalStorageArray(key, item) {
  var existingItems = localStorage.getItem(key);
  var itemsArray = existingItems ? JSON.parse(existingItems) : [];
  itemsArray.push(item);
  localStorage.setItem(key, JSON.stringify(itemsArray));
}
function cryptoPayButton(_ref) {
  var apiKey = _ref.apiKey,
    productId = _ref.productId,
    label = _ref.label,
    style = _ref.style,
    cartStyle = _ref.cartStyle,
    containerSelector = _ref.containerSelector,
    email = _ref.email,
    shippingAddress = _ref.shippingAddress,
    _ref$lang = _ref.lang,
    lang = _ref$lang === void 0 ? 'en' : _ref$lang,
    _ref$eth = _ref.eth,
    eth = _ref$eth === void 0 ? true : _ref$eth,
    sol = _ref.sol,
    redirect = _ref.redirect,
    onSuccess = _ref.onSuccess,
    shoppingCart = _ref.shoppingCart,
    noQuantity = _ref.noQuantity,
    displayName = _ref.displayName,
    priceOnly = _ref.priceOnly;
  document.addEventListener('DOMContentLoaded', function (event) {
    var container = document.getElementById(containerSelector);
    var translation = {
      "en": "Open",
      "fr": "Ouvrir",
      "ar": "افتح",
      "es": "Abrir",
      "pt": "Abrir",
      "de": "Öffnen",
      "zh": "打开"
    };
    var modalContainerId = generateUniqueId("modalContainer");
    var metamaskLinkId = generateUniqueId("metamaskLink");
    var coinbaseLinkId = generateUniqueId("coinbaseLink");
    var phantomLinkId = generateUniqueId("phantomLink");

    // Inject the modal HTML with unique IDs
    var modalHTML = "\n      <div class=\"modalContainer\" id=\"".concat(modalContainerId, "\" style=\"display: none;\">\n        <div class=\"modalContent\">\n          <span>\n            <img id=\"logo\" src=\"https://unpkg.com/@cryptocadet/crypto-pay-vanilla/dist/assets/cryptocadetlogo_white.png\"/>cryptocadet&trade;\n          </span>\n          <a href=\"#\" id=\"").concat(metamaskLinkId, "\" style=\"text-decoration: none\">\n            <button>\n              <img style=\"height: 24px\" src=\"https://unpkg.com/@cryptocadet/crypto-pay-vanilla/dist/assets/MetaMask_Fox.png\"/> ").concat(translation[lang], " Metamask\n            </button>\n          </a>\n          <a href=\"#\" id=\"").concat(coinbaseLinkId, "\" style=\"text-decoration: none\">\n            <button>\n              <img style=\"height: 24px\" src=\"https://unpkg.com/@cryptocadet/crypto-pay-vanilla/dist/assets/coinbase_icon.png\"/> ").concat(translation[lang], " Coinbase\n            </button>\n          </a>\n          <a href=\"#\" id=\"").concat(phantomLinkId, "\" style=\"text-decoration: none\">\n            <button>\n              <img style=\"height: 24px\" src=\"https://unpkg.com/@cryptocadet/crypto-pay-vanilla/dist/assets/phantom-logo.png\"/> ").concat(translation[lang], " Phantom\n            </button>\n          </a>\n        </div>\n      </div>");
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    var modalContainer = document.getElementById(modalContainerId);
    var metamaskLink = document.getElementById(metamaskLinkId);
    var coinbaseLink = document.getElementById(coinbaseLinkId);
    var phantomLink = document.getElementById(phantomLinkId);

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
    var buttonId = generateUniqueId("showModalButton");
    if (!document.getElementById(buttonId)) {
      var button = document.createElement('button');
      button.className = 'showModalButton';
      button.id = buttonId;
      button.textContent = label;
      button.style = style;
      if (container) {
        var buttonWrapper = document.createElement('div');
        buttonWrapper.style.display = 'flex';
        buttonWrapper.style.flexDirection = 'column';
        var buttonSpan = document.createElement('span');
        buttonSpan.appendChild(button);
        if (shoppingCart) {
          var cartId = generateUniqueId("cartButton");
          var cartButton = document.createElement('button');
          cartButton.innerHTML = '&#128722;';
          cartButton.className = 'cartButton';
          cartButton.id = cartId;
          cartButton.style = cartStyle;
          cartButton.addEventListener('click', function () {
            addItemToLocalStorageArray("".concat(apiKey, "-cart"), {
              displayName: displayName,
              productId: productId
            });
          });
          buttonSpan.appendChild(cartButton);
        }
        buttonWrapper.appendChild(buttonSpan);
        container.appendChild(buttonWrapper);
      } else {
        return null;
      }
      button.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var refCode, q, metamaskURL, coinbaseURL, queryParams, encodedUrl, phantomURL, params, newWindow, apiUrl, data, response, newUrl;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              refCode = "";
              if (typeof window !== "undefined") {
                q = new URLSearchParams(window.location.search);
                if (q.get("referrer")) {
                  refCode = q.get("referrer");
                }
              }
              if (!localStorage.getItem("".concat(apiKey, "-cart"))) {
                addItemToLocalStorageArray("".concat(apiKey, "-cart"), {
                  displayName: displayName,
                  productId: productId
                });
              }
              if (!isMobileDevice()) {
                _context.next = 16;
                break;
              }
              metamaskURL = "https://metamask.app.link/dapp/portal.cryptocadet.app?pubKey=".concat(apiKey, "&prod=").concat(localStorage.getItem("".concat(apiKey, "-cart")) ? localStorage.getItem("".concat(apiKey, "-cart")) : productId, "&referrer=").concat(refCode, "&email=").concat(email, "&shippingAddress=").concat(shippingAddress, "&lang=").concat(lang, "&shoppingCart=").concat(localStorage.getItem("".concat(apiKey, "-cart")) ? true : false, "&noQuantity=").concat(noQuantity, "&priceOnly=").concat(priceOnly);
              coinbaseURL = "https://go.cb-w.com/dapp?cb_url=https%3A%2F%2Fportal.cryptocadet.app%3FpubKey%3D".concat(apiKey, "%26prod%3D").concat(localStorage.getItem("".concat(apiKey, "-cart")) ? localStorage.getItem("".concat(apiKey, "-cart")) : productId, "%26referrer%3D").concat(refCode, "%26email%3D").concat(email, "%26shippingAddress%3D").concat(shippingAddress, "%26lang%3D").concat(lang, "%26shoppingCart%3D").concat(localStorage.getItem("".concat(apiKey, "-cart")) ? true : false, "%26noQuantity%3D").concat(noQuantity, "%26priceOnly%3D").concat(priceOnly);
              queryParams = new URLSearchParams({
                pubKey: apiKey,
                prod: productId,
                referrer: refCode,
                email: email,
                shippingAddress: shippingAddress,
                lang: lang,
                eth: eth,
                sol: sol,
                shoppingCart: localStorage.getItem("".concat(apiKey, "-cart")) ? true : false,
                noQuantity: noQuantity,
                priceOnly: priceOnly
              });
              encodedUrl = encodeURIComponent("https://portal.cryptocadet.app?".concat(queryParams.toString()));
              phantomURL = "https://phantom.app/ul/browse/".concat(encodedUrl);
              metamaskLink.setAttribute("href", metamaskURL);
              coinbaseLink.setAttribute("href", coinbaseURL);
              phantomLink.setAttribute("href", phantomURL);
              localStorage.removeItem("".concat(apiKey, "-cart"));
              showModal();
              _context.next = 31;
              break;
            case 16:
              params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,\n            width=400,height=500,left=".concat(window.screen.width, ",top=0");
              newWindow = window.open("", "_blank", params);
              apiUrl = "https://api.cryptocadet.app/api/user/checkout";
              data = {
                apiKey: apiKey
              };
              _context.prev = 20;
              _context.next = 23;
              return fetch(apiUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
              });
            case 23:
              response = _context.sent;
              if (response.ok) {
                newUrl = "https://portal.cryptocadet.app?pubKey=".concat(apiKey, "&prod=").concat(localStorage.getItem("".concat(apiKey, "-cart")) ? localStorage.getItem("".concat(apiKey, "-cart")) : JSON.stringify({
                  productId: productId
                }), "&referrer=").concat(refCode, "&email=").concat(email, "&shippingAddress=").concat(shippingAddress, "&lang=").concat(lang, "&eth=").concat(eth, "&sol=").concat(sol, "&redirect=").concat(redirect, "&shoppingCart=").concat(localStorage.getItem("".concat(apiKey, "-cart")) ? true : false, "&noQuantity=").concat(noQuantity, "&priceOnly=").concat(priceOnly);
                console.log('Navigating to:', newUrl);
                localStorage.removeItem("".concat(apiKey, "-cart"));
                newWindow.location = newUrl;
                window.addEventListener('message', function (event) {
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
              _context.next = 31;
              break;
            case 27:
              _context.prev = 27;
              _context.t0 = _context["catch"](20);
              console.error("Error:", _context.t0);
              newWindow.close();
            case 31:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[20, 27]]);
      })));
    }
  });
}

export { cryptoPayButton };

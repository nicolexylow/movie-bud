// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"lEWdz":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "4d0423473b06b0f7";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"2OD7o":[function(require,module,exports) {
// global variable shared across functions
let totalMovies = 0;
let totalTime = 0;
let manualInput = false;
// everytime the page is refreshed, the movies stay on the page
window.addEventListener("load", ()=>{
    reloadPage();
});
//-------------------------------------------------------------
// API IMPLEMENTATION
const getApiResponse = (movieTitle, rating)=>{
    const apiKey = "3defedc0";
    const baseUrl = "http://www.omdbapi.com/";
    const url = `${baseUrl}?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;
    fetch(url).then((response)=>{
        if (response.ok) return response.json();
        else throw new Error("Request failed with status code: " + response.status);
    }).then((data)=>{
        // check to see if the data has a poster
        if (data.Poster === "N/A" || data.Response === "False") {
            createInputs();
            manualInput = true;
            return;
        } else {
            // output the data to the watched movies list
            data.Rating = rating;
            let movies = JSON.parse(localStorage.getItem("movies"));
            if (movies == null) movies = [
                data
            ];
            else if (movies.some((movie)=>movie.Title === data.Title)) console.log("Movie already in watched list");
            else {
                movies.push(data);
                // update the tracker
                totalMovies++;
                totalTime += parseInt(data.Runtime);
                updateTracker(totalMovies, totalTime);
            }
            localStorage.setItem("movies", JSON.stringify(movies));
            displayMovie();
            displayShowPage();
        }
    }).catch((error)=>{
        console.error("Error:", error);
    });
};
//-------------------------------------------------------------
// MANUAL INPUT RESPONSE
const getManualResponse = ()=>{
    const title = document.querySelector('input[name="title"]').value;
    const rating = document.querySelector("#rating").value;
    const image = document.querySelector('input[name="image"]').value;
    const releaseDate = document.querySelector('input[name="release-date"]').value;
    const duration = document.querySelector('input[name="duration"]').value;
    const rated = document.querySelector('input[name="rated"]').value;
    const genre = document.querySelector('input[name="genre"]').value;
    const director = document.querySelector('input[name="director"]').value;
    const plot = document.querySelector('textarea[name="plot"]').value;
    // place manual id into local storage
    let manualId = JSON.parse(localStorage.getItem("manualId"));
    if (manualId === null) manualId = 1;
    else {
        manualId = parseInt(manualId);
        manualId++;
    }
    // convert date to correct format
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ];
    const dateArr = releaseDate.split("-");
    const date = dateArr[2] + " " + months[Number(dateArr[1]) - 1] + " " + dateArr[0];
    // put into database
    let movies = JSON.parse(localStorage.getItem("movies"));
    const movie = {
        Title: title,
        Rating: rating,
        Poster: image,
        Released: date,
        Runtime: `${duration} min`,
        Rated: rated,
        Genre: genre,
        Director: director,
        Plot: plot,
        imdbID: manualId.toString()
    };
    if (movies === null) movies = [
        movie
    ];
    else if (movies.some((movie)=>movie.Title === title)) console.log("Movie already in watched list");
    else {
        movies.push(movie);
        // update the tracker
        totalMovies++;
        totalTime += parseInt(duration);
        updateTracker(totalMovies, totalTime);
    }
    localStorage.setItem("movies", JSON.stringify(movies));
    localStorage.setItem("manualId", JSON.stringify(manualId));
    clearManualInputs();
    const form = document.querySelector("form");
    form.reset();
    // focus on the title input after the form is submitted
    const titleInput = document.querySelector('input[name="title"]');
    titleInput.focus();
    displayMovie();
    displayShowPage();
};
//-------------------------------------------------------------
// INPUT AND API RESPONSE
const form = document.querySelector("form");
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const title = document.querySelector('input[name="title"]').value;
    const rating = document.querySelector("#rating").value;
    if (manualInput) {
        getManualResponse();
        manualInput = false;
        return;
    } else getApiResponse(title, rating);
    form.reset();
    // focus on the title input after the form is submitted
    const titleInput = document.querySelector('input[name="title"]');
    titleInput.focus();
});
//-------------------------------------------------------------
// CLEAR MANUAL INPUTS
const clearManualInputs = ()=>{
    const inputContainer = document.querySelector(".input-container");
    if (inputContainer.children.length > 2) for(let i = 0; i < 7; i++)inputContainer.lastChild.remove();
    // clear error message
    const errorMessage = document.querySelector(".input-container p");
    errorMessage.remove();
};
//-------------------------------------------------------------
// CREATE MANUAL INPUTS
const createInputs = ()=>{
    const inputContainer = document.querySelector(".input-container");
    // ensures that another set of inputs do not get appended
    if (document.querySelector('input[name="image"]')) return;
    // image
    const imageLabel = document.createElement("label");
    imageLabel.classList.add("input-image");
    imageLabel.innerHTML = "Image";
    const imageInput = document.createElement("input");
    imageInput.setAttribute("type", "url");
    imageInput.setAttribute("name", "image");
    imageInput.setAttribute("placeholder", "https://www.example.com/image.jpg");
    imageInput.setAttribute("required", "");
    imageLabel.appendChild(imageInput);
    inputContainer.append(imageLabel);
    // release date
    const releaseDateLabel = document.createElement("label");
    releaseDateLabel.classList.add("input-release-date");
    releaseDateLabel.innerHTML = "Release Date";
    const releaseDateInput = document.createElement("input");
    releaseDateInput.setAttribute("type", "date");
    releaseDateInput.setAttribute("name", "release-date");
    releaseDateInput.setAttribute("required", "");
    releaseDateLabel.appendChild(releaseDateInput);
    inputContainer.append(releaseDateLabel);
    // duration
    const durationLabel = document.createElement("label");
    durationLabel.classList.add("input-duration");
    durationLabel.innerHTML = "Duration (min)";
    const durationInput = document.createElement("input");
    durationInput.setAttribute("type", "number");
    durationInput.setAttribute("name", "duration");
    durationInput.setAttribute("placeholder", "126");
    durationInput.setAttribute("required", "");
    durationLabel.appendChild(durationInput);
    inputContainer.append(durationLabel);
    // rated
    const ratedLabel = document.createElement("label");
    ratedLabel.classList.add("input-rated");
    ratedLabel.innerHTML = "Rated";
    const ratedInput = document.createElement("input");
    ratedInput.setAttribute("type", "text");
    ratedInput.setAttribute("name", "rated");
    ratedInput.setAttribute("placeholder", "PG-13");
    ratedInput.setAttribute("required", "");
    ratedLabel.appendChild(ratedInput);
    inputContainer.append(ratedLabel);
    // genre
    const genreLabel = document.createElement("label");
    genreLabel.classList.add("input-genre");
    genreLabel.innerHTML = "Genre";
    const genreInput = document.createElement("input");
    genreInput.setAttribute("type", "text");
    genreInput.setAttribute("name", "genre");
    genreInput.setAttribute("placeholder", "Action, Adventure");
    genreInput.setAttribute("required", "");
    genreLabel.appendChild(genreInput);
    inputContainer.append(genreLabel);
    // director
    const directorLabel = document.createElement("label");
    directorLabel.classList.add("input-director");
    directorLabel.innerHTML = "Director";
    const directorInput = document.createElement("input");
    directorInput.setAttribute("type", "text");
    directorInput.setAttribute("name", "director");
    directorInput.setAttribute("placeholder", "Tim Burton");
    directorInput.setAttribute("required", "");
    directorLabel.appendChild(directorInput);
    inputContainer.append(directorLabel);
    // plot
    const plotLabel = document.createElement("label");
    plotLabel.classList.add("input-plot");
    plotLabel.innerHTML = "Plot";
    const plotInput = document.createElement("textarea");
    plotInput.setAttribute("name", "plot");
    plotInput.setAttribute("placeholder", "Short description of the movie");
    plotInput.setAttribute("required", "");
    plotLabel.appendChild(plotInput);
    inputContainer.append(plotLabel);
    // error message
    const errorMessage = document.createElement("p");
    errorMessage.innerHTML = "Movie not found. Please manually input.";
    inputContainer.prepend(errorMessage);
};
//-------------------------------------------------------------
// CREATE IMAGE POSTER AND TITLE 
const createMovie = (movie)=>{
    const watchedMovies = document.querySelector(".watched-movies");
    const watchedMoviesList = document.querySelectorAll(".watched-movies div");
    // check to see if the movie already exists in the DOM
    let watchedMoviesArray = Array.from(watchedMoviesList);
    let movieExists = watchedMoviesArray.some((watchedMovie)=>watchedMovie.getAttribute("id") === movie.imdbID);
    let manualId = JSON.parse(localStorage.getItem("manualId"));
    if (!movieExists) {
        const div = document.createElement("div");
        div.classList.add("movie");
        if (manualInput) div.setAttribute("id", manualId);
        else div.setAttribute("id", movie.imdbID);
        div.setAttribute("data-movie-target", "#show-page");
        div.classList.add("active");
        const img = document.createElement("img");
        img.classList.add("movie-poster");
        img.src = movie.Poster;
        img.alt = `${movie.Title} poster`;
        const title = document.createElement("h4");
        title.innerHTML = movie.Title;
        div.appendChild(img);
        div.appendChild(title);
        watchedMovies.appendChild(div);
    }
};
//-------------------------------------------------------------
// RELOAD PAGE 
const reloadPage = ()=>{
    const movies = JSON.parse(localStorage.getItem("movies"));
    const watchedMovies = document.querySelector(".watched-movies");
    // reset tracker
    totalMovies = 0;
    totalTime = 0;
    if (movies !== null) movies.forEach((movie)=>{
        createMovie(movie);
        totalMovies++;
        totalTime += parseInt(movie.Runtime);
    });
    updateTracker(totalMovies, totalTime);
    displayShowPage();
    showPageControls();
};
//-------------------------------------------------------------
// UPDATE THE TRACKER INFO
const updateTracker = (movies, time)=>{
    const numMovies = document.querySelector(".num-movies p");
    numMovies.innerHTML = movies;
    const watchTime = document.querySelector(".watch-time p");
    watchTime.innerHTML = time;
};
//-------------------------------------------------------------
// DISPLAY THE MOVIES
const displayMovie = ()=>{
    const movies = JSON.parse(localStorage.getItem("movies"));
    const movie = movies.slice(-1)[0];
    createMovie(movie);
};
//-------------------------------------------------------------
// DISPLAY MOVIE SHOW PAGE
const displayShowPage = ()=>{
    // find which movie has been clicked on
    const watchedMovies = document.querySelectorAll(".watched-movies div");
    const pageContents = document.querySelectorAll("[data-page-content]");
    const movies = JSON.parse(localStorage.getItem("movies"));
    let movieInDatabase = "";
    watchedMovies.forEach((movie)=>{
        movie.addEventListener("click", ()=>{
            const movieId = movie.getAttribute("id");
            movies.forEach((movie)=>{
                if (movie.imdbID === movieId) movieInDatabase = movie;
            });
            const target = document.querySelector(movie.dataset.movieTarget);
            pageContents.forEach((page)=>{
                page.classList.remove("active");
            });
            target.classList.add("active");
            // specific show page based on the movie clicked
            const content = document.querySelector("#show-page .img-title");
            const img = document.createElement("img");
            // delete the previous append to parent HTML element
            content.innerHTML = "";
            if (manualInput) ;
            else {
                img.src = movieInDatabase.Poster;
                img.alt = `${movieInDatabase.Title} Poster`;
                const h2 = document.createElement("h2");
                h2.innerHTML = movieInDatabase.Title;
                content.appendChild(h2);
                content.appendChild(img);
                const rating = document.querySelector("#show-page .rating p");
                const genre = document.querySelector("#show-page .genre p");
                const releaseDate = document.querySelector("#show-page .release-date p");
                const director = document.querySelector("#show-page .director p");
                const rated = document.querySelector("#show-page .rated p");
                const duration = document.querySelector("#show-page .duration p");
                const plot = document.querySelector("#show-page .plot p");
                rating.innerHTML = movieInDatabase.Rating;
                genre.innerHTML = movieInDatabase.Genre;
                releaseDate.innerHTML = movieInDatabase.Released;
                director.innerHTML = movieInDatabase.Director;
                rated.innerHTML = movieInDatabase.Rated;
                duration.innerHTML = movieInDatabase.Runtime;
                plot.innerHTML = movieInDatabase.Plot;
            }
        });
    });
    showPageControls();
};
//-------------------------------------------------------------
// SHOW PAGE CONTROLS
const showPageControls = ()=>{
    const watchedMovies = document.querySelectorAll(".watched-movies div");
    const movies = JSON.parse(localStorage.getItem("movies"));
    // find which movie was clicked on in the local storage
    watchedMovies.forEach((watchedMovie)=>{
        watchedMovie.addEventListener("click", ()=>{
            movies.forEach((movie)=>{
                if (movie.imdbID === watchedMovie.getAttribute("id")) {
                    // cancel and delete button functions
                    const pageContents = document.querySelectorAll("[data-page-content]");
                    const buttonContainer = document.querySelector("#show-page .button-container");
                    buttonContainer.classList.remove("active");
                    const backBtn = document.querySelector("#show-page .back-btn");
                    backBtn.addEventListener("click", ()=>{
                        pageContents.forEach((page)=>{
                            page.classList.remove("active");
                        });
                        const mainPage = document.querySelector("#main-page");
                        mainPage.classList.add("active");
                    });
                    const deleteBtn = document.querySelector("#show-page .delete-btn");
                    deleteBtn.addEventListener("click", ()=>{
                        showDeleteConfirmation(movie);
                    });
                }
            });
        });
    });
};
//-------------------------------------------------------------
// SHOW DELETE CONFIRMATION MODAL
let handleConfirmClick;
const showDeleteConfirmation = (movie)=>{
    const deleteModal = document.querySelector("#delete-modal");
    deleteModal.classList.add("active");
    const buttonContainer = document.querySelector("#show-page .button-container");
    buttonContainer.classList.add("active");
    const cancelBtn = document.querySelector("#delete-modal .cancel-btn");
    cancelBtn.addEventListener("click", ()=>{
        buttonContainer.classList.remove("active");
        const modal = document.querySelector("#delete-modal");
        modal.classList.remove("active");
    });
    const confirmBtn = document.querySelector("#delete-modal .confirm-btn");
    // ensures that 1 event listener is only active at a time
    if (typeof handleConfirmClick === "function") confirmBtn.removeEventListener("click", handleConfirmClick);
    handleConfirmClick = ()=>deleteMovie(movie);
    confirmBtn.addEventListener("click", handleConfirmClick);
};
//-------------------------------------------------------------
// DELETE MOVIE
const deleteMovie = (movie)=>{
    const pageContents = document.querySelectorAll("[data-page-content]");
    pageContents.forEach((page)=>{
        page.classList.remove("active");
    });
    const movies = JSON.parse(localStorage.getItem("movies"));
    const movieIndex = movies.findIndex((movieItem)=>movieItem.imdbID === movie.imdbID);
    // remove movie from local storage
    if (movieIndex !== -1) {
        // Remove the movie from the array
        movies.splice(movieIndex, 1);
        localStorage.setItem("movies", JSON.stringify(movies));
    }
    // remove movie from DOM
    const watchedMovies = document.querySelectorAll(".watched-movies div");
    watchedMovies.forEach((watchedMovie)=>{
        if (watchedMovie.getAttribute("id") === movie.imdbID) {
            watchedMovie.remove();
            // update the tracker
            totalMovies--;
            totalTime -= parseInt(movie.Runtime);
            updateTracker(totalMovies, totalTime);
        }
    });
    const modal = document.querySelector("#delete-modal");
    modal.classList.remove("active");
    const mainPage = document.querySelector("#main-page");
    mainPage.classList.add("active");
};

},{}]},["lEWdz","2OD7o"], "2OD7o", "parcelRequire94c2")

//# sourceMappingURL=index.3b06b0f7.js.map

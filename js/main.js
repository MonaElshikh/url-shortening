var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const shortenTxt = document.querySelector(".form > input");
const errorMesg = document.querySelector(".form > p");
const shortenMainDiv = document.querySelector(".shorten  > .container");
const shortenBtn = document.querySelector(".form > button");
let url = "https://api.shrtco.de/v2/shorten?url=";
let source;
let shortenData = [];
let shortenObject;
function addToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function getFromLocalStorage(key) {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key) || "");
    }
    return "";
}
function getData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = (yield fetch(url)).json();
        let source = yield data;
        shortenObject = {
            original_link: source.result.original_link,
            short_link: source.result.short_link,
        };
        shortenData.push(shortenObject);
        addToLocalStorage("shortenData", JSON.stringify(shortenData));
        loadData();
    });
}
function loadData() {
    if (getFromLocalStorage("shortenData")) {
        source = JSON.parse(getFromLocalStorage("shortenData"));
        if (source.length > 0) {
            addShortenLinksToPage();
        }
    }
}
function shortenLink() {
    shortenBtn === null || shortenBtn === void 0 ? void 0 : shortenBtn.addEventListener("click", () => {
        if ((shortenTxt === null || shortenTxt === void 0 ? void 0 : shortenTxt.value) == "") {
            shortenTxt.classList.add("error");
            errorMesg.style.display = "block";
            return false;
        }
        shortenTxt.classList.remove("error");
        errorMesg.style.display = "none";
        let originalLink = shortenTxt === null || shortenTxt === void 0 ? void 0 : shortenTxt.value;
        let fullLink = url + originalLink;
        shortenTxt.value = "";
        getData(fullLink);
        return true;
    });
}
function addShortenLinksToPage() {
    console.log(source);
    source.forEach((element) => {
        let copyDiv = document.createElement("div");
        copyDiv.className = "copy-link";
        let originalLink = document.createElement("a");
        originalLink.innerHTML = element.original_link;
        originalLink.href = element.original_link;
        let shortLink = document.createElement("a");
        shortLink.innerHTML = element.short_link;
        shortLink.href = element.short_link;
        let copyBtn = document.createElement("button");
        copyBtn.innerHTML = "Copy";
        copyBtn.className = "main-btn";
        copyBtn.addEventListener("click", addToClipboard);
        copyDiv.appendChild(originalLink);
        copyDiv.appendChild(shortLink);
        copyDiv.appendChild(copyBtn);
        shortenMainDiv === null || shortenMainDiv === void 0 ? void 0 : shortenMainDiv.appendChild(copyDiv);
    });
}
function addToClipboard(event) {
    let btn = event.target;
    if (btn.innerHTML == "Copied") {
        console.log("link already copied.");
        return false;
    }
    let shortLink = btn.previousElementSibling;
    btn.classList.add("copied");
    btn.innerHTML = "Copied!";
    navigator.clipboard.writeText(shortLink.innerHTML);
    return true;
}
loadData();
shortenLink();
export {};
//# sourceMappingURL=main.js.map
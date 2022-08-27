//#region Dclaration
import { shorten } from "./shorten-data";
const shortenTxt = document.querySelector(".form > input") as HTMLInputElement;
const errorMesg = document.querySelector(".form > p") as HTMLParagraphElement;
const shortenMainDiv = document.querySelector(".shorten  > .container");
const shortenBtn = document.querySelector(
  ".form > button"
) as HTMLButtonElement;
let url: string = "https://api.shrtco.de/v2/shorten?url=";
let source: any;
let shortenData: any[] = [];
let shortenObject: shorten;
//#endregion
//#region  Functions
function addToLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFromLocalStorage(key: any) {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key) || "");
  }
  return "";
}
async function getData(url: string) {
  let data = (await fetch(url)).json();
  let source = await data;
  shortenObject = {
    original_link: source.result.original_link,
    short_link: source.result.short_link,
  };
  shortenData.push(shortenObject);
  addToLocalStorage("shortenData", JSON.stringify(shortenData));
  loadData();
}
function loadData() {
  if (getFromLocalStorage("shortenData")) {
    source = JSON.parse(getFromLocalStorage("shortenData"));
    if (source.length > 0) {
      addShortenLinksToPage();
    }
  }
}
// function to shorten link when click
function shortenLink() {
  shortenBtn?.addEventListener("click", () => {
    if (shortenTxt?.value == "") {
      shortenTxt.classList.add("error");
      errorMesg.style.display = "block";
      return false;
    }
    shortenTxt.classList.remove("error");
    errorMesg.style.display = "none";
    let originalLink = shortenTxt?.value;
    let fullLink = url + originalLink;
    shortenTxt.value = "";
    getData(fullLink);
    return true;
  });
}
// function to add links to page dom.
function addShortenLinksToPage() {
  console.log(source);
  source.forEach((element: any) => {
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
    shortenMainDiv?.appendChild(copyDiv);
  });
}
// function to add copied link to clipboard.
function addToClipboard(event: any) {
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
//#region
//#region  Calls
loadData();
shortenLink();
//#endregion

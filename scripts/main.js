const myHeading = document.querySelector("h1")
const myButton = document.querySelector("button")
const myImage = document.querySelector("img")
let cool = "Mozilla"


myImage.addEventListener("click", ()=>{
    const src = myImage.getAttribute("src")
    if (src == "images/firefox-icon.png"){
        myImage.setAttribute("src", "images/firefox-icon2.png")
        myHeading.textContent = `Sprint 127 is cool, ${localStorage.getItem("name")}`
        cool = "Sprint 127" 
    }
    if (src == "images/firefox-icon2.png"){
        myImage.setAttribute("src", "images/firefox-icon.png")
        myHeading.textContent = `Mozilla is cool, ${localStorage.getItem("name")}`
        cool = "Mozilla"
    }
})

function setUserName(){
    const myName = prompt("Please enter your name.")
    if (!myName){
        setUserName()
    }
    else{
        localStorage.setItem("name", myName)
        myHeading.textContent = `${cool} is cool, ${myName}`}
}
if (!localStorage.getItem("name")){
    setUserName()
}
else{
    myHeading.textContent = `Mozilla is cool, ${localStorage.getItem("name")}`
}

myButton.addEventListener("click", setUserName)

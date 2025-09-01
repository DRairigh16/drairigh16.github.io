const myHeading = document.querySelector("h1");
const myButton = document.querySelector("button")
const myImage = document.querySelector("img")

myImage.addEventListener("click", ()=>{
    const src = myImage.getAttribute("src")
    if (src == "images/firefox-icon.png"){
        myImage.setAttribute("src", "images/firefox-icon2.png")
    }
    if (src == "images/firefox-icon2.png"){
        myImage.setAttribute("src", "images/firefox-icon.png")
    }
})

function setUserName(){
    const myName = prompt("Please enter your name.")
    if (!myName){
        setUserName()
    }
    else{
        localStorage.setItem("name", myName)
        myHeading.textContent = `Mozilla is cool, ${myName}`}
}
if (!localStorage.getItem("name")){
    setUserName()
}
else{
    myHeading.textContent = `Mozilla is cool, ${localStorage.getItem("name")}`
}

myButton.addEventListener("click", setUserName)

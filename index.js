let nav=document.querySelector(".nav");
let unLi=document.querySelector("ul");
let li=document.querySelector("ul li");
let header=document.querySelector("header");
let image=document.querySelector(".main-pic")
let headContent=document.querySelector(".header-content")
let body=document.querySelector("body")
let bodyInfo=body.getBoundingClientRect()
// for shorten url
let divOfInput=document.querySelector(".shorten")
let original_link=document.getElementById("original_link")
let generate=document.getElementById("generate")
let bodyWidth=bodyInfo.width
let div=document.createElement("div");
// to set the links in divs
let statisticsText=document.querySelector(".statistics-text")
let child=document.querySelector(".statistics-text h2")

// onclick to change some styling in the nav and make the nav burger appear
nav.addEventListener("click",()=>{
  image.style.cssText="display:none;"
  header.appendChild(div)
  unLi.style.cssText="display:block;margin-top:20px;";
  div.appendChild(unLi);
  div.appendChild(headContent);
  headContent.style.cssText="display:block;"
  div.style.cssText="background-color:hsl(257, 27%, 26%); width:90%;height:400px; margin:20px auto;color:white; border-radius:10px;   ;"
});

let errorDiv= document.createElement("div")
generate.addEventListener("focus",function(){
  // check if the input is empty or not
  if(original_link.value.length!=0){
    // give the url the value of the input
    let url=original_link.value;
    // fetching the api
    fetch(`https://api.shrtco.de/v2/shorten?url=${url}/very/long/link.html`)
    .then((res)=>res.json())
    .then((value)=>{
      
      errorDiv.innerHTML=""
      original_link.style.cssText="border:none"
      let theCopyBtn=document.createElement("button")
      theCopyBtn.innerHTML="copy"
      theCopyBtn.style.cssText="border:none; background-color:hsl(180, 66%, 49%); border-radius:5px ; padding: 5px;width: 70px; cursor:pointer ;color:white; "
      
      let theURLDiv=document.createElement("div")
      let theShortenContainer= document.createElement("p")
      
      let theOriginal= document.createTextNode(url)
      
      let theShorten= document.createTextNode(value.result.short_link)
      theShortenContainer.appendChild(theShorten)
      theShortenContainer.style.cssText="color:hsl(180, 66%, 49%);"
      // styling
      theURLDiv.style.cssText="word-break: break-all;display:grid; grid-template-columns: auto auto auto; justify-content:space-between;align-items: center;background-color:white;padding :20px ;border-radius:5px; margin-bottom:10px "
      // appending
      theURLDiv.appendChild(theOriginal)
      theURLDiv.appendChild(theShortenContainer)
      theURLDiv.appendChild(theCopyBtn)
      // to append as the urlDiv as the first child 
      statisticsText.insertBefore(theURLDiv,child)
      // event on clicking the copy btn
      theCopyBtn.addEventListener("click",function(){
        // to change the inner html
        theCopyBtn.innerHTML="copied!";
        // to style the btn
        theCopyBtn.style.cssText="border:none; background-color:hsl(257, 27%, 26%); border-radius:5px ; padding: 5px;width: 70px; cursor:pointer ;color:white;"
        // to copy the shortened link to the clipboard
        navigator.clipboard.writeText(value.result.short_link)
      })
      // calling query function
      var x = window.matchMedia("(max-width: 700px)")
      myFunction(x,theURLDiv,theShortenContainer,theCopyBtn) // Call listener function at run time
        x.addListener(myFunction)
    })
      // to make the message add link appear when no link as input
    }
    else{
      // to make it just once not multiple times
      errorDiv.innerHTML=""
      // the message
      let errorMess=document.createTextNode("Please add a link")
      // styling for message 
      errorDiv.style.cssText="color:hsl(0, 87%, 67%);position:absolute ;font-style: italic;"
      // append the message and div to the container when no link
      errorDiv.appendChild(errorMess)
      divOfInput.appendChild(errorDiv)
      // styling for input when appears error
      original_link.style.cssText="border:hsl(0, 87%, 67%) 2px solid"
      
    }
    
    
  })
  
  
  // function to make the queries change
function myFunction(x,ele,element,btn) {
    if (x.matches) { // If media query matches
      ele.style.cssText = "border-radius: 7px;display:flex;flex-direction:column ;background-color: white;align-items: flex-start;margin-bottom:10px;padding: 7px;"
      element.style.cssText="color:hsl(180, 66%, 49%); border-top:2px solid grey; width :100% ;text-align: initial;"
      btn.style.cssText="width:100%;border:none; background-color:hsl(180, 66%, 49%); border-radius:5px ; padding: 5px; cursor:pointer ;color:white; "
      btn.addEventListener("click",function(){
        btn.style.cssText="width:100%;border:none; background-color:hsl(257, 27%, 26%); border-radius:5px ; padding: 5px; cursor:pointer ;color:white;"
      })
    } 
}
      
      

// Event listener for clicks on the document
document.addEventListener('click', function(event) {
  const clickedElement = event.target;
  
  // Check if the clicked element is not the input element
  if (clickedElement !== original_link) {
    // Clear the input field
    original_link.value = '';
  }
});
      
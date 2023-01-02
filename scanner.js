const scannerDiv = document.querySelector(".scanner");

const camera = scannerDiv.querySelector("h1 .fa-camera");
const stopCam = scannerDiv.querySelector("h1 .fa-circle-stop");

const form = scannerDiv.querySelector(".scanner-form");
const fileInput = form.querySelector("input");
const p = form.querySelector("p");
const img = form.querySelector("img");
const vdieo = form.querySelector("vdieo");
const content = form.querySelector(".content");

const textarea = scannerDiv.querySelector(".scanner-details textarea");
const copyBtn = scannerDiv.querySelector(".scanner-details .copy");
const closeBtn = scannerDiv.querySelector(".scanner-details .close");


//Input File
form.addEventListener("click", () => fileInput.click());
console.log(fileInput);
//Scan QR Code Image

 fileInput.addEventListener("change", e => {
    let file = e.target.files[0]
    if(!file) return;
    fetchRequest(file);
})

function fetchRequest(file){
    let formData = new FormData();
    formData.append("file",file);

    p.innerText = "Scanning QR Code....";

    fetch('http://api.qrserver.com/v1/read-qr-code/' , {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        let text = result[0].symbol[0].data;

        if(!text)
         return p.innerText = "Couldn't Scan QR Code";

         scannerDiv.classList.add("active");
         form.classList("active-img");

         img.src = URL.createObjectURL(file);
         textarea.innerText = text;
    })
} 

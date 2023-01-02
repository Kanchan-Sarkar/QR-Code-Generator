const generatorDiv = document.querySelector(".generator");
const generatorBtn = generatorDiv.querySelector(".generator-form button");
const qrInput = generatorDiv.querySelector(".generator-form input");
const qrImg = generatorDiv.querySelector(".generator-img img");
const downloadBtn = generatorDiv.querySelector(".generator-btn .btn-link");


let imgURL = '';

generatorBtn.addEventListener("click", () => {
    let qrValue = qrInput.value;
    if(!qrValue.trim()) return; //If value is empty stop here

    generatorBtn.innerText = "Generating QR Code....";

    imgURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue} `;
    qrImg.src = imgURL;

    qrImg.addEventListener("load", () => {
        generatorDiv.classList.add("active");
        generatorBtn.innerText = "Generate QR Code";
    })
})

//Download QR Code


downloadBtn.addEventListener("click", () => {

    if(!imgURL) return;
    fetchImage(imgURL)
})


function fetchImage(url){
    fetch(url).then(res => res.blob()).then(file => {
        console.log(file)
        let tempFile = URL.createObjectURL(file);
        let file_name = url.split("/").pop().split(".")[0];
        let extension = file.type.split("/")[1];
        download(tempFile, file_name, extension);
    })
    .catch(() => imgURL = '');
}

function download(tempFile, file_name, extension){
    let a = document.createElement('a');
    a.href = tempFile;
    a.download = `${file_name}.${extension}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
}



// if value is empty => remove active class

qrInput.addEventListener("input", () => {
    if(!qrInput.value.trim())
    return generatorDiv.classList.remove("active");
})
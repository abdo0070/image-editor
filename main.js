// Filters
let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blurInput = document.getElementById('blur');
let hueRotate = document.getElementById('hueRotate');

// buttons
let reset = document.querySelector('span');
let btnDownload = document.querySelector('a');
let img = document.querySelector('img');

// upload 
let upload = document.querySelector('.upload label');
let input = document.querySelector('.upload input');
let canvas = document.getElementById("canvas");
const CTX = canvas.getContext("2d");

input.addEventListener('change',function(){
    resetFilters();
    console.log(input.files[0]);
    img.src = URL.createObjectURL(input.files[0]);
    reset.style.display = 'block';
    btnDownload.style.display = 'block';
    img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        CTX.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display = 'none';
    }
});



reset.addEventListener('click' , function(){
    resetFilters();
} );

let filters = document.querySelectorAll('ul li input');

window.onload = function(){
    reset.style.cursor = 'pointer';
    btnDownload.style.cursor = 'pointer';
    reset.style.display = 'none';
    btnDownload.style.display = 'none';
    
}




filters.forEach(
    filter =>
    filter.addEventListener('input' , function(){
        CTX.filter = changeFilter();
        CTX.drawImage(img,0,0,canvas.width,canvas.height);
    })
);

function changeFilter(){


    console.log( saturate.value + " + " + contrast.value + " + " + brightness.value + " + " +  sepia.value + " + " );
    return `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blurInput.value}px)
        hue-rotate(${hueRotate.value}deg)
        `;
}


function resetFilters(){

    saturate.value = 100;
    contrast.value = 100;
    brightness.value = 100;
    hueRotate.value = 0;
    sepia.value = 0;
    grayscale.value = 0;
    blurInput.value = 0;
    CTX.filter = changeFilter();
    CTX.drawImage(img,0,0,canvas.width,canvas.height);
}
btnDownload.onclick = function(){
    btnDownload.download = "image"+Date.now();
    btnDownload.href = canvas.toDataURL();
}

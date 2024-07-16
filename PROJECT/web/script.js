const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const imageDisplay = document.getElementById('imageDisplay');
const translateButton = document.getElementById('translate');
const convert = document.getElementById('convert');
const searchButton = document.getElementById('google-search');
const outputText = document.getElementById('output-text');

let text;
var diss = "";

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            diss = event.target.result;

            eel.send_image_to_python(event.target.result)(result => {
                text = result;
            });
        };

        reader.readAsDataURL(file);
    }
});

convert.addEventListener('click', convertt);

function convertt() {
    if (text) {
        outputText.textContent = text;
    }
}

translateButton.addEventListener('click', translate);


function google_search() {

    var query = text;
    eel.perform_google_search(query)();
}

function convertToSpeech() {

    eel.text_to_speech(text);
}

function language_detection() {
    var data = text;

    eel.language_detect(data)(function(result) {
        outputText.innerText = result;
    });
}

function translatetext() {
    event.preventDefault();
    const data = document.getElementById('inputText').value;
    var selectedLanguage = languageDropdown.value;

    if (data) {
        eel.translator(data, selectedLanguage)(function(result) {
            outputText.innerText = result;
        });
    } else {
        alert("No text to translate. Upload an image first.");
    }
}

function scan_barcode() {

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                imagePreview.src = event.target.result;

                eel.scan_barcodes(event.target.result)(result => {
                    outputText.innerText = result;
                });
            };

            reader.readAsDataURL(file);
        }
    });
}

const generateQRCodeButton = document.getElementById('generateQRCode');
const qrCodeImage = document.getElementById('qrCodeImage');
const qrCodeText = document.getElementById('qrCodeText');

generateQRCodeButton.addEventListener('click', generateQRCode);

function generateQRCode() {
    const text = qrCodeText.value;

    if (text) {
        eel.generate_qr_code(text)(function(result) {
            imagePreview.src = 'data:image/png;base64,' + result;
        });
    } else {
        alert('Please enter text to generate a QR code.');
    }
}

function generatteQRCode() {
    var data = text;
    if (data) {
        eel.generate_qr_code(text)(function(result) {
            imagePreview.src = 'data:image/png;base64,' + result;
        });
    } else {
        alert('Please enter text to generate a QR code.');
    }
}

function rotateImage() {
    const fileInput = document.getElementById('imageInput');
    const image = fileInput.files[0];

    if (image) {
        const reader = new FileReader();

        reader.onload = function(e) {
            let dataUrl = e.target.result;

            // Send the image data to Python for rotation
            eel.rotate_image(dataUrl)(function(rotatedImageData) {
                // Update the image on the webpage with the rotated image
                const rotatedImage = document.getElementById('rotatedImage');
                imagePreview.src = 'data:image/jpeg;base64,' + rotatedImageData;
                eel.send_image_to_python(imagePreview.src)(result => {
                    text = result;
                });
            });
        };

        reader.readAsDataURL(image);
    } else {
        alert('Please select an image file.');
    }
}
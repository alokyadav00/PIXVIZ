import eel
from PIL import Image
from io import BytesIO
import base64
import pytesseract
from googletrans import Translator
from googlesearch import search
from langdetect import detect
import webbrowser
import qrcode
import subprocess
import sys

eel.init('web')

# def install_library(library_name):
#     try:
#         subprocess.check_call([sys.executable, '-m', 'pip', 'install', library_name])
#         print(f"Successfully installed {library_name}")
#     except Exception as e:
#         print(f"Error installing {library_name}: {e}")

# def install_required_libraries():
#     required_libraries = [
#         'eel',
#         'Pillow',
#         'pytesseract',
#         'googletrans==4.0.0-rc1',
#         'googlesearch-python',
#         'langdetect',
#         'webbrowser',
#         'qrcode'
#     ]

#     for library in required_libraries:
#         install_library(library)

# if __name__ == '__main__':
#     install_required_libraries()

@eel.expose
def send_image_to_python(data_url):
    try:
        data = data_url.split(',')[1]
        binary_data = base64.b64decode(data)
        image_stream = BytesIO(binary_data)
        image = Image.open(image_stream)
        languages = 'eng+hin+spa+chi_sim+fra+deu+ita+jpn+kor+por+rus'  
        text = pytesseract.image_to_string(image, lang=languages)

        # Check if text is empty or contains only whitespace
        if text and text.strip():
            return text
        
        else:
            return "No text found in the image"
        
    except Exception as e:
        return f"Image processing error: {str(e)}"


@eel.expose
def perform_google_search(query):
    if query == "No text found in the image":
        return
    
    try:
        # Perform Google search
        search_query = 'https://www.google.com/search?q=' + query
        webbrowser.open(search_query)

    except Exception as e:
        return f"Google search error: {str(e)}"


@eel.expose
def translator(text, target_lang):
    try:
        # Translate text to the target language
        translator = Translator()
        translated_text = translator.translate(text, dest=target_lang)
        return translated_text.text
    
    except Exception as e:
       return f"Translation error: {str(e)}"


@eel.expose
def language_detect(text):
    try:
        # Detect the language of the provided text
        detected_language = detect(text)
        return detected_language
    
    except Exception as e:
        return f"Language detection error: {str(e)}"


@eel.expose
def generate_qr_code(text):
    try:
        # Generate QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(text)
        qr.make(fit=True)

        # Create an Image object
        img = qr.make_image(fill_color="black", back_color="white")

        # Convert the image to base64
        buffered = BytesIO()
        img.save(buffered, format="PNG")
        base64_qr_code = base64.b64encode(buffered.getvalue()).decode("utf-8")

        return base64_qr_code

    except Exception as e:
        return f"QR code generation error: {str(e)}"


@eel.expose
def rotate_image(data_url):
    try:
        data = data_url.split(',')[1]
        binary_data = base64.b64decode(data)
        image_stream = BytesIO(binary_data)
        image = Image.open(image_stream)

        # Rotate the image
        rotated_image = image.rotate(90)

        # Convert the rotated image to base64
        buffered = BytesIO()
        rotated_image.save(buffered, format="JPEG")
        base64_rotated_image = base64.b64encode(buffered.getvalue()).decode("utf-8")

        # Return the rotated image data
        return base64_rotated_image

    except Exception as e:
        return f"Image processing error: {str(e)}"



eel.start("firsttpage.html", size=(None, None), mode='chrome', fullscreen=True)

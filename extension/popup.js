document.getElementById('analisis').addEventListener("click", () => {alert("Button clicked");});

//add a box
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('addBox').addEventListener('click',function(){
        const content = document.getElementById("boxContent").value;
        if (content.trim() === ''){
            alert('añadir contenido');
            return;
        }

        const newBox = document.createElement('div');
        newBox.classList.add('grid-box');
        newBox.textContent = content;

        document.getElementById("mainGrid").appendChild(newBox);

        document.getElementById('boxContent').value = '';
    });
});

//functions to use 
function utf8Base64(url){
    return btoa(encodeURIComponent(url).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode('0x' + p1)));
}

function generateUrlUnicodeSafe(url){
    let base64Encoded = utf8Base64(url);
    let urlSafeBase64 = base64Encoded.replace(/\+/g, '-').replace(/\//g, '_');
    return urlSafeBase64.replace(/=+$/, '');
}

//make an input box appear
document.addEventListener('DOMContentLoaded', function(){
    //get elements
    const openUrlInputButton = document.getElementById('openUrlInput');
    const urlInputContainter = document.getElementById('urlInputContainer');
    const submitUrlButton = document.getElementById('submitUrl');
    const urlInputField = document.getElementById('urlInput');

    //show the box
    openUrlInputButton.addEventListener('click', function(){
        urlInputContainter.classList.toggle('hidden');
        urlInputField.focus();
    });

    //handling
    submitUrlButton.addEventListener('click', function(){
        const url = urlInputField.value.trim()

        if(url==''){
            alert('Por favor, ingrese una URL.');
            return;
        }
        
        //convert URL to base64
        
        let urlId = generateUrlUnicodeSafe(url);
        


        urlInputField.value='';
        urlInputContainter.classList.toggle('hidden');
    });
});
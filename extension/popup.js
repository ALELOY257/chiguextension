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
        console.log("box created")

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
    const okButton = document.getElementById('aceptar')
    const container = document.getElementById('vtdataContainer');

    //show the box
    openUrlInputButton.addEventListener('click', function(){
        urlInputContainter.classList.toggle('hidden');
        urlInputField.focus();
    });

    //handling
    submitUrlButton.addEventListener('click', function(){
        container.classList.toggle('ocultar');

        const url = urlInputField.value.trim()

        if(url==''){
            alert('Por favor, ingrese una URL.');
            return;
        }
        
        //convert URL to base64
        
        let urlId = generateUrlUnicodeSafe(url);
        
        let finalUrl = "https://www.virustotal.com/api/v3/urls/"+urlId;

        let rawData;
        
        //Call virustotal API from background
        chrome.runtime.sendMessage(
            {action: "getVirusTotalAnalysis", url: finalUrl},
            (response) =>{
                if(!response) {
                    console.error("No response from background script");
                    document.getElementById('result').innerText="No response from bg script";
                } 
                
                if (response.err){
                    console.error(response.err);
                    document.getElementById('result').innerText = "Error: "+ response.err;
                }
                else {
                    const analysisResult = response.result;
                    console.log(analysisResult)
                    //data depuration
                    const threats = analysisResult.data.attributes.threat_names;
                    const analysisStats = analysisResult.data.attributes.last_analysis_stats;
                    const maliciousEngines = Object.entries(analysisResult.data.attributes.last_analysis_results).filter(([engine, result]) => result.category ==="malicious");
                    const trackers = Object.keys(analysisResult.data.attributes.trackers);
                    //show in html
                    let resultHtml =`
                    
                                        <h2>Analisis</h2>
                                        <p><strong>Amenazas:</strong> ${threats.join(", ") || "Ninguna"}</p>
                                        <p><strong>Estadisticas del analisis:</strong> Inofensivas: ${analysisStats.harmless}, 
                                        Maliciosas: ${analysisStats.malicious}, Sospechosas: ${analysisStats.suspicious}, 
                                        No detectadas: ${analysisStats.undetected}</p>
                                        <p><strong>Motores maliciosos:</strong> ${maliciousEngines.join(", ") || "None"}</p>
                                        <p><strong>Trackers:</strong> ${trackers.join(", ") || "None"}</p>
                                    `;
                    resultHtml = resultHtml.replace(/\n/g, "<br>"); 
                    document.getElementById('data').innerHTML = JSON.stringify(resultHtml, null, 2);
                }
            }
        )
        
        okButton.addEventListener('click', function(){
            container.classList.toggle('ocultar');
        })
        urlInputField.value='';
        urlInputContainter.classList.toggle('hidden');
    });
});
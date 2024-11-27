document.getElementById('infoCiberpaz').addEventListener("click", () => {alert("Button clicked");});

//add a box
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('addBox').addEventListener('click',function(){
        const content = document.getElementById("boxContent");
        const searchBtn = document.getElementById('search');
        content.classList.toggle('hidden');
        searchBtn.classList.toggle('hidden');

        searchBtn.addEventListener('click', function(){
            const query = content.value;
            console.log('query', query);
            if (query.trim() === ''){
            alert('añadir contenido');
            return;}
            
            function responseHandler(response){
                for (var i = 0; i < 8; i++){// 8 is the number of results to show
                    var item = response.items[i];
                    console.log(item);
                    //creation of a new box
                    const newBox = document.createElement('div');
                    newBox.classList.add('grid-box');
                    newBox.textContent = item.title + " - " + item.displayLink;

                    newBox.addEventListener('click', function() {
                        console.log("Box clicked")
                        chrome.tabs.create({url: item.link});
                    });

                    document.getElementById("mainGrid").appendChild(newBox);
                    document.getElementById('boxContent').value = '';
                }
            }
            //loading the google search API
            // Clear previous results
            document.getElementById("mainGrid").innerHTML = '';

            const apiKey = "AIzaSyCCCKYFPwStkxP_f0y_PWMMl0ymD6hrRJ8";
            const cx = "61722d01bfafc434c";
            const apiUrl =`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                responseHandler(data)
            })
            .catch(error => {
                console.error('Error fetching the API:', error);
            });


            content.classList.toggle('hidden');
            searchBtn.classList.toggle('hidden');
            

        }
    )

});
});
/*
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
});*/

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
/*
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('addBox');
    searchButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    function: getExtractedQuery
                },
                (results) => {
                    if (results && results[0] && results[0].result) {
                        const query = results[0].result;
                        chrome.runtime.sendMessage({ action: "openExtension", query: query });
                    }
                }
            );
        });
    });
});

function getExtractedQuery() {
    if (window.extractedQuery === null) {
        console.log("No query was extracted.");
    } else {
        console.log("Extracted query pop:", window.extractedQuery);
    }

}*/  

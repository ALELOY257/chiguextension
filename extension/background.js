
//listen for messages form the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('message received', request);
    if (request.action === "getVirusTotalAnalysis"){
        const url = request.url;
        const apiKey = '5bb389eb66d9e09c19a952a49f0cc6cad7f8857818ac7a0154aadcb33b2bc955'

        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-apikey': apiKey
            }
          };
        
        const fetchVirusTotalAnalysis = async () => {
            try {
                console.log('Making API request...');
                const res = await fetch(url, options);
                
                const data = await res.json();
                console.log('API response received:', data);
                sendResponse({ result: data });
            } catch (err) {
                console.error('Error during fetch:', err);
                sendResponse({ err: 'Failed to fetch data from VT' });
            }
        };

        fetchVirusTotalAnalysis();
            
            return true;
    }
})
  
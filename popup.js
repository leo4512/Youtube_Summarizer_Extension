document.getElementById('summarizeVideo').addEventListener('click', function () {
	document.getElementById('loading').style.display = 'block';
	chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
		let url = tabs[0].url;
		console.log('Current tab URL: ' + url);
		let videoId = url.split('v=')[1];
		let ampersandPosition = videoId.indexOf('&');
		if (ampersandPosition != -1) {
			videoId = videoId.substring(0, ampersandPosition);
		}
		console.log('Video ID: ' + videoId);
		chrome.storage.sync.get('apiKey', function (data) {
			let apiKey = data.apiKey;
			console.log('API key retrieved for request: ' + apiKey);
			let language = document.getElementById('language').value;
			let payLoad = { video_id: videoId, apiKey: apiKey, language: language };
			console.log('Payload for request: ' + JSON.stringify(payLoad));
			fetch('https://youtubesummarizer-node-backend-b3ijrlrwga-as.a.run.app/data', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payLoad),
			})
				.then(response => {
					console.log('Response received: ' + JSON.stringify(response));
					return response.json();
				})
				.then(data => {
					console.log('Data received: ' + JSON.stringify(data));
					document.getElementById('loading').style.display = 'none';
					document.getElementById('summary').textContent = data.content;
				})
				.catch((error) => {
					console.log('Error occurred: ' + error);
					document.getElementById('loading').style.display = 'none';
				});
		});
	});
});

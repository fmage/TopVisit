function isEmpty(val){
	return val === null || val === '' || jQuery.isEmptyObject(val);
}

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-76862369-9', 'auto');
  ga('set', 'checkProtocolTask', function(){});
  ga('require', 'displayfeatures');


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(isEmpty(changeInfo.url) === false && changeInfo.url.startsWith('chrome://') === false)
	{
		var uri = document.createElement('a');
		uri.href= changeInfo.url;
		var host = uri.hostname;

		if(!localStorage.getItem(host)){
			localStorage.setItem(host, 1);
		}else{
			var count = parseInt(localStorage.getItem(host))+1;
			localStorage.setItem(host, count);
		}
		ga('send', {hitType: 'event', eventCategory:'test', eventAction: 'visit', eventLabel: host});
	}
});

$(document).ready(function(){
	var html = '<p>Please visit some websites.</p>';
	if(localStorage.length > 0){
		var data = [];
		for (var i = 0; i < localStorage.length; i++){
		    data.push([localStorage.key(i), localStorage.getItem(localStorage.key(i))]);
		}
		data.sort(
		    function(a, b) {
		        return b[1] - a[1];
		    }
		);
		var len = data.length < 10 ? data.length : 10;
		html = '<table><tr><th>No.</th><th>Site</th><th>Times</th></tr>';
		for(var i = 0; i < len; i++){
			html += '<tr><td><strong>'+(i+1).toString()+'</strong></td><td>'+data[i][0]+'</td><td>'+data[i][1]+'</td></tr>';
		}
		html+= '</table>';
	}
	$('#top10').html(html);
});

chrome.runtime.onInstalled.addListener(function(){
	ga('send', {hitType: 'event', eventCategory:'installed', eventAction: chrome.app.getDetails().id, eventLabel: chrome.app.getDetails().version});
});
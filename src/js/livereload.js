// Add the livereload script
document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')

// After five seconds check if LiveReload is running.  If not, try again.
// This is especially common when the template is started by the Launch.app
window.setTimeout(function() {
	if(!window.LiveReload) {
		var body = document.getElementsByTagName("body")[0];
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = 'http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1';
		body.appendChild(script);
		console.log('LiveReload');
	}
}, 5000);
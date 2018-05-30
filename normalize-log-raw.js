const url = require('url');
const source = '[$time_local] "$remote_addr - $remote_user" "$request" $status $body_bytes_sent "$http_referer" $request_time "$http_user_agent"'; 

var NginxParser = require('nginxparser');

var parser = new NginxParser(source);

var moment = require('moment');

parser.read('-', function (row) {
	const uri = row.request.split(' ')[1];
	const campaign = url.parse(uri).path.split('/')[3];

	const ts = moment(row.time_local, "DD/MMM/YYYY:HH:mm:ss Z").unix();
	try {
		const x = url.parse(row.http_referer, true);
		console.log(`${ts} ${row.status} ${row.request_time} ${campaign} ${x.query.mac} ${x.query.apmac} ${x.query.sessionID}`);
	} catch (e) {
		// simply ignore it
	}
	
}, function (err) {
    // simply ignore it
});
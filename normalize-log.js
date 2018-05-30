const source = '[$time_local] "$remote_addr - $remote_user" "$request" $status $body_bytes_sent "$http_referer" $request_time "$http_user_agent"'; 

var NginxParser = require('nginxparser');

var parser = new NginxParser(source);

var moment = require('moment');

parser.read('-', function (row) {
	const ts = moment(row.time_local, "DD/MMM/YYYY:HH:mm:ss Z").unix();
	const parsed = row.request.split(/\s+/)
	console.log(`${ts}|${row.ip_str}|${parsed[1]}|${row.status}|${row.body_bytes_sent}`);
}, function (err) {
    if (err) throw err;
});
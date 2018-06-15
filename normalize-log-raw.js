var SDC = require('statsd-client'),
	sdc = new SDC({host: 'localhost', port: 8125});

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
		
		sdc.increment(`jc.airport.status.${row.status}`);
		sdc.increment(`jc.airport.campaigns.${campaign}`);
		sdc.timing(`jc.airport.campaigns.${campaign}`, row.request_time * 1000);
	} catch (e) {
		// simply ignore it
		sdc.close();
	}
	
}, function (err) {
    // simply ignore it
    sdc.close();
});
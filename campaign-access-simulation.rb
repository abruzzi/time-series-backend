require 'securerandom'
require 'date'

UAS = [
	"Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100",
	"Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13G36",
	"Mozilla/5.0 (Linux; Android 6.0; HUAWEI MLA-AL10 Build/HUAWEIMLA-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36"
]

IPS = ["172.21.188.246 - -", "12.21.18.246 - -", "72.21.88.46 - -", "2.21.18.26 - -"]

CAMPAIGNS = (0...20).map {SecureRandom.hex}
SESSIONS = (0...20).map {SecureRandom.uuid}

STATUS = [200, 201, 202, 204, 302, 400, 403, 404, 500, 502]

def generate_message
	length = Random.rand(100)
	time_speed = Random.rand(0.05).round(2)
	now = DateTime.now.strftime('%d/%b/%Y:%H:%M:%S %z')
	
	ua = UAS.shuffle[0]
	ip = IPS.shuffle[0]

	
	campaign_id = CAMPAIGNS.shuffle[0]
	session_id = SESSIONS.shuffle[0]

	status = STATUS.shuffle[0]

	request = "GET /dispatcher/campaigns/#{campaign_id}/consume?callback=jQuery31106456369701772928_1522222781727&_=1522222781730 HTTP/1.1" 
	referer = "http://172.21.163.16:8889/?airport=PD&pre_AD=#{campaign_id}&login_AD=#{campaign_id}&post_AD=#{campaign_id}&postlink=http%3A%2F%2Fwww.shanghaiairport.com%2F&mac=00:61:71:53:f4:0b&apmac=T2-CL13-49-D87&switchip=172.21.215.247&sessionID=#{session_id}" 
	
	"[#{now}] \"#{ip}\" \"#{request}\" #{status} #{length} \"#{referer}\" #{time_speed} \"#{ua}\""
end

while true do
	sleep(Random.rand(0.08))
	puts generate_message
end

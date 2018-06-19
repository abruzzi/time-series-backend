HQ = {
	latitude: 31.193662,
	longitude: 121.331234
}

PD = {
	latitude: 31.1523523,
  	longitude: 121.6947441	
}

def next_loc(center)
	offset = Random.rand(-0.01..0.01)
	{
		:latitude => center[:latitude] + offset,
		:longitude => center[:longitude] + offset
	}
end

(0...20).to_a.each { |x| p next_loc(HQ) }

# p next_loc(HQ)
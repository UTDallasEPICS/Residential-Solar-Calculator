from geopy.geocoders import Nominatim

class location(object):
    def __init__(self, address):
        self.address = address
        loc = Nominatim(user_agent="GetLoc")
        getLoc = loc.geocode(address)
        self.latitude = getLoc.latitude
        self.longitude = getLoc.longitude
    def __str__(self):
        return f"{self.address}: {self.latitude}, {self.longitude}"
        

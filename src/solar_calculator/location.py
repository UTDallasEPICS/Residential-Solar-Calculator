from geopy.geocoders import Nominatim

class location(object):
    def __init__(self, address):
        self.address = address
        loc = Nominatim(user_agent="GetLoc")
        getLoc = loc.geocode(address)
        if getLoc:
            print(getLoc)    
            self.latitude = getLoc.latitude
            self.longitude = getLoc.longitude
        else:
            self.latitude = None
            self.longitude = None
    def __str__(self):
        return f"{self.address}: {self.latitude}, {self.longitude}"
        

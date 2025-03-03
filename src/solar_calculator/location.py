from geopy.geocoders import Nominatim  # type: ignore # Import the Nominatim geocoding service from the geopy library


# Define a class named 'location' to handle geocoding operations
class location(object):
    def __init__(self, address):
        self.address = address  # Store the provided address
        loc = Nominatim(
            user_agent="GetLoc"
        )  # Create a Nominatim geocoder instance with a custom user-agent
        getLoc = loc.geocode(
            address
        )  # Use the geocoder to get the location details (latitude and longitude)

        # If a location is found, assign latitude and longitude attributes
        if getLoc:
            print(
                getLoc
            )  # Print the full geocoded location details (useful for debugging)
            self.latitude = (
                getLoc.latitude
            )  # Assign the latitude of the geocoded location
            self.longitude = (
                getLoc.longitude
            )  # Assign the longitude of the geocoded location
        else:
            # If no location is found, set latitude and longitude to None
            self.latitude = None
            self.longitude = None

    # String representation method for the location class
    def __str__(self):
        return f"{self.address}: {self.latitude}, {self.longitude}"  # Returns a formatted string of the address with its coordinates

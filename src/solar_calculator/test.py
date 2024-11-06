from flask import Flask

app = Flask(__name__)

@app.route("/members")

def get_system_info():
    #with app.app_context():  # Ensures that the application context is available
        
        x = {'Name':"geek", 
            "Age":"22",
            "Date":123, 
            "programming":"python"}
        return x

if __name__ == "__main__":
    app.run(debug =True)
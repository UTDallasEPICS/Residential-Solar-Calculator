import React from "react";
import "./Styles.css"

function LandingPage() {
    // const SaveInput = () => {
    //     setInput(document.innerText = input)
    // }

    return (
        <div>
            <h1 className="MainHeader">
                Residential Solar Calculator.
            </h1>
            <form>
                    <label>
                        Address:
                        <input type="text" name="Address"/>
                    </label>
                        <input type="submit" name="Submit"/>
                    
            </form>
        </div>
    );
}

export default LandingPage;
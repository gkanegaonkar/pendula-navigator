import React, { Component} from "react";
import "./index.css";
import { Menu } from "./components/Menu.js";
import { Forms } from "./components/Forms.js";

class App extends Component{
    constructor() {
        super(0);
        this.state = {
            formSteps : [
                { step:1, status: "available"},
                { step:2, status: "available"},
                { step:3, status: "available"},
                { step:4, status: "unavailable"}
            ],
            currentStep: 1,
        }
    }
    updateStep(newStep) {
        this.setState( { currentStep: newStep });
        console.log("App currentStep==", this.state.currentStep);
    }
    updateStatus(newFormSteps) {
        console.log("App newFormSteps==", newFormSteps);
        this.setState({ formSteps: Object.assign(this.state.formSteps, newFormSteps) });
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <h1> The Navigator App </h1>
                        <h3> Navigate the menu below to find Apollo </h3>
                        <img src={"../public/img/dog.png"} />
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <Menu currentStep={ this.state.currentStep } formSteps= { this.state.formSteps }
                              updateStep={ this.updateStep.bind(this) }
                        />
                    </div>
                    <div className="col-xs-10 col-xs-offset-3">
                        <Forms currentStep={ this.state.currentStep } formSteps= { this.state.formSteps }
                               updateStep={ this.updateStep.bind(this) }
                               updateStatus={ this.updateStatus.bind(this) }
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
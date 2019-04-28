import React from "react";
import { Tooltip, OverlayTrigger} from "react-bootstrap"

var formMenu = [];
export class Menu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            formSteps: props.formSteps,
            currentStep: props.currentStep
        };
    }

    onIconClick(index) {
        console.log("insideeeeeeeeeeeeeeeeee",index);
        /*var tooltip = <Tooltip id="1">What to show?</Tooltip>
        return (
            <OverlayTrigger key="info" placement="bottom" overlay={ tooltip } >
                <i className="arrow_box" rel="tooltip" title="What are you sending?" id="0"></i>
            </OverlayTrigger>
        );*/
        this.props.updateStep(index+1);
    }
    renderSteps() {
        formMenu = [];
        var currStep = this.props.currentStep;
        this.state.formSteps.map(function(step, index){
            var style = "";
            style = "fa fa-2x";
            var status = step.status;
            if (status === "available") {
                style += " fa-dot-circle-o";
            } else if (status === "unavailable") {
                style += " fa-circle";
            } else if (status === "invalid") {
                style += " fa-exclamation-circle";
            } else if (status === "completed") {
                style += " fa-check-circle";
            }
            if(step.step === currStep) {
                style += " selected";
            } else {
                style += " " + status;
            }
            formMenu.push(
                <div>
                    <a href="#" onClick={ this.onIconClick.bind(this, index) }>
                        <li key={"icon" + index}><i key={index} className={ style }/></li>
                    </a>
                    <li key={"line" + index} className={ "menu-line" } ></li>
                </div>
            );
        }, this);
    }
    render(){
        return(
            <nav className="navbar navbar-defult">
                <div className="container">
                    <div className="navbar-header">
                        <ul className="fa-ul">
                            { this.renderSteps() }
                            { formMenu }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
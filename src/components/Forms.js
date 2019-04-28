import React from "react";
//import { Button } from "react-bootstrap";

export class Forms extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentStep: props.currentStep,
            formSteps: props.formSteps,
            firstname: '',
            lastname: '',
            email:  '',
            address: '',
            accept: false
        };
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { firstname, lastname, email, address } = this.state;
        alert(`Your detail: \n 
           First name: ${firstname} \n
           Last name: ${lastname} \n
           Email: ${email} \n 
           Address: ${address} `)
    }

    handleNext() {
        let currentStep = this.state.currentStep;
        // update the formSteps state and pass it to parent
        var newFormSteps = [];
        this.state.formSteps.map(function(formStep) {
            if (formStep.step === currentStep) {
                var newStep = {};
                newStep.step = currentStep;
                // to test invalid type
                if(currentStep === 3) {
                    newStep.status = "invalid";
                } else {
                    newStep.status = "completed";
                }
                newFormSteps.push(newStep);
            } else {
                newFormSteps.push(formStep);
            }
        });
        this.props.updateStatus(newFormSteps);
        currentStep = (currentStep >= 3 )? 4: currentStep + 1;
        this.setState({ currentStep: currentStep });
        this.props.updateStep(currentStep);
    }

    handlePrev() {
        let currentStep = this.state.currentStep;
        currentStep = (currentStep <= 1) ? 1: (currentStep - 1);
        this.setState({
            currentStep: currentStep
        })
        this.props.updateStep(currentStep);
    }

    previousButton() {
        let currentStep = this.state.currentStep;
        if(currentStep !== 1){
            return (
                <button
                    className="btn btn-secondary"
                    type="button" onClick={this.handlePrev.bind(this)}>
                    Previous
                </button>
            )
        }
        return null;
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        if(currentStep <4){
            return (
                <button
                    className="btn btn-primary float-right"
                    type="button" onClick={this.handleNext.bind(this)}>
                    Next
                </button>
            )
        }
        return null;
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="textcolor">Enter form details</h2>
                <p>Step {this.state.currentStep} </p>

                <form onSubmit={this.handleSubmit.bind(this)}>

                    <Step1
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                    />
                    <Step2
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        email={this.state.email}
                    />
                    <Step3
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        address={this.state.address}
                    />
                    <Step4
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        accept={this.state.accept}
                    />
                    <br/>
                    {this.previousButton()}
                    {this.nextButton()}

                </form>
            </React.Fragment>
        );
    }
}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    return(
            <div className='form-group'>
                <label htmlFor="firstname">First Name: </label>
                <input
                    className='form-group'
                    placeholder='First Name'
                    type='text'
                    name="firstname"
                    value={props.firstname}
                    onChange={props.handleChange}
                    autoFocus
                />
                <br/>
                <label htmlFor="lastname">Last Name: </label>
                <input
                    className='form-group'
                    placeholder='Last Name'
                    type='text'
                    name="firstname"
                    value={props.lastname}
                    onChange={props.handleChange}
                />
            </div>
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return(
        <div className="form-group">
            <label htmlFor="email">Email address: </label>
            <input
                className="form-control"
                id="email"
                name="email"
                type="text"
                placeholder="Enter email"
                value={props.email}
                onChange={props.handleChange}
            />
        </div>
    );
}

function Step3(props) {
    if (props.currentStep !== 3) {
        return null
    }
    return(
        <div className="form-group">
            <label htmlFor="password">Address</label>
            <textarea
                className="form-control"
                id="address"
                name="address"
                type="textarea"
                placeholder="Enter address"
                value={props.address}
                onChange={props.handleChange}
            />
        </div>
    );
}

function Step4(props) {
    if (props.currentStep !== 4) {
        return null
    }
    return(
            <div className="form-group">
                <div className='ten columns terms'>
                    <label>By clicking "Accept" I agree all the information provided in previous steps is correct.</label>
                    <br/>
                    <label>
                        <input
                            type='checkbox'
                            //checked={(this.state.accept) ? 'checked': ''}
                            //onClick={this.handleChange}
                        />
                        <span> Accept </span>{' '}
                    </label>
                </div>
                <button
                    className="btn btn-primary"
                    type="submit" name="save">
                    Save
                </button>
            </div>
    );
}
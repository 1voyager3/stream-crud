import React, {Component} from "react";
// Field - component, reduxForm  - the same functionality as connect function
import {Field, reduxForm} from "redux-form";

class StreamForm extends Component {

    // error, touched - destruction of meta
    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }

    }

    // destruction from formProps.input, formProps.label and so on
    // meta for validate function error message
    renderInput = ({input, label, meta}) => {

        const className = `field ${meta.error && meta.touched ? 'error' : ''}`

        return (
            /*
            <input
                onChange={formProps.input.onChange}
                value={formProps.input.value}
            />
             */
            //  <input {...input} /> some new JSX syntax instead of above
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>

        );
    }
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {

        return (
            <form
                className="ui form error"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
                <Field
                    name="title"
                    component={this.renderInput}
                    label="Enter Title"
                />
                <Field
                    name="description"
                    component={this.renderInput}
                    label="Enter Description"
                />
                <button className="ui button primary">
                    Submit
                </button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = "You must enter a Title!"
    }

    if (!formValues.description) {
        errors.description = "You must enter a Description!"
    }

    return errors;
}


export default reduxForm({
    form: 'streamForm',
    validate: validate,
})(StreamForm);


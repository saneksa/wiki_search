import * as React from 'react';
import * as PropTypes from 'react/lib/ReactPropTypes';
import {Field, reduxForm, propTypes} from 'redux-form'

export class SearchForm extends React.Component {
    static propTypes = {
        ...propTypes,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool,
        form: PropTypes.string
    };

    static ENTER_KEY_CODE = 13;

    constructor(...args) {
        super(...args);

        this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    }

    render() {
        return <div>
            <label>Search wiki </label>
            <Field name="search" component="input" type="text" placeholder="Type text..." onKeyUp={this.handleOnKeyUp}/>
            <button onClick={this.props.handleSubmit} disabled={this.props.pristine || this.props.submitting}>
                Search
            </button>
        </div>
    }

    handleOnKeyUp(proxy) {
        if (proxy.keyCode == SearchForm.ENTER_KEY_CODE) {
            this.props.handleSubmit();
        }
    }
}

export const ConnectedSearchForm = reduxForm()(SearchForm);
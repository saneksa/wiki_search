import React, {PropTypes} from "react";

import {init} from './actions/utils';

export class App extends React.Component {
    static propTypes = {
        store: PropTypes.object,
        persistStore: PropTypes.any,
        persistStoreOptions: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            rehydrated: false
        }
    }

    componentWillMount() {
        this.props.persistStore(this.props.store, this.props.persistStoreOptions, () => {
            this.setState({rehydrated: true});
            this.props.store.dispatch(init())
        });
    }

    render() {
        if (this.state.rehydrated) {
            return this.props.children;
        } else {
            return <div>Loading...</div>;
        }
    }
}

export default App;
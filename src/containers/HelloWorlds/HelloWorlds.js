import * as React from 'react';
import * as PropTypes from 'react/lib/ReactPropTypes';
import {connect} from 'react-redux';
import {searchHelloWorld} from '../../actions/helloWorlds';
import * as _ from 'lodash';

export class HelloWorlds extends React.Component {
    static propTypes = {
        helloWorlds: PropTypes.arrayOf(PropTypes.object),
        fetchHelloWorlds: PropTypes.func
    };

    componentWillMount() {
        if (!this.props.helloWorlds) {
            this.props.fetchHelloWorlds();
        }
    }

    render() {
        if (this.props.helloWorlds) {
            const pageLinks = _.map(this.props.helloWorlds, pageDescription =>
                <a
                    style={{display: 'block'}}
                    key={pageDescription.fullurl}
                    href={pageDescription.fullurl}>{pageDescription.title}
                    </a>);
            return <div>{pageLinks}</div>;
        } else {
            return <div>...Fetching hello worlds</div>;
        }
    }
}

const mapStateToProps = state => ({
    helloWorlds: state.helloWorlds && state.helloWorlds.data
});

const mapDispatchToProps = dispatch => ({
    fetchHelloWorlds() {
        dispatch(searchHelloWorld());
    }
});

export const ConnectedHelloWorlds = connect(mapStateToProps, mapDispatchToProps)(HelloWorlds);
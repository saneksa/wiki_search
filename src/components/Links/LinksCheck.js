import * as React from 'react';
import * as PropTypes from 'react/lib/ReactPropTypes';
import {propTypes} from 'redux-form'
import * as _ from "lodash";
import {linkCheckToLogic, linkUncheckToLogic} from "../../actions/wikiSearch";
import {connect} from "react-redux";

export class LinksCheck extends React.Component {
    static propTypes = {
        linkCheck: PropTypes.any,
        links_c: PropTypes.func,
        links_u: PropTypes.func,
        linkUncheck: PropTypes.any
    };

    constructor(...args) {
        super(...args);

    this.click = this.click.bind(this);
    }


    render() {

        const items = [];
        items.push(<h4 key={new Date().getTime()} style={{margin: '0px',padding: '0px',
            marginLeft: '10px',marginTop: '20px'}}> Checked </h4>);
        const pageLinks = _.map(this.props.linkCheck, pageDescription =>

            <div key={pageDescription.fullurl} style={{
                position: 'relative',
                width: '450px',
                top: '10px',
                paddingTop: '15px',
                margin: '5px',
                border: '1px solid black'
            }}><br/>
                <a
                    style={{
                        position: 'absolute',
                        top: '6px',
                        left: '3px'
                    }}
                    key={pageDescription.fullurl}
                    href={pageDescription.fullurl}>{pageDescription.title}
                </a>
                <button onClick={this.click.bind(this,pageDescription)}
                        style={{
                            position: 'absolute',
                            right: '3px',
                            top: '6px'
                        }}>Uncheck
                </button>
            </div>);

        items.push(<div key="searchResults">{pageLinks}</div>);


        return (
            <div style={{float: 'left', width: '450px',marginLeft: '30px'}}> {items}</div>)
    }


    click(page) {
        this.props.links_u(page);

    }

}

const mapStateToProps = state => ({
    linkUncheck: state.linku.data,
    linkCheck: state.linkc.data
});

const mapDispatchToProps = dispatch => ({

    links_c(check_links) {
        dispatch(linkCheckToLogic(check_links));

    },

    links_u(uncheck_links) {
        dispatch(linkUncheckToLogic(uncheck_links));

    }

});

export const ConnectedLinksCheck = connect(mapStateToProps, mapDispatchToProps)(LinksCheck);
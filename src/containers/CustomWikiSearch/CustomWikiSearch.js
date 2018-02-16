import * as React from 'react';
import * as PropTypes from 'react/lib/ReactPropTypes';
import {connect} from 'react-redux';
import {ConnectedSearchForm} from '../../components/SearchForm/SearchForm';
import {searchWiki, linkUpdate, linkCheckToLogic, linkUncheckToLogic} from '../../actions/wikiSearch';
import LinksUncheck from '../../components/Links/LinksUncheck'
import LinksCheck from "../../components/Links/LinksCheck";

export class CustomWikiSearch extends React.Component {
    static propTypes = {
        searchResults: PropTypes.arrayOf(PropTypes.object),
        fetchData: PropTypes.func,
        links_c: PropTypes.func,
        links_u: PropTypes.func
    };

    constructor(...args) {
        super(...args);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    render() {
        return (
            <div style={{display: 'block'}}>
                <ConnectedSearchForm form="wikiSearch" onSubmit={this.handleSearchSubmit}/>
                <LinksUncheck links_c = {this.props.links_c} data = {this.props.linkUncheck}
                                       style={{display: 'block', marginRight: '700px'}}/>
                <LinksCheck links_u={this.props.links_u} data = {this.props.linkCheck}
                                     style={{display: 'block'}}/>
            </div>
        );
    }

    handleSearchSubmit(values) {
        if (values.search) {
            this.props.fetchData(values.search);
        }
    }
}

const mapStateToProps = state => ({
    searchResults: state.wikiSearch && state.wikiSearch.data,
    linkUncheck: state.links.linksUncheck,
    linkCheck: state.links.linksCheck
});

const mapDispatchToProps = dispatch => ({
    fetchData(text) {
        dispatch(searchWiki(text));
    },

    links_c(check_links) {
        dispatch(linkCheckToLogic(check_links));
    },

    links_u(uncheck_links) {
        dispatch(linkUncheckToLogic(uncheck_links));
    }
});

export const ConnectedWikiSearch = connect(mapStateToProps, mapDispatchToProps)(CustomWikiSearch);


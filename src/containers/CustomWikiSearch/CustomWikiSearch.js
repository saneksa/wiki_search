import * as React from 'react';
import * as PropTypes from 'react/lib/ReactPropTypes';
import {connect} from 'react-redux';
import * as _ from 'lodash';

import {ConnectedSearchForm} from '../../components/SearchForm/SearchForm';
import {searchWiki,linkUpdate} from '../../actions/wikiSearch';
import {ConnectedLinksUncheck} from '../../components/Links/LinksUncheck';
import {ConnectedLinksCheck} from '../../components/Links/LinksCheck';


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
                <ConnectedLinksUncheck style={{display: 'block', marginRight: '700px'}}/>
                <ConnectedLinksCheck style={{display: 'block'}}/>
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
    links: state.links
});

const mapDispatchToProps = dispatch => ({
    fetchData(text) {
        dispatch(searchWiki(text));
    },

    links_c(check_links) {
        dispatch(linkCheck(check_links));

    },

    links_u(uncheck_links) {
        dispatch(linkUncheck(uncheck_links));

    }

});

export const ConnectedWikiSearch = connect(mapStateToProps, mapDispatchToProps)(CustomWikiSearch);


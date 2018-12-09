import * as React from 'react';
import * as PropTypes from 'react/lib/ReactPropTypes';
import {connect} from 'react-redux';
import {ConnectedSearchForm} from '../../components/SearchForm/SearchForm';
import {searchWiki, sendToLogic} from '../../actions/wikiSearch';
import LinksBlock from '../../components/Links/LinksBlock';
import {titleCheckButton, titleUncheckButton} from '../../Const';

export class CustomWikiSearch extends React.PureComponent {
  static propTypes = {
    searchResults: PropTypes.arrayOf(PropTypes.object),
    fetchData: PropTypes.func,
    setLinks: PropTypes.func,
    linksViewed: PropTypes.arrayOf(PropTypes.object),
    linksNotViewed: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(...args) {
    super(...args);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  render() {
    return (
      <div style={{display: 'block'}}>
        <ConnectedSearchForm form="wikiSearch" onSubmit={this.handleSearchSubmit} />
        <LinksBlock
          linkClick={this.props.setLinks}
          data={this.props.linksNotViewed}
          style={{display: 'block', marginRight: '700px'}}
          title="Search result"
          titleButton={titleCheckButton}
        />
        <LinksBlock
          linkClick={this.props.setLinks}
          data={this.props.linksViewed}
          style={{display: 'block'}}
          title="Checked"
          titleButton={titleUncheckButton}
        />
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
  linksNotViewed: state.links.linksUncheck,
  linksViewed: state.links.linksCheck,
});

const mapDispatchToProps = dispatch => ({
  fetchData(text) {
    dispatch(searchWiki(text));
  },

  setLinks(links, types) {
    dispatch(sendToLogic(links, types));
  },
});

export const ConnectedWikiSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomWikiSearch);

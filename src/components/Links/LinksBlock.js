import * as React from 'react';
import * as _ from 'lodash';

export class LinksBlock extends React.Component {
  constructor(...args) {
    super(...args);
    this.clickLinks = this.clickLinks.bind(this);
  }

  render() {
    const items = [];
    items.push(
      <h4 key={this.props.title} style={{margin: '0px', padding: '0px', marginLeft: '10px', marginTop: '20px'}}>
        {this.props.title}
      </h4>
    );
    const pageLinks = _.map(this.props.data, pageDescription => (
      <div
        key={pageDescription.fullurl}
        style={{
          position: 'relative',
          width: '450px',
          top: '10px',
          paddingTop: '15px',
          margin: '5px',
          border: '1px solid black',
        }}
      >
        <br />
        <a
          style={{position: 'absolute', top: '6px', left: '3px'}}
          key={pageDescription.fullurl}
          href={pageDescription.fullurl}
        >
          {pageDescription.title}
        </a>
        <button
          onClick={() => this.clickLinks(pageDescription)}
          style={{position: 'absolute', right: '3px', top: '6px'}}
        >
          {this.props.titleButton}
        </button>
      </div>
    ));

    items.push(<div key="linksCheck">{pageLinks}</div>);

    return <div style={{float: 'left', width: '450px', marginLeft: '30px'}}> {items}</div>;
  }

  clickLinks(page) {
    this.props.linkClick(page, this.props.titleButton);
  }
}

export default LinksBlock;

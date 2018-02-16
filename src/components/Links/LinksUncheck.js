import * as React from 'react';
import * as _ from "lodash";

export class LinksUncheck extends React.Component {
    constructor(...args) {
        super(...args);
        this.click = this.click.bind(this);
    }

    render() {
        const items = [];
        items.push(<h4 key={new Date().getTime()} style={{margin: '0px',padding: '0px',
            marginLeft: '10px',marginTop: '20px'}}> Search result </h4>);
        const pageLinks = _.map(this.props.data, pageDescription =>

            <div key={pageDescription.fullurl}
                 style={{position: 'relative', width: '450px',top: '10px',
                        paddingTop: '15px', margin: '5px', border: '1px solid black'}}><br/>

                <a style={{position: 'absolute', top: '6px', left: '3px'}}
                    key={pageDescription.fullurl}
                    href={pageDescription.fullurl}>{pageDescription.title}
                </a>
                <button onClick={this.click.bind(this, pageDescription)}
                        style={{position: 'absolute', right: '3px', top: '6px'}}>
                    Check
                </button>
            </div>);

        items.push(<div key="linksUncheck">{pageLinks}</div>);

        return (
            <div style={{float: 'left', width: '450px'}}> {items}</div>)
    }

    click(page) {
        this.props.links_c(page);
    }
}

export default LinksUncheck;


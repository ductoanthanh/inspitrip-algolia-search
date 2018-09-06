import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  InstantSearch,
  Configure,
  Highlight,
  Index,
  Hits
} from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import Autosuggest from 'react-autosuggest';
import { Link } from 'react-router-dom'

const theme = {
  container: {
    position: 'relative'
  },
  input: {
    width: '100%',
    height: 51,
    padding: '10px 20px',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    border: '1px solid #c4c8d8',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
};

const App = () => (
  // <InstantSearch
  //   appId="latency"
  //   apiKey="6be0576ff61c053d5f9a3225e2a90f76"
  //   indexName="ikea"
  // >

  <InstantSearch
     apiKey="897419e2352332186eb1c5b1d25d7d07"
     appId="TYH3T0DOFV"
     indexName="autocomplete"
  >
    <AutoComplete />
    <Configure hitsPerPage={3} />
    <Index indexName="inspitrip" />
  </InstantSearch>
);

class Example extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.currentRefinement,
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value);
  };

  onSuggestionsClearRequested = () => {
    this.props.refine();
  };

  getSuggestionValue(hit) {
    return hit.title;
  }

  renderSuggestion(hit) {
    // return <Highlight attribute="name" hit={hit} tagName="mark" />;
    return (
      <Link to="/search">
        <p style={{float: 'right'}}>${hit.price}</p>
        <Highlight attribute="title" hit={hit} className="experience-name" />
      </Link>
    )
  }

  renderSectionTitle(section) {
    return section.index;
  }

  getSectionSuggestions(section) {
    return section.hits;
  }

  render() {
    const { hits } = this.props;
    const { value } = this.state;

    const inputProps = {
      placeholder: 'Search an experience...',
      onChange: this.onChange,
      value,
    };

    return (
      <Autosuggest
        suggestions={hits}
        multiSection={true}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        renderSectionTitle={this.renderSectionTitle}
        getSectionSuggestions={this.getSectionSuggestions}
        theme={theme}
        // just for development
        alwaysRenderSuggestions={false}
      />
    );
  }
}

const AutoComplete = connectAutoComplete(Example);

export default App;

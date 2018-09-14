import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  InstantSearch,
  SearchBox,
  Hits,
  HitsPerPage,
  Highlight,
  Stats,
  SortBy,
  Pagination,
  RefinementList,
  Configure,
  Index,
  connectStateResults
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
  <InstantSearch
     apiKey="897419e2352332186eb1c5b1d25d7d07"
     appId="TYH3T0DOFV"
     indexName="suggestions"
  >
    <AutoComplete />
    <Configure hitsPerPage={5} />
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

  onKeyPress = (event) => {
    if(event.key === 'Enter') {
      const hits = this.props.hits;
    }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value);
  };

  onSuggestionsClearRequested = () => {
    this.props.refine();
  };

  getSuggestionValue(hit) {
    if (hit.sortBy === 'suggestion') {
      return hit.city;
    }
    return hit.title;
  }

  renderSuggestion(hit) {
    // console.log(hit);
    if (hit.sortBy === 'suggestion') {
      return (
        <Link to={`/search`}>
          <p className="experience-name">{hit.city}</p>
        </Link>
      )
    }
    else {
      return (
        <Link to='/search'>
          <p className="experience-name">{hit.title}</p>
        </Link>
      )
    }

  }

  renderSectionTitle(section) {
    if (section.index === 'autocomplete' || section.index === 'suggestions') {
      return ''
    } else if (section.index === 'inspitrip') {
      return 'Top Hits'
    } else {
      return section.index;
    }
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
      onKeyPress: this.onKeyPress,
      value,
    };

    return (
      <div className="App">
      <header className="header center">
        <img src="https://inspitrip.imgix.net/static/assets/images/svg-icons/logo-pink.svg" />
        <div className="auto-complete">
          <h1>Auto Complete Search</h1>
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
        </div>
        {/* <SearchBox translations={{ placeholder:'Search for Experience' }} /> */}
      </header>
      <main>
        <div className="row">
          <div className="col-md-3"><Sidebar /></div>
          <div className="col-md-9">
            {hits.length > 1 && hits[1].hits.map((hit, index) => {
              return (
                <div className="" style={{width: '48%', float:'left', marginRight: '10px'}}>
                  <a href={`https://inspitrip.com/experiences/${hit.id}`}>
                    <div className="hit-image">
                      <img src={hit.background_photo} />
                    </div>
                    <div className="experience-text">
                      <div className="experience-name">
                        {/* <Highlight attribute="title" hit={hit} className="experience-name" /> */}
                        {hit.title}
                      </div>
                      <div className="experience-location">
                        {hit.place.full_name}
                      </div>
                    </div>
                    <div className="experience-footer">
                      <div className="experience-price">
                        ${hit.price}
                      </div>
                    </div>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
    );
  }
}

const Experience = ({hit}) => (
  <div className="">
    <div className="hit-image">
      <img src={hit.background_photo} />
    </div>
    <div className="experience-text">
      <div className="experience-name">
        <Highlight attribute="title" hit={hit} className="experience-name" />
      </div>
      <div className="experience-location">
        {hit.place.full_name}
      </div>
    </div>
    <div className="experience-footer">
      <div className="experience-price">
        ${hit.price}
      </div>
    </div>
  </div>
)

const Sidebar = () => (
  <div>
    <h5>Is Instant Booking</h5>
    <RefinementList attribute="is_instant_booking" />
    <h5>Is Most Requested</h5>
    <RefinementList attribute="is_most_requested" />
  </div>
);

const Content = () => (
  <div>
    <div className="info">
      <SortBy
        defaultRefinement="inspitrip"
        items={[
          {value:'inspitrip', label:'Most Relevant'},
          {value:'inspitrip_price_asc', label:'Lowest Price'},
          {value:'inspitrip_price_dsc', label:'Highest Price'}
        ]}
      />
      <Stats />
    </div>
    <HitsPerPage
      defaultRefinement={10}
      items={[
        { value: 5, label: 'Show 5 hits' },
        { value: 10, label: 'Show 10 hits' },
      ]}
    />
    <Hits hitComponent={Experience} />
    <div className="pagination">
      <Pagination showLast paddings={4} />
    </div>
  </div>
)

const AutoComplete = connectAutoComplete(Example);

export default App;

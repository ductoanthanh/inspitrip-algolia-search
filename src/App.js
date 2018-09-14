import React, { Component } from 'react';
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
  connectAutoComplete,
  connectStateResults
} from 'react-instantsearch-dom';
import Autosuggest from 'react-autosuggest';
import AutoComplete from './AutoComplete';

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

class App extends Component {
  render() {
    return (
      <div className="App">
       <InstantSearch
          apiKey="897419e2352332186eb1c5b1d25d7d07"
          appId="TYH3T0DOFV"
          indexName="inspitrip"
       >
          <header className="header center">
            <img src="https://inspitrip.imgix.net/static/assets/images/svg-icons/logo-pink.svg" />
            <div className="auto-complete">
              <h1>Auto Complete Search</h1>
              <AutoComplete />
            </div>
            {/* <SearchBox translations={{ placeholder:'Search for Experience' }} /> */}
          </header>

          <main>
            <div className="row">
              <div className="col-md-3"><Sidebar /></div>
              <div className="col-md-9"><Content /></div>
            </div>
          </main>
       </InstantSearch>
      </div>
    );
  }
}

export default App;

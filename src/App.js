import React, { Component } from 'react';
import { 
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Stats,
  SortBy,
  Pagination,
  RefinementList
} from 'react-instantsearch-dom';

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
          apiKey="d37fb192eb11fac55adc80b9402a247d"
          appId="H2X59IQ8XE"
          indexName="inspitrip"
       >
          <header className="header center">
            <img src="https://inspitrip.imgix.net/static/assets/images/svg-icons/logo-pink.svg" /> 
            <SearchBox translations={{placeholder:'Search for Experience'}} />
          </header>

          <main>
            <div class="row">
              <div class="col-md-3"><Sidebar /></div>
              <div class="col-md-9"><Content /></div>
            </div>
          </main>
       </InstantSearch>
      </div>
    );
  }
}

export default App;

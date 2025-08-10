import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import algoliaClient from '../../lib/algolia';

const Hit = ({ hit }) => {
    return (
        <div>
            <h2>{hit.name}</h2>
            <p>{hit.description}</p>
        </div>
    );
};

const Search = () => {
    return (
        <InstantSearch searchClient={algoliaClient} indexName="products">
            <SearchBox />
            <Hits hitComponent={Hit} />
        </InstantSearch>
    );
};

export default Search;

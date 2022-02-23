import { SearchBar } from '@yext/answers-react-components';
import { VerticalResults, StandardCard } from '@yext/answers-react-components';


function ParksPage() {
    return (
        <div className="m-6">
        <SearchBar />
        <VerticalResults
            CardComponent={StandardCard}
        />
        </div>
    )
}

export default ParksPage;
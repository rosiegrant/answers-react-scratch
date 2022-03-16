import { LocationBias, SearchBar } from '@yext/answers-react-components';
import { VerticalResults, StandardCard } from '@yext/answers-react-components';
import { Filters } from '@yext/answers-react-components';


function ParksPage() {
    return (
        <div className="m-6">
            <input placeholder="hello" className="placeholder:italic placeholder:text-yellow-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"></input>
            <div className="flex">
                <Filters.StaticFilters searchOnChange={false}>
                    <Filters.FilterGroup>
                        <Filters.CheckboxOption
                            key="Vaccinated"
                            value="true"
                            label="Vaccinated"
                            fieldId="fullyVaccinatedStaff"></Filters.CheckboxOption>
                    </Filters.FilterGroup>
                </Filters.StaticFilters>
                <SearchBar />
            </div>

            <div className="flex">
                <Filters.Facets searchOnChange={true} className=''>
                    {facets => facets.map((f, i) => {
                        if (f.options.length === 0) {
                            return null;
                        }

                        return (
                            <div key={f.fieldId} className='md:w-40 mr-10'>
                                <Filters.FilterGroup>
                                    {/* <div>{f.displayName}</div> */}
                                    <Filters.CollapsibleLabel label={f.displayName} />
                                    <Filters.CollapsibleSection>
                                        {/* <Filters.SearchInput /> */}
                                        {f.options.map(o =>
                                            <Filters.CheckboxOption
                                                key={o.displayName}
                                                value={o.value}
                                                fieldId={f.fieldId}
                                            />
                                        )}
                                    </Filters.CollapsibleSection>
                                    {/* {(i < facets.length - 1)} */}
                                </Filters.FilterGroup>
                            </div>
                        );
                    })}
                </Filters.Facets>
                <VerticalResults
                    CardComponent={StandardCard}
                />
            </div>
            <LocationBias />

        </div>
    )
}

export default ParksPage;
import { AppliedFilters, LocationBias, SearchBar } from '@yext/answers-react-components';
import { VerticalResults, StandardCard } from '@yext/answers-react-components';
import { Filters } from '@yext/answers-react-components';
import { Result, useAnswersState } from '@yext/answers-headless-react';
import { Fragment } from 'react';


function WomenInTech() {

    const verticalResults = useAnswersState(state => state.vertical.results) || [];

    //var myCard = <StandardCard result={verticalResults} customCssClasses={{ container: "justify-start" }} />

    return (
        <div className="m-6">
            <div className="flex items-center ml-6">
                <SearchBar customCssClasses={{ container: "w-full mb-0 mr-6" }} />
            </div>

            <div className="flex m-6">

                <Filters.Facets searchOnChange={true} className='mr-8 text-left min-w-[12rem]'>
                    {facets => facets.map((f, i) => {
                        if (f.options.length === 0) {
                            return null;
                        }

                        if (f.fieldId == "c_category") {
                            return (
                                <Fragment key={f.fieldId}>
                                    <Filters.HierarchicalFacet facet={f} /> <div className="w-full h-px bg-gray-200 my-4"></div>
                                    {(i < facets.length - 1)}
                                </Fragment>
                            )
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
                <div>
                    <AppliedFilters />
                    <VerticalResults
                        customCssClasses={{ results: "text-left grid grid-cols-4 gap-4 " }}
                        //CardComponent={<StandardCard customCssClasses= {{container: "justify-start"}}/>}
                        CardComponent={StandardCard}

                    />
                </div>
            </div>
            <LocationBias />

        </div>
    )
}

export default WomenInTech;
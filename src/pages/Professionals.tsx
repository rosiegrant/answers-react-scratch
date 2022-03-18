import { AppliedFilters, LocationBias, SearchBar } from '@yext/answers-react-components';
import { VerticalResults, StandardCard } from '@yext/answers-react-components';
import { Filters } from '@yext/answers-react-components';
import { Result, useAnswersState } from '@yext/answers-headless-react';
import { Fragment } from 'react';
import usePageSetupEffect from '../hooks/defaultInitialSearch.tsx';
import { applyFieldMappings } from '@yext/answers-react-components/lib/components/utils/applyFieldMappings';
import { OfficeBuildingIcon, UsersIcon } from '@heroicons/react/solid';
import Navigation from '../components/Navigation.tsx';
import { PersonCard } from '../cards/PersonCard.tsx';
//^something i needed to have done when i did create-react-app, you live and you learn


function Professionals() {

    const verticalResults = useAnswersState(state => state.vertical.results) || [""];
    usePageSetupEffect("professionals");

    //var myCard = <StandardCard result={verticalResults} customCssClasses={{ container: "flex flex-col justify-start rounded-lg mb-4 p-4 shadow-lg bg-white" }} />


    const tabs = [
        { name: 'Home', href: '/', icon: OfficeBuildingIcon, current: false },
        { name: 'Professionals', href: '/professionals', icon: UsersIcon, current: true },
    ]

    return (
        <div className="p-6">
            <div className="ml-6">
                <SearchBar customCssClasses={{ container: "w-full mb-0 mr-6" }} />
                <Navigation tabs={tabs} />
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
                    {verticalResults.length === 0 &&
                        <div>no results darn </div>
                    }
                    <VerticalResults
                        displayAllOnNoResults={false}
                        customCssClasses={{ results: "text-left grid grid-cols-4 gap-6 ", container: "pt-6" }}
                        // CardComponent={<StandardCard customCssClasses= {{container: "justify-start"}}/>}
                        //CardComponent={StandardCard}
                        CardComponent={
                            ({ result }) => <PersonCard
                                result={result}
                                //cssCompositionMethod={"replace"}
                                //customCssClasses={{ container: "flex flex-col justify-start rounded-lg mb-4 p-4 shadow-lg bg-white hover:shadow-xl hover:cursor-pointer", header: "font-medium" }}
                                fieldMappings={{
                                    title: {
                                        apiName: "name",
                                        mappingType: "FIELD"
                                    }
                                }}
                            />
                        }

                    />
                </div>
            </div>
            <LocationBias />

        </div>
    )
}

export default Professionals;
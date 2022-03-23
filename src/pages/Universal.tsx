import { OfficeBuildingIcon, UsersIcon } from "@heroicons/react/solid";
import { useAnswersState } from "@yext/answers-headless-react";
import { SearchBar } from "@yext/answers-react-components";
import { UniversalResults } from "@yext/answers-react-components";
import { StandardCard } from "@yext/answers-react-components";
import { StandardSection } from "@yext/answers-react-components";
import Navigation from "../components/Navigation.tsx";
// import { SectionHeader } from "@yext/answers-react-components";


function Universal() {

    const results = useAnswersState(state => state.universal.verticals) || [""];

    //var myCard = <StandardCard result={verticalResults} customCssClasses={{ container: "flex flex-col justify-start rounded-lg mb-4 p-4 shadow-lg bg-white" }} />

    const tabs = [
        { name: 'Home', href: '/', icon: OfficeBuildingIcon, current: true },
        { name: 'Professionals', href: '/professionals', icon: UsersIcon, current: false },
    ]

    return (
        <div className="p-6">
            <div className="ml-6">
                <SearchBar customCssClasses={{ container: "w-full mb-0 mr-6" }} />
                <Navigation tabs={tabs} />
            </div>


            {results.length === 0 &&
                <div>no results darn </div>
            }
            <UniversalResults
                customCssClasses={{ container: "text-left" }}
                // CardComponent={<StandardCard customCssClasses= {{container: "justify-start"}}/>}
                //CardComponent={StandardCard}
                showAppliedFilters={true}
                verticalConfigMap={{
                    'professionals': {
                        CardComponent: ({ result }) => <StandardCard result={result}
                            //cssCompositionMethod={"replace"}
                            customCssClasses={{ container: "flex flex-col justify-start rounded-lg mb-4 p-4 shadow-sm bg-white", header: "font-medium" }}
                        // fieldMappings={{
                        //     title: {
                        //         apiName: "name",
                        //         mappingType: "FIELD"
                        //     }
                        // }}
                        />,
                        label: "Bad A** Women",
                        SectionComponent: ({ results }) =>
                            <StandardSection
                                results={results}
                                verticalKey="professionals"
                                CardComponent={({ result }) => <StandardCard
                                    result={result}
                                    // cssCompositionMethod={"replace"}
                                    customCssClasses={{ container: "flex flex-col justify-start rounded-lg mb-4 p-4 shadow-sm bg-white", header: "font-medium" }}
                                    fieldMappings={{
                                        title: {
                                            apiName: "name",
                                            mappingType: "FIELD"
                                        }
                                    }}
                                />}
                            // header={<SectionHeader label={""} verticalKey={""} />}
                            />
                    }
                }}

            />

        </div>
    )
}

export default Universal;
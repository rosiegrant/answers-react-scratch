// import { useCardAnalytics } from '../../hooks/useCardAnalytics';
// import { CompositionMethod, useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { Result } from '@yext/answers-headless-react';
import get from 'lodash/get';

export interface CardProps {
    /** The result data provided to the card for rendering. */
    result: Result,
}

// validation functions
type InferTypeGuard<TypeGuard> = TypeGuard extends (data: any) => data is infer Type ? Type : never;


export type TypeGuardRecord = Record<string, (data: any) => boolean>;

export type ValidatedData<TypeGuards extends TypeGuardRecord> = Partial<{
    [Property in keyof TypeGuards]: InferTypeGuard<TypeGuards[Property]>
}>;

export function isString(data: any): data is string {
    return typeof data === 'string';
}

export function validateData<TypeGuards extends TypeGuardRecord>(
    data: any,
    typeGuards: TypeGuards
): ValidatedData<TypeGuards> {
    const validatedData: ValidatedData<TypeGuards> = {};

    Object.entries(typeGuards).forEach(([key, typeCheck]) => {
        if (typeCheck(data[key])) {
            validatedData[key as keyof TypeGuards] = data[key];
        } else {
            console.warn(`The validation for the key: ${key} failed, so the data was omitted.`);
        }
    });

    return validatedData;
}

//end validation functions

/**
 * Collects data based on the provided fields mappings.
 *
 * @examle
 * Suppose rawData is:
 * {
 *    faq: {
 *      question: 'Which AI search platform should we leverage?'
 *    }
 * }
 * And the fieldMappings is:
 * {
 *    question: {
 *      mappingType: 'FIELD',
 *      apiName: 'faq.question,
 *    },
 *    answer: {
 *      mappingType: 'CONSTANT',
 *      value: 'Yext'
 *    }
 * }
 * The function will return:
 * {
 *    question: 'Which AI search platform should we leverage?',
 *    answer: 'Yext'
 *  }
 *
 * @param rawData - The rawData from an {@link Result}
 * @param fieldMappings - Indicates where data is located within the rawData field
 * @returns An object of fields to data
 */
export function applyFieldMappings(
    rawData: Record<string, unknown>,
    fieldMappings: Partial<Record<string, FieldData>>,
): Record<string, any> {

    if (!fieldMappings) {
        return {};
    }

    return Object.entries(fieldMappings)
        .reduce((acc: Record<string, any>, [field, mapping]) => {
            if (!mapping) {
                return acc;
            }
            if (mapping.mappingType === 'CONSTANT') {
                acc[field] = mapping.value;
            } else {
                acc[field] = applyFieldDataPath(rawData, mapping);
            }
            return acc;
        }, {});
}

/**
 * Indicates either a constant field data value, or a field data mapping.
 *
 * @public
 */
export type FieldData = FieldDataConstant | FieldDataPath;

function applyFieldDataPath(data: any, fieldMap: FieldDataPath): any {
    if (!Array.isArray(fieldMap.apiName)) {
        return get(data, fieldMap.apiName);
    }
    const apiNameWithData = fieldMap.apiName.find(apiName => get(data, apiName));
    return apiNameWithData
        ? get(data, apiNameWithData)
        : undefined;
}

/**
 * Indicates a field should equal a constant value. Ignores the API response.
 *
 * @public
 */
export type FieldDataConstant = {
    /** Indicates that the field data is constant. */
    mappingType: 'CONSTANT',
    /** The constant field data value. */
    value: string
};

/**
 * Denotes the path to the field data on the Result's raw dadta.
 *
 * @public
 */
export type FieldDataPath = {
    /** Indicates that the field data is mapped from the Result's raw data */
    mappingType: 'FIELD',
    /** The api name which denotes the path to the field data.
     *
     * @remarks
     * The path is a string separated by periods '.'.
     * An array may also be supplied to denote fallbacks.
     *
     * @example
     * A result's rawData may contain the following object:
     * ```
     * {
     *    title: {
     *       fullName: 'Yext Answers'
     *       subtitle: 'An AI Search Platform'
     *    }
     * }
     * ```
     * To indicate the subtitle, the apiName would be 'title.subtitle'.
     * Fallbacks could be indicated with an array such as:
     * `['title.fullName', 'title.subtitle']`
     * In this example, if the title is not present, it will fallback to the subtitle.
    */
    apiName: string | string[]
};

/**
 * Props for a StandardCard.
 *
 * @public
 */
export interface StandardCardProps extends CardProps {
    /** Whether or not to show an ordinal for numbering the card. */
    showOrdinal?: boolean,
    /** Custom mappings for the data fields used in the card. */
    fieldMappings?: {
        title?: FieldData,
        description?: FieldData,
        cta1?: FieldData,
        cta2?: FieldData,
        photoGallery?: FieldData
    },
    /** Whether or not to show thumbs up/down buttons to provide feedback on the result card */
    showFeedbackButtons?: boolean,
    /** CSS classes for customizing the component styling. */
    customCssClasses?: StandardCardCssClasses,
}

const defaultFieldMappings: Record<string, FieldData> = {
    title: {
        mappingType: 'FIELD',
        apiName: 'name'
    },
    description: {
        mappingType: 'FIELD',
        apiName: 'description'
    },
    photoGallery: {
        mappingType: 'FIELD',
        apiName: 'photoGallery'
    },
    cta1: {
        mappingType: 'FIELD',
        apiName: 'c_primaryCTA'
    },
    cta2: {
        mappingType: 'FIELD',
        apiName: 'c_secondaryCTA'
    },
};

/**
 * The CSS class interface used for {@link StandardCard}.
 *
 * @public
 */
export interface StandardCardCssClasses {
    container?: string,
    header?: string,
    body?: string,
    descriptionContainer?: string,
    ctaContainer?: string,
    cta1?: string,
    cta2?: string,
    ordinal?: string,
    title?: string,
    titleLink?: string
}

const builtInCssClasses: StandardCardCssClasses = {
    container: "flex flex-col justify-start rounded-lg shadow-lg bg-white hover:shadow-xl hover:cursor-pointer",
    header: 'flex text-gray-800 font-medium',
    body: 'flex flex-col justify-end pt-2.5 text-base',
    descriptionContainer: 'w-full',
    ctaContainer: 'flex flex-col justify-end ml-4 mt-4',
    cta1: 'min-w-max bg-primary-600 text-white font-medium rounded-lg py-2 px-5 shadow',
    cta2: 'min-w-max bg-white text-primary-600 font-medium rounded-lg py-2 px-5 mt-2 shadow',
    ordinal: 'mr-1.5 text-lg font-medium',
    title: 'text-lg font-medium',
    titleLink: 'text-lg font-medium text-primary-600 cursor-pointer hover:underline focus:underline',
};

export interface CtaData {
    label: string,
    link: string,
    linkType: string
}

function isCtaData(data: unknown): data is CtaData {
    if (typeof data !== 'object' || data === null) {
        return false;
    }
    const expectedKeys = ['label', 'link', 'linkType'];
    return expectedKeys.every(key => {
        return key in data;
    });
}

/**
 * This Component renders the base result card.
 *
 * @public
 *
 * @param props - An object containing the result itself and any additional information needed
 *                to render the card
 * @returns A React element for the result card
 */
export function PersonCard(props: StandardCardProps): JSX.Element {
    const {
        fieldMappings: customFieldMappings,
        showOrdinal,
        result
    } = props;
    const cssClasses = builtInCssClasses //useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
    // const reportAnalyticsEvent = useCardAnalytics();

    const transformedFieldData = applyFieldMappings(result.rawData, {
        ...defaultFieldMappings,
        ...customFieldMappings
    });

    const data = transformedFieldData
    // validateData(transformedFieldData, {
    //     title: isString,
    //     description: isString,
    //     cta1: isCtaData,
    //     cta2: isCtaData
    //     photoGallery
    // });

    // TODO (cea2aj) We need to handle the various linkType so these CTAs are clickable
    function renderCTAs(cta1?: CtaData, cta2?: CtaData) {
        const onClick = () => {
            //     reportAnalyticsEvent(result, 'CTA_CLICK');
        };
        return (<>
            {(cta1 ?? cta2) &&
                <div className={cssClasses.ctaContainer}>
                    {cta1 && <button className={cssClasses.cta1} onClick={onClick}>{cta1.label}</button>}
                    {cta2 && <button className={cssClasses.cta2} onClick={onClick}>{cta2.label}</button>}
                </div>
            }
        </>);
    }

    // TODO (cea2aj) Update this to render the ordinal once we get mocks from UX
    function renderOrdinal(_index: number) {
        // return (
        //   <div className={cssClasses.ordinal}>{_index}</div>
        // );
        return null;
    }

    function renderTitle(title: string) {
        // const onClick = () => {
        //     reportAnalyticsEvent(result, 'TITLE_CLICK');
        // };
        return (
            result.link
                ? <a href={result.link} className={cssClasses.titleLink} onClick={onClick}>{title}</a>
                : <div className={cssClasses.title}>{title}</div>
        );
    }

    // const onClickFeedbackButton = (feedbackType: FeedbackType) => {
    //     reportAnalyticsEvent(result, feedbackType);
    // };

    return (
        <div className={cssClasses.container}>
            {(data.photoGallery && data.photoGallery[0] && data.photoGallery[0].image.url) &&
                <div>
                    <img className="rounded-t-lg" style={{ width: "-webkit-fill-available" }} src={data.photoGallery[0].image.url}></img>
                </div>
            }
            <div className="p-4">
                <div className={cssClasses.header}>
                    {showOrdinal && result.index && renderOrdinal(result.index)}
                    {data.title && renderTitle(data.title)}
                </div>
                {(data.description ?? data.cta1 ?? data.cta2) &&
                    <div className={cssClasses.body}>
                        {data.description &&
                            <div className={cssClasses.descriptionContainer}>
                                <span>{data.description}</span>
                            </div>}
                        {renderCTAs(data.cta1, data.cta2)}
                    </div>
                }
            </div>

        </div>
    );
}
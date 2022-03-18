import { useLayoutEffect } from "react";
import { AnswersActions, useAnswersActions, SearchIntent } from "@yext/answers-headless-react";


const defaultGeolocationOptions: PositionOptions = {
  enableHighAccuracy: false,
  timeout: 6000,
  maximumAge: 300000,
};

/**
 * If the provided search intents include a 'NEAR_ME' intent and there's no existing
 * user's location in state, retrieve and store user's location in headless state.
 */
async function updateLocationIfNeeded(
  answersActions: AnswersActions,
  intents: SearchIntent[],
  geolocationOptions?: PositionOptions
) {
  if (intents.includes(SearchIntent.NearMe) && !answersActions.state.location.userLocation) {
    try {
      const position = await getUserLocation(geolocationOptions);
      answersActions.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (e) {
      console.error(e);
    }
  }
}

/**
 * Executes a universal/vertical search
 */
async function executeSearch(answersActions: AnswersActions, isVertical: boolean) {
  isVertical
    ? answersActions.executeVerticalQuery()
    : answersActions.executeUniversalQuery();
}

/**
 * Get search intents of the current query stored in headless using autocomplete request.
 */
async function getSearchIntents(answersActions: AnswersActions, isVertical: boolean) {
  const results = isVertical
    ? await answersActions.executeVerticalAutocomplete()
    : await answersActions.executeUniversalAutocomplete();
  return results?.inputIntents;
}

/**
 * Retrieves user's location using nagivator.geolocation API
 */
async function getUserLocation(geolocationOptions?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        err => {
          console.error('Error occured using geolocation API. Unable to determine user\'s location.');
          reject(err);
        },
        { ...defaultGeolocationOptions, ...geolocationOptions }
      );
    } else {
      reject('No access to geolocation API. Unable to determine user\'s location.');
    }
  });
}

/**
 * Sets up the state for a page
 * @param verticalKey - The verticalKey associated with the page, or undefined for universal pages
 */
export default function usePageSetupEffect(verticalKey?: string) {
  const answersActions = useAnswersActions();
  useLayoutEffect(() => {
    const stateToClear = {
      filters: {},
      universal: {},
      vertical: {}
    }
    answersActions.setState({
      ...answersActions.state,
      ...stateToClear
    });
    verticalKey
      ? answersActions.setVertical(verticalKey)
      : answersActions.setUniversal();
    const executeQuery = async () => {
      let searchIntents: SearchIntent[] = [];
      // if (!answersActions.state.location.userLocation) {
      //   searchIntents = await getSearchIntents(answersActions, !!verticalKey) || [];
      //   await updateLocationIfNeeded(answersActions, searchIntents);
      // }
      executeSearch(answersActions, !!verticalKey);
    };
    executeQuery();
  }, [answersActions, verticalKey]);
}
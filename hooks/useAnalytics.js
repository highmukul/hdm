import { useEffect } from 'react';
import { analytics } from '../firebase/config';
import { logEvent } from 'firebase/analytics';

export const useAnalytics = () => {
    const trackEvent = (eventName, eventParams) => {
        if (analytics) {
            logEvent(analytics, eventName, eventParams);
        }
    };

    return { trackEvent };
};

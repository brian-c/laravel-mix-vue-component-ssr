// All components that can be instantiated on a page.
// This is used by the SSR function as well as the browser entry.

export default {
    'bc-counter': () => import('./counter'),
};

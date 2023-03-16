import { BsSortAlphaDownAlt, BsSortAlphaDown, BsSortDownAlt, BsSortDown } from 'react-icons/bs';

export const sortOptions = {
    titleAZ: {
        title: 'Sort by title A-Z',
        fn: (a, b) => a.title.localeCompare(b.title),
        icon: BsSortAlphaDown,
    },
    titleZA: {
        title: 'Sort by title Z-A',
        fn: (a, b) => b.title.localeCompare(a.title),
        icon: BsSortAlphaDownAlt,
    },
    lengthAscending: {
        title: 'Sort by shortest first',
        fn: (a, b) => a.items.length - b.items.length,
        icon: BsSortDownAlt,
    },
    lengthDescending: {
        title: 'Sort by longest first',
        fn: (a, b) => b.items.length - a.items.length,
        icon: BsSortDown,
    },
};
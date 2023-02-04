export const sortOptions = {
    titleAZ: {
        title: 'Sort by title A-Z',
        fn: (a,b) => a.title.localeCompare(b.title)
    },
    titleZA: {
        title: 'Sort by title Z-A',
        fn: (a,b) => b.title.localeCompare(a.title)
    },
    lengthAscending: {
        title: 'Sort by shortest first',
        fn: (a,b) => a.itemCount - b.itemCount
    },
    lengthDescending: {
        title: 'Sort by longest first',
        fn: (a,b) => b.itemCount - a.itemCount
    },
};
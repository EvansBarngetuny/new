import {getFilteredOrderedAndLimitedCollection} from "./api";

const DATA = {
    COLLECTIONS: {
        POSTS: 'posts',
    },
    SUB_COLLECTIONS: {
        COMMENTS: 'comments',
    },
    FIELDS: {
        OWNER_ID: 'ownerID',
        TIMESTAMP: 'timestamp',
        IN_FAVOURITES: 'inFavourites',
    }
}

const OPERATORS = {
    EQUAL: '==',
    ARRAY_CONTAINS: 'array-contains',

}

const DIRECTION = {
    DESCENDING: 'desc',
    ASCENDING: 'asc',
}

export function getPostsByOwner(ownerId, optionalLimit) {
    return getFilteredOrderedAndLimitedCollection(
        DATA.COLLECTIONS.POSTS,
        DATA.FIELDS.OWNER_ID,
        OPERATORS.EQUAL,
        ownerId,
        DATA.FIELDS.TIMESTAMP,
        DIRECTION.DESCENDING,
        optionalLimit
        );
}

export function getUserFavouritePosts(userId, optionalLimit) {
    return getFilteredOrderedAndLimitedCollection(
        DATA.COLLECTIONS.POSTS,
        DATA.FIELDS.IN_FAVOURITES,
        OPERATORS.ARRAY_CONTAINS,
        userId,
        DATA.FIELDS.TIMESTAMP,
        DIRECTION.DESCENDING,
        optionalLimit
    )
}

export function parseDataOnSnapshot(fetchData, setIsLoading, setPosts) {
    setIsLoading(true)
    const unsubscribe = fetchData()
        .onSnapshot(snapshot => {
            setIsLoading(false);
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
        });

    return () => {
        unsubscribe()
    }
}
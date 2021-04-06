import {
    clearSubCollection,
    deleteDocument,
    deleteDocumentInSubCollection, getDocumentFromCollection,
    getFilteredOrderedAndLimitedCollection,
    updateDocument,
    updateDocumentInSubCollection
} from "./api";
import admin from "firebase";

const DATA = {
    COLLECTIONS: {
        POSTS: 'posts',
        USERS: 'users',
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

export function likePost(postID, userID) {
    const data = {
        likes: admin.firestore.FieldValue.arrayUnion(userID)
    };
    updateDocument(DATA.COLLECTIONS.POSTS, postID, data)
        .catch(err => console.log(err.message));
}

export function unlikePost(postID, userID) {
    const data = {
        likes: admin.firestore.FieldValue.arrayRemove(userID)
    };
    updateDocument(DATA.COLLECTIONS.POSTS, postID, data)
        .catch(err => console.log(err.message));
}

export function addToFavourites(postID, userID) {
    const data = {
        inFavourites: admin.firestore.FieldValue.arrayUnion(userID)
    };
    updateDocument(DATA.COLLECTIONS.POSTS, postID, data)
        .catch(err => console.log(err.message));
}

export function removeFromFavourites(postID, userID) {
    const data = {
        inFavourites: admin.firestore.FieldValue.arrayRemove(userID)
    };
    updateDocument(DATA.COLLECTIONS.POSTS, postID, data)
        .catch(err => console.log(err.message));
}

export function getPostById(postID) {
    return getDocumentFromCollection(DATA.COLLECTIONS.POSTS, postID);
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
export function deletePost(postID) {
    deleteDocument(DATA.COLLECTIONS.POSTS, postID)
        .catch(err => console.log(err.message));

    //need to manually iterate through the sub-collection 'comments'
    //and delete every item in order to remove the entire collection
    //otherwise it remains there even after the post is deleted
    clearSubCollection(
        DATA.COLLECTIONS.POSTS,
        postID,
        DATA.SUB_COLLECTIONS.COMMENTS,
    );
}
export function editPost(postID, newCaption, toggleEditPost) {
    const data = {content: newCaption};
    updateDocument(
        'posts',
        postID,
        data
    )
        .then(() => toggleEditPost())
        .catch(err => console.log(err))
}

export function editComment(postID, newCaption, toggleEditPost, commentID) {
    const data = {content: newCaption};
    updateDocumentInSubCollection(
        DATA.COLLECTIONS.POSTS,
        postID,
        DATA.SUB_COLLECTIONS.COMMENTS,
        commentID,
        data
    )
        .then(() => toggleEditPost())
        .catch(err => console.log(err))
}

export function deleteComment(postID, commentID) {
    deleteDocumentInSubCollection(
        DATA.COLLECTIONS.POSTS, postID,
        DATA.SUB_COLLECTIONS.COMMENTS,
        commentID
    )
        .catch(err => console.log(err));
}

export function editDescription(userID, newDescription, toggleEditDescription) {
    const data = {description: newDescription};
    updateDocument(
        DATA.COLLECTIONS.USERS,
        userID,
        data
    )
        .then(() => toggleEditDescription())
        .catch(err => console.log(err))
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
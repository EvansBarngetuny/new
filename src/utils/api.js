import {db} from "../firebase";

export function updateDocument(collectionPath, docId, data) {
    return db.collection(collectionPath)
        .doc(docId)
        .update(data);
}

export function deleteDocument(collectionPath, docId) {
    return db.collection(collectionPath)
        .doc(docId)
        .delete();
}

export function clearSubCollection(rootCollection, postID, subCollection) {
    const ref = db.collection(rootCollection)
        .doc(postID)
        .collection(subCollection);

    ref.onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
            ref
                .doc(doc.id)
                .delete()
                .catch(err => console.log(err.message))
        })
    });
}

export function addDocumentToSubCollection(rootCollection, postID, subCollection, data) {
    return db.collection(rootCollection)
        .doc(postID)
        .collection(subCollection)
        .add(data);
}

export function updateDocumentInSubCollection(rootCollection, rootDocId, subCollection, targetDocId, data) {
    return db.collection(rootCollection)
        .doc(rootDocId)
        .collection(subCollection)
        .doc(targetDocId)
        .update(data);
}

export function deleteDocumentInSubCollection(rootCollection, rootDocId, subCollection, targetDocId) {
    return db.collection(rootCollection)
        .doc(rootDocId)
        .collection(subCollection)
        .doc(targetDocId)
        .delete();
}

export function getFilteredOrderedAndLimitedCollection(collectionPath, fieldPath, opStr, value, orderBy, direction, limit) {
    return db.collection(collectionPath)
        .where(fieldPath, opStr, value)
        .orderBy(orderBy, direction)
        .limit(limit);
}

export function getDocumentFromCollection(collectionPath, targetDocId) {
    return db.collection(collectionPath)
        .doc(targetDocId)
        .get()
}
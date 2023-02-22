import React, { useEffect, useState } from 'react';
import { collection, deleteField, getDocs, onSnapshot, orderBy, query, updateDoc, doc, deleteDoc } from "firebase/firestore";
import db from '../db';
import { Link } from 'react-router-dom';
import AddJournal from './AddJournal';

export default function Journal() {
    const [entries, setEntries] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        // const getData = async () => {
        //     const querySnapshot = await getDocs(collection(db, "journal-entries"));
        //     console.log(querySnapshot.docs)
        //     querySnapshot.forEach((doc) => {
        //         // doc.data() is never undefined for query doc snapshots
        //         console.log(doc.id, " => ", doc.data());
        //     });
        // }
        // getData();

        // getDocs(collection(db, 'journal-entries')).then(
        //     snapshot => {
        //         // snapshot.forEach(doc => {
        //         //     console.log(doc.data())
        //         // })
        //         setEntries(snapshot.docs);
        //         setIsLoading(false);
        //     },
        //     error => {
        //         console.log(error);
        //         setIsLoading(false);
        //         setHasError(true);
        //     }
        // )

        const entriesQuery = query(collection(db, 'journal-entries'),
        orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(entriesQuery,
            snapshot => {
                // snapshot.forEach(doc => {
                //     console.log(doc.data())
                // })
                setEntries(snapshot.docs);
                setIsLoading(false);
            },
            error => {
                console.log(error);
                setIsLoading(false);
                setHasError(true);
            }
        )

        return () => unsubscribe();
    }, [])

    if (isLoading) {
        return <p>loading...</p>
    }

    if (hasError) {
        return <p>Has error!</p>
    }


    const deleteItem =(id) => {
        console.log('deleting');
        const entriesRef = doc(db, 'journal-entries', id);
        deleteDoc(doc(db, 'journal-entries', id)).then(setEntries([]));
        // updateDoc(entriesRef, {
        //     entry: deleteField()
        // }).then(setEntries([]));
        //console.log('Docoument written with ID:', docRef.id);
    }

    return (
        <div>
            <h1>Journal Entries</h1>
            <AddJournal />
            {entries.map((entry) => {
                return (
                    <div key={entry.id}>
                        <p>
                            {entry.data().entry}
                            <span>
                                <Link to={`/journal/${entry.id}`}>
                                    View
                                </Link>
                                <button onClick={()=> deleteItem(entry.id)}>Delete</button>
                            </span>
                        </p>
                        <hr />
                    </div>
                )
            })}
        </div>
    );
}















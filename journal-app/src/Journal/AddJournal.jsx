import { addDoc } from 'firebase/firestore';
import React from 'react';
import {useState} from 'react';
import db from '../db';
import { collection, getDocs, onSnapshot } from "firebase/firestore";

const AddJournal = () => {
    const [entry, setEntry] = useState('');

    const submitForm =(e) => {
        e.preventDefault();
        console.log('submit');
        const entriesRef = collection(db, 'journal-entries');
        addDoc(entriesRef, {
            entry,
            createdAt: new Date()
        }).then(setEntry(''));
        //console.log('Docoument written with ID:', docRef.id);
    }
  return (
    <div>
        <h2>
            Add Journal Entry
        </h2>
        <form onSubmit={submitForm}>
            <label htmlFor='entry-input'>Entry:</label>
            <textarea id='entry-input' onChange={e=>setEntry(e.target.value)} />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default AddJournal
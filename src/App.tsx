import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { NonSensitiveDiaryEntry, NewDiaryEntry } from './types';

import toNewDiaryEntry from './utils';

const diariesUrl = '/api/diaries';

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[] | undefined>(undefined);

  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');
  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get<NonSensitiveDiaryEntry[]>(diariesUrl);
        setDiaries(response.data);
      } catch (error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message
        setErrorMessage(message)
      }
    };

    fetchDiaries();
  }, []);

  useEffect(() => {
    // Clear the existing timeout when a new error occurs
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    if (errorMessage === '') return;

    timeoutIdRef.current = setTimeout(() => {
      setErrorMessage('');
    }, 5000);

    return () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  },[errorMessage])

  const addDiary = async (newObject: NewDiaryEntry)  => {
    try {
      const response = await axios.post(diariesUrl, newObject);
      setDiaries(diaries?.concat(response.data));
    } catch (error) {
      let message = 'Unknown Error'
      if (error instanceof Error) message = error.message
      setErrorMessage(message)
    }
  };

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const diaryToAdd = {
      date,
      visibility,
      weather,
      comment
    }

    try {
      const parsedEntry = toNewDiaryEntry(diaryToAdd);
      addDiary(parsedEntry);

      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    } catch (error) {
      let message = 'Unknown Error'
      if (error instanceof Error) message = error.message
      setErrorMessage(message)
    }
  }

  return (
    <div>
      <h1>Add new entry</h1>

      <div>
        {errorMessage !== '' ? (
          <p style={{ color: 'red' }}>{errorMessage}</p>
        ) : (
          null
        )}
      </div>

      <form onSubmit={addEntry}>

        <div>
          date:
          <input
            id='date'
            type='text'
            value={date}
            name='date'
            onChange={({ target }) => {setDate(target.value)}}
          />
        </div>

        <div>
          visibility:
          <input
            id='visibility'
            type='text'
            value={visibility}
            name='visibility'
            onChange={({ target }) => {setVisibility(target.value)}}
          />
        </div>

        <div>
          weather:
          <input
            id='weather'
            type='text'
            value={weather}
            name='weather'
            onChange={({ target }) => {setWeather(target.value)}}
          />
        </div>

        <div>
          comment:
          <input
            id='comment'
            type='text'
            value={comment}
            name='comment'
            onChange={({ target }) => {setComment(target.value)}}
          />
        </div>

        <button id='add' type='submit'>add</button>

      </form>

      <h1>Diary entries</h1>
      {diaries !== undefined ? (
        diaries.length > 0 ? (
          <div>
            {diaries.map(diary => (
              <div key={diary.id}>
              <p><b>{diary.date}</b></p>
              <p style={{ margin: '0' }}>visibility: {diary.visibility}</p>
              <p style={{ margin: '0' }}>weather: {diary.weather}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No diaries available.</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

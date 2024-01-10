import { useState, useEffect } from 'react';
import axios from 'axios';

import { NonSensitiveDiaryEntry } from './types';

const diariesUrl = '/api/diaries';

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[] | undefined>(undefined);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get<NonSensitiveDiaryEntry[]>(diariesUrl);
        setDiaries(response.data);
      } catch (error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message
        reportError({message})
      }
    };

    fetchDiaries();
  }, []);

  return (
    <div>
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

import { useState, useEffect } from "react";
import { DiaryEntry, Weather, Visibility, NotificationType } from "./types";
import { getAllDiaryEntries, createDiaryEntry } from "./services/diaryService";
import moment from 'moment';

const Notification = (props: NotificationType) => {
  if (props.notif === null || props.notif === '') return <div></div>

  return (
    <div className='error'>
      {props.notif}
    </div>
  )
}

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState(moment().format('YYYY-MM-DD'));
  const [newWeather, setNewWeather] = useState(Weather.Sunny);
  const [newVisibility, setNewVisibility] = useState(Visibility.Great);
  const [newComment, setNewComment] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setDiaryEntries(data);
    })
  }, [])

  const onCreateDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiaryEntry = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    };
    createDiaryEntry(newDiaryEntry).then(data => {
      setDiaryEntries(diaryEntries.concat(data));
    }).catch(error => {
      if (error.response) {
        setNotification(error.response.data)
        setTimeout(() => {
          setNotification('');
        }, 5000);
      }
    });
    setNewDate(moment().format('YYYY-MM-DD'));
    setNewWeather(Weather.Sunny);
    setNewVisibility(Visibility.Great);
    setNewComment('');
  }

  return (
    <div>
      <Notification notif={notification} />
      <h2>Add new entry</h2>
      <form onSubmit={onCreateDiaryEntry}>
        <input type="date" id="date" value={newDate} onChange={(event) => setNewDate(moment(new Date(event.target.value)).format("YYYY-MM-DD"))} />
        
        <div style={{display: "flex"}}>
        weather 
        &nbsp;
        {Object.keys(Weather).map(w =>
        <div key={w}>
          {w} 
          <input type="radio" name="weather" checked={Weather[w as keyof typeof Weather] === newWeather}
          onChange={() => setNewWeather(Weather[w as keyof typeof Weather])} />
        </div>
        )}
        </div>

        <div style={{display: "flex"}}>
        visibility
        &nbsp;
        {Object.keys(Visibility).map(v =>
        <div key={v}>
          {v} 
          <input type="radio" name="visibility" checked={Visibility[v as keyof typeof Visibility] === newVisibility}
          onChange={() => setNewVisibility(Visibility[v as keyof typeof Visibility])} />
        </div>
        )}
        </div>

        <input value={newComment} onChange={(event) => setNewComment(event.target.value)} />
        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      <div>
        {diaryEntries && diaryEntries.map(entry => 
        <div key={entry.id}>
          <h4>{entry.date}</h4>
          {' '}
          <ul style ={{listStyle:'none', padding:0}}>
            <li>visibility: {entry.visibility}</li>
            <li>weather: {entry.weather}</li>
            <li>{entry.comment}</li>
          </ul>
        </div>
        )}
      </div>
    </div>
  );
};

export default App;
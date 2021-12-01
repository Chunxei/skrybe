import React, {useEffect, useState} from 'react';
import styles from './editor.module.scss';
import { formatDistance } from 'date-fns'

interface INoteData {
  title: string
  content: string
}

interface ITimeData {
  lastEdited: Date
  formatted: string
}

function Editor(): JSX.Element {
  const [noteData, setNoteData] = useState<INoteData>({
    title: '',
    content: ''
  });

  const [timeData, setTimeData] = useState<ITimeData>({
    lastEdited: new Date(),
    formatted: formatDistance(new Date(), new Date(), { addSuffix: true })
  })

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const {target} = event;
    setNoteData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const updateTimeData = (): void => {
    console.log('[UPDATING TIME]');

    setTimeData((prevState: ITimeData) => ({
      ...prevState,
      formatted: formatDistance(prevState.lastEdited, new Date(), { addSuffix: true }),
    }));
  }

  useEffect(() => {
    const interval = window.setInterval((updateTime: () => void) => {
      updateTime();
    }, 10000, updateTimeData);
    return () => {
      window.clearInterval(interval);
    };
  }, []);


  return (
    <main className={styles.editor}>
      <input
        type="text"
        name="title"
        id="note-title"
        className={styles.editor__title}
        value={noteData.title}
        onChange={handleInput}
        placeholder="Untitled Note"
      />

      <p className={styles.editor__date}>
        edited {timeData.formatted}
      </p>

      <textarea
        name="content"
        id="note-content"
        className={styles.editor__content}
        cols={30}
        rows={10}
        value={noteData.content}
        onChange={handleInput}
        placeholder="Spill yout thoughts..."
      />
    </main>
  );
}

export default Editor;

import React, {useEffect, useState} from 'react';
import styles from './editor.module.scss';
// import "react-quill/dist/quill.bubble.css";
import { formatDistance } from 'date-fns'
import {IFile} from "../../pages";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";

const editorModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link"],
  ],
};

const editorFormats = [
  "header",
  "bold", "italic", "underline", "strike",
  "list", "bullet", "indent",
  "link",
];

const ReactQuill = dynamic(
  () => import('react-quill'),
  { ssr: false }
);

interface INoteData {
  title: string
  content: string
}

interface ITimeData {
  lastEdited: Date
  formatted: string
}

interface IEditorProps {
  selectedFile: IFile
}

function Editor(props: IEditorProps): JSX.Element {
  const { selectedFile } = props;

  const [noteData, setNoteData] = useState<INoteData>({
    title: '',
    content: ''
  });

  const [timeData, setTimeData] = useState<ITimeData>({
    lastEdited: new Date(),
    formatted: formatDistance(new Date(), new Date(), { addSuffix: true })
  })

  const updateTimeData = (): void => {
    console.log('[UPDATING TIME]');

    setTimeData((prevState: ITimeData) => ({
      ...prevState,
      lastEdited: new Date(),
      formatted: formatDistance(prevState.lastEdited, new Date(), { addSuffix: true }),
    }));
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const {target} = event;
    setNoteData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))

    updateTimeData();
  }

  useEffect(() => {
    if (selectedFile) {
      setNoteData(selectedFile);
    }
  }, [selectedFile]);


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

      <ReactQuill
        className={styles.editor__content}
        theme="bubble"
        placeholder="Spill your thoughts..."
        value={noteData.content}
        onChange={(value) => {
          setNoteData((prevState) => ({
            ...prevState,
            content: value
          }))
        }}
        modules={editorModules}
        formats={editorFormats}
      />

      {/*<textarea*/}
      {/*  name="content"*/}
      {/*  id="note-content"*/}
      {/*  className={styles.editor__content}*/}
      {/*  cols={30}*/}
      {/*  rows={10}*/}
      {/*  value={noteData.content}*/}
      {/*  onChange={handleInput}*/}
      {/*  placeholder="Spill yout thoughts..."*/}
      {/*/>*/}
    </main>
  );
}

export default Editor;

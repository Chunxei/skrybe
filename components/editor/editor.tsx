import React, {useEffect, useState} from 'react';
import cn from 'classnames';
import styles from './editor.module.scss';
// import "react-quill/dist/quill.bubble.css";
import { formatDistance } from 'date-fns'
import {IFile} from "../../pages";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(
  () => import('react-quill'),
  { ssr: false }
);

const editorModules = {
  toolbar: [
    [{ 'header': [false, 1, 2, 3] }],
    ["bold", "italic", "underline", "strike"],
    [{ 'color': [] }, { 'background': [] }],
    ['blockquote', 'code-block'],
    [{ 'list': 'check' }, { list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ['clean'],
    [
      {
        handlers: {
          // handlers object will be merged with default handlers object
          'link': function(value: any) {
            console.log('[VALUE]:', value);
          }
        }
      }
    ]
  ],
};

const editorFormats = [
  "header",
  "bold", "italic", "underline", "strike",
  "blockquote", "code-block",
  "color", "background",
  "list", "check", "bullet", "indent",
  "link", "image",
  "clean",
];

interface INoteData {
  title: string
  content: string
  lastEdited: Date
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
    content: '',
    lastEdited: new Date(),
  });

  const [timeData, setTimeData] = useState<ITimeData>({
    lastEdited: new Date(),
    formatted: formatDistance(new Date(), new Date(), { addSuffix: true })
  })

  const updateTimeData = (lastEdited?: Date): void => {
    setTimeData((prevState: ITimeData) => ({
      ...prevState,
      lastEdited: lastEdited || new Date(),
      formatted: formatDistance(prevState.lastEdited, lastEdited|| new Date(), { addSuffix: true }),
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

  const handleEditorChange = (value: string) => {
    setNoteData((prevState) => ({
      ...prevState,
      content: value
    }));

    updateTimeData();
  }

  useEffect(() => {
    if (selectedFile) {
      setNoteData(selectedFile);

      setTimeData((prevState) => ({
        ...prevState,
        lastEdited: selectedFile.lastEdited,
      }))

      updateTimeData(selectedFile.lastEdited);
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
        onChange={handleEditorChange}
        modules={editorModules}
        formats={editorFormats}
      />
    </main>
  );
}

export default Editor;

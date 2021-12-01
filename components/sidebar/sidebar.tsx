import React, {useState} from 'react';
import styles from './sidebar.module.scss';
import Image from "next/image";
import { BiCaretDown, BiCaretRight } from "react-icons/bi";

const mock = [
  {
    name: 'stories',
    id: 'stories',
    files: [
      {
        title: 'the duality of man',
        content: 'lorem ipsum dolor sit amet and etcetera i no get time type',
        lastEdited: new Date(Date.now() - 1000000),
      },
      {
        title: 'the silmarillion',
        content: 'Tolkein\'s most ambitious and immersive work to date',
        lastEdited: new Date(Date.now() - 5000000),
      },
    ]
  },
  {
    name: 'todos',
    id: 'todos',
    files: [
      {
        title: 'shopping list',
        content: 'shawarma - N20,000',
        lastEdited: new Date(Date.now() - 6000000),
      },
    ]
  },
]

interface ISidebarProps {
  onSelectFile: (...args: any[]) => void
}

function Sidebar(props: ISidebarProps): JSX.Element {
  const { onSelectFile } = props;

  const [openFolderId, setOpenFolderId] = useState<string>('');

  const selectFolder = (folderId: string): void => {
    setOpenFolderId((prevState) => folderId === prevState ? '' : folderId);
  };

  return (
    <aside className={styles.sidebar}>
      { mock.map((folder, index) => (
        <React.Fragment key={folder.id}>
          <div
            key={folder.id}
            className={styles.sidebar__folder}
            onClick={() => selectFolder(folder.id)}
          >
            { openFolderId === folder.id ? (
              <BiCaretDown />
            ) : (
              <BiCaretRight />
            )}
            <Image
              src="/svgs/folder.svg"
              width="15"
              height="15"
              alt=""
            />
            <p>{ folder.name }</p>
          </div>

          { openFolderId === folder.id && (
            <div className={styles.sidebar__folder__files}>
              { folder.files.map((file) => (
                <div
                  key={index}
                  className={styles.sidebar__file}
                  onClick={() => onSelectFile(file)}
                >
                  <Image
                    src="/svgs/file.svg"
                    width="15"
                    height="15"
                    alt=""
                  />
                  <p>{ file.title }</p>
                </div>
              )) }
            </div>
          )}
        </React.Fragment>
      )) }
    </aside>
  );
}

export default Sidebar;

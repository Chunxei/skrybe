import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Sidebar from "../components/sidebar";
import Header from '../components/header';
import Editor from '../components/editor';
import Footer from '../components/footer';
import {useState} from "react";

export interface IFile {
  title: string
  content: string
}

const Home: NextPage = () => {
  const [selectedFile, setSelectedFile] = useState<IFile>({
    title: '',
    content: '',
  })

  const handleSelectFile = (file: IFile) => {
    setSelectedFile(file);
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.body}>
        <Sidebar onSelectFile={handleSelectFile} />
        <Editor selectedFile={selectedFile} />
      </div>

      <Footer />
    </div>
  )
}

export default Home

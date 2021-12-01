import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Sidebar from "../components/sidebar";
import Header from '../components/header';
import Editor from '../components/editor';
import Footer from '../components/footer';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.body}>
        <Sidebar />
        <Editor />
      </div>

      <Footer />
    </div>
  )
}

export default Home

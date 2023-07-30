import Head from "next/head";
import Button from "@mui/material/Button";
import ClientForm from "../components/clientForm";
import styles from "../styles/Home.module.css";
import { Container, Box, Typography } from "@mui/material";
import App from "../src/App";
import Modal from 'react-modal';



Modal.setAppElement('#__next');

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Planos de Telefonia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Typography variant="h3" mb={2} align="center">
          Planos de Telefonia
        </Typography>
      </header>
      <main>
        <App />
      </main>

      {/* <footer>
        <Typography variant="body2" color="textSecondary" align="center">
          teste
        </Typography>
      </footer> */}
    </div>
  );
}

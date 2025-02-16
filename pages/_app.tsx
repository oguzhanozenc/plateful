import type { AppProps } from "next/app";
import Head from "next/head";
import { AppProvider } from "../store/AppContext";
import Layout from "@/components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Head>
        <title>Plateful – Smart Meal Planning</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Plateful helps you manage ingredients, generate recipes, and plan your meals efficiently."
        />
      </Head>
      <ToastContainer position="top-right" autoClose={3000} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

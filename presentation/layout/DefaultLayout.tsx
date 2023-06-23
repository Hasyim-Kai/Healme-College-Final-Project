import Head from "next/head";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/store";
import { getUserFromLocalStorage } from "../../app/UserSlice";

type Props = {
  children: JSX.Element | JSX.Element[] | null,
  additionalStyle?: string,
  pageTitle?: string,
  getUserFromLS?: boolean,
}

export default function DefaultLayout({ children, additionalStyle = '', pageTitle = 'Healme', getUserFromLS = true }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getUserFromLS) {
      dispatch(getUserFromLocalStorage())
    }
  }, [])

  return <>
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={`w-full min-h-screen overflow-hidden ${additionalStyle}`}>
      {children}
    </main>
  </>
}
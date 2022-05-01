import Head from 'next/head';
import Notification from '../components/ui/notification';
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import {Fragment, useContext} from 'react';
import {NotificationContextProvider} from '../store/notification-context';
import NotificationContext from '../store/notification-context';
function MyApp({Component, pageProps}) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  console.log(activeNotification);
  return (
    <Fragment>
      <NotificationContextProvider>
        <Layout>
          <Head>
            <title>Next Events</title>
            <meta name="description" content="NextJS Events" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
          {activeNotification && (
            <Notification
              title={activeNotification.title}
              status={activeNotification.status}
              message={activeNotification.message}
            />
          )}
        </Layout>
      </NotificationContextProvider>
    </Fragment>
  );
}

export default MyApp;

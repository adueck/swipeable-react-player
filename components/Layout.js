import React from 'react'
import Head from 'next/head'

const Layout = (props) => (
    <div>
        <Head>
            <title>Swipeable Example</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width maximum-scale=1, user-scalable=0" key="viewport"/>
        </Head>
        <div className="site">
            <main className="content">
                <div className="container">
                    {props.children}
                </div>
            </main>
            <footer className="footer-link">
                <p>Footer Here</p>
            </footer>
        </div>
    <style jsx>{`
        .site {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
        }
        .content {
            flex: 1;
        }
        footer {
            margin-top: 2em;
            margin-bottom: 0.5em;
            margin-left: 1em;
        }
        .container {
            padding: 25px;
            display: flex;
            flex-direction: column;
        }
        @media (max-width: 500px) {
            .container {
                padding: 20px;
            }
        }
        .footer-link {
            color: grey,
            textDecoration: none,
            cursor: pointer
        }
    `}</style>
    <style jsx global>{`
        html, body {
            margin: 0;
            padding: 0;
            font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
            line-height: 1.42857143;
            color: #333;
            backgroundColor: #fff;
        }
    `}</style>
    </div>
)

export default Layout
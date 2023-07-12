import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
  title: "Promptastic",
  description: "Discover & Share IA Prompts",
  icons: {
    icons: "/app/favicon.svg",
  }
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        {/* <link rel='icon' href='/favicon.ico' size='any' /> */}
        <Provider>
          <div className='main'>
            <div className='gradient'/>
          </div>
          <main className='app'>
          <Nav/>
            { children }
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout

import '@styles/globals.css';
import Nav from '@components/Nav';
import { Provider } from '@components/Provider';

export const metadata={
    title: "PromptOverFlow",
    description: "Discover and Share AI Prompts"
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body>
      <Provider>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className="app">
          <Nav></Nav>
          {children}
        </main>
        </Provider>
        
      </body>

    </html>
  )
}

export default RootLayout
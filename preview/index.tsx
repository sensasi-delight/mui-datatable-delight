import React, { ReactNode, StrictMode } from 'react'
import { Button } from '@mui/material'
import { createRoot } from 'react-dom/client'
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  BrowserRouter,
} from 'react-router'
import { ExamplesGrid } from './components/ExamplesGrid'
import EXAMPLES_LIST from './components/examples/list'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ExamplesGrid />} />

        {Object.keys(EXAMPLES_LIST).map((label, i) => (
          <Route
            key={i}
            path={`/${label.replace(/\s+/g, '-').toLowerCase()}`}
            Component={EXAMPLES_LIST[label]}
          />
        ))}
      </Routes>
    </Layout>
  )
}

function Layout({ children }: { children: ReactNode }) {
  const STYLES = {
    root: {
      display: 'flex',
      justifyContent: 'center',
    },
    contentWrapper: {
      width: '100%',
    },
    returnHomeStyle: { padding: '0px', margin: '20px 0 20px 0' },
  }

  const { pathname } = useLocation()
  const navigation = useNavigate()

  return (
    <main style={STYLES.root}>
      <div style={STYLES.contentWrapper}>
        {children}

        <div>
          {pathname !== '/' && (
            <div style={STYLES.returnHomeStyle}>
              <Button color="primary" onClick={() => navigation('/')}>
                Back to Example Index
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

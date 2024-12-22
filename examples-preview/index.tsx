import { Box, Button, Container } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { HashRouter, Link, Route, Routes } from 'react-router'
import { Home } from '@mui/icons-material'
import { ReactNode, StrictMode } from 'react'
// locals
import examples from './components/examples'
import ExamplesGrid from './components/ExamplesGrid'

/** Render the App */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

/**
 * App Component
 */
function App() {
  return (
    <Providers>
      <Layout>
        <ContentSwitcher />
      </Layout>
    </Providers>
  )
}

/**
 * Providers Component
 */
function Providers({ children }: { children: ReactNode }) {
  return <HashRouter>{children}</HashRouter>
}

/**
 * Layout Component
 */
function Layout({ children }: { children: ReactNode }) {
  return (
    <Container
      maxWidth="md"
      sx={{
        mb: 16
      }}
    >
      <Button component={Link} to="/" startIcon={<Home />} sx={{ mb: 2 }}>
        Home
      </Button>

      <Box component="main" sx={{ mt: 4 }}>
        {children}
      </Box>
    </Container>
  )
}

/**
 * ContentSwitcher Component
 */
function ContentSwitcher() {
  return (
    <Routes>
      <Route path="/" element={<ExamplesGrid />} />

      {Object.keys(examples).map((label, index) => (
        <Route
          key={index}
          path={`/${label.replace(/\s+/g, '-').toLowerCase()}`}
          Component={examples[label]}
        />
      ))}
    </Routes>
  )
}

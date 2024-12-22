import { Box, Button, Container } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { HashRouter, Link, Route, Switch } from 'react-router-dom'
import { Home } from '@mui/icons-material'
// locals
import examples from './components/examples'
import ExamplesGrid from './components/ExamplesGrid'

/** Render the App */
createRoot(document.getElementById('app-root')).render(<App />)

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
 *
 * @param {ReactNode} props.children
 */
function Providers({ children }) {
  return <HashRouter hashType="noslash">{children}</HashRouter>
}

/**
 * Layout Component
 */
function Layout({ children }) {
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
    <Switch>
      <Route
        path="/"
        exact
        render={() => <ExamplesGrid examples={examples} />}
      />

      {Object.keys(examples).map((label, index) => (
        <Route
          key={index}
          path={`/${label.replace(/\s+/g, '-').toLowerCase()}`}
          exact
          component={examples[label]}
        />
      ))}
    </Switch>
  )
}

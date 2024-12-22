import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'
// locals
import examples from './examples'

const EXAMPLE_SORTED = {}

/** Sort Examples alphabetically */
Object.keys(examples)
  .sort()
  .forEach(function (key) {
    EXAMPLE_SORTED[key] = examples[key]
  })

function ExamplesGrid({ classes }) {
  const [searchVal, setSearchVal] = useState('')

  const examplesSortedKeys = Object.keys(EXAMPLE_SORTED).filter(item => {
    if (searchVal === '') return true
    console.dir(item)
    return item.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1
      ? true
      : false
  })

  return (
    <>
      <SearchBar
        nItems={Object.keys(examplesSortedKeys).length}
        value={searchVal}
        onChange={({ target: { value } }) => setSearchVal(value)}
      />

      <Grid
        container
        spacing={1}
        sx={{
          mt: 4
        }}
      >
        {examplesSortedKeys.map((label, i) => (
          <Grid key={i} item md={2}>
            <Card className={classes.card}>
              <CardActionArea
                component={Link}
                to={`/${label.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <CardContent className={classes.cardContent}>
                  <Typography
                    variant="subtitle1"
                    className={classes.label}
                    align="center"
                  >
                    {label}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

const STYLES = {
  card: {
    '&:hover': {
      background: 'lightgrey',
      fontWeight: 500
    }
  },
  cardContent: {
    '&:last-child': {
      padding: 8
    }
  },
  label: {
    fontWeight: 'inherit'
  }
}

export default withStyles(ExamplesGrid, STYLES)

function SearchBar({ nItems, onChange, value }) {
  return (
    <Box>
      <Typography variant="h5" component="div">
        Choose an example
      </Typography>

      <Typography variant="subtitle2" component="div" mb={1}>
        ({nItems}) examples
      </Typography>

      <TextField
        placeholder="Search Examples"
        value={value}
        onChange={onChange}
      />
    </Box>
  )
}

import React, { useState } from 'react'
import { Link } from 'react-router'
import { Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import EXAMPLES_LIST from './examples/list'

/** Examples list in alphabetically sorted */
const EXAMPLE_SORTED = {}

Object.keys(EXAMPLES_LIST)
  .sort()
  .forEach(key => {
    EXAMPLE_SORTED[key] = EXAMPLES_LIST[key]
  })

export function ExamplesGrid() {
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
      <Typography variant="h5" align="center">
        Choose an Example
      </Typography>
      <Typography variant="subtitle2" align="center">
        ({examplesSortedKeys.length}) Examples
      </Typography>

      <Typography variant="subtitle2" align="center" style={{ margin: '10px' }}>
        <TextField
          placeholder="Search Examples"
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
        />
      </Typography>

      <Grid container sx={CHILDREN_SX.container} spacing={1}>
        {examplesSortedKeys.map((label, index) => (
          <Grid key={index} item md={2}>
            <Link
              style={{ textDecoration: 'none' }}
              to={`/${label.replace(/\s+/g, '-').toLowerCase()}`}>
              <Card sx={CHILDREN_SX.card}>
                <CardContent sx={CHILDREN_SX.cardContent}>
                  <Typography
                    variant="subtitle1"
                    sx={CHILDREN_SX.label}
                    align="center">
                    {label}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

const CHILDREN_SX = {
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  card: {
    '&:hover': {
      background: 'lightgrey',
      fontWeight: 500,
    },
  },
  cardContent: {
    '&:last-child': {
      padding: 8,
    },
  },
  label: {
    fontWeight: 'inherit',
  },
}

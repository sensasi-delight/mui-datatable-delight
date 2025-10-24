'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { snakeCaseToKebab, snakeCaseToTitle } from '@/docs/utils'
// locals
import { Route } from './_route--enum'

const SORTED_EXAMPLES = Object.keys(Route)
    .filter(key => Number.isNaN(parseInt(key, 10)))
    .sort()

export default function Page() {
    const [searchVal, setSearchVal] = useState('')

    const examplesSortedKeys = searchVal
        ? SORTED_EXAMPLES.filter(item =>
              item
                  .toLowerCase()
                  .replace(/_/g, ' ')
                  .includes(searchVal.toLowerCase())
          )
        : SORTED_EXAMPLES

    return (
        <>
            <SearchBar
                nItems={Object.keys(examplesSortedKeys).length}
                onChange={({ target: { value } }) => setSearchVal(value)}
                value={searchVal}
            />

            <Grid container spacing={1} sx={{ mt: 4 }}>
                {examplesSortedKeys.map(enumKey => (
                    <Grid
                        key={enumKey}
                        size={{
                            md: 2
                        }}
                    >
                        <Card>
                            <CardActionArea
                                href={`/examples/${snakeCaseToKebab(enumKey)}`}
                            >
                                <CardContent>
                                    <Typography
                                        align="center"
                                        variant="subtitle1"
                                    >
                                        {snakeCaseToTitle(enumKey)}
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

function SearchBar({
    nItems,
    onChange,
    value
}: {
    nItems: number
    onChange: TextFieldProps['onChange']
    value: string
}) {
    return (
        <Box>
            <Typography component="div" variant="h5">
                Choose an example
            </Typography>

            <Typography component="div" mb={1} variant="subtitle2">
                ({nItems}) examples
            </Typography>

            <TextField
                onChange={onChange}
                placeholder="Search Examples"
                value={value}
            />
        </Box>
    )
}

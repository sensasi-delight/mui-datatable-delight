'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
// locals
import { Route } from './_route--enum'
import { snakeCaseToKebab, snakeCaseToTitle } from '@/utils'

const SORTED_EXAMPLES = Object.keys(Route)
    .filter(key => isNaN(parseInt(key)))
    .sort()

export default function Page() {
    const [searchVal, setSearchVal] = useState('')

    const examplesSortedKeys = searchVal
        ? SORTED_EXAMPLES.filter(item =>
              item
                  .toLowerCase()
                  .replaceAll('_', ' ')
                  .includes(searchVal.toLowerCase())
          )
        : SORTED_EXAMPLES

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
                {examplesSortedKeys.map((enumKey, i) => (
                    <Grid key={i} item md={2}>
                        <Card>
                            <CardActionArea
                                href={`/examples/${snakeCaseToKebab(enumKey)}`}
                            >
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        align="center"
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

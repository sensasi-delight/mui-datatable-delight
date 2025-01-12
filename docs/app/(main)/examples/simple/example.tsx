'use client'

// vendors
import { InputLabel, FormControl, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
// DataTable
import DataTable, { type DataTableOptions, type DataTableProps } from '@src'

export function Example() {
    const [responsive, setResponsive] =
        useState<DataTableOptions['responsive']>('vertical')
    const [tableBodyHeight, setTableBodyHeight] = useState('400px')
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState('')
    const [searchBtn, setSearchBtn] = useState<DataTableOptions['search']>(true)
    const [downloadBtn, setDownloadBtn] =
        useState<DataTableOptions['download']>(true)
    const [printBtn, setPrintBtn] = useState<DataTableOptions['print']>(true)
    const [viewColumnBtn, setViewColumnBtn] =
        useState<DataTableOptions['viewColumns']>(true)
    const [filterBtn, setFilterBtn] = useState<DataTableOptions['filter']>(true)

    return (
        <>
            {/* <Radios
                label="Responsive"
                options={[
                    'vertical',
                    'standard',
                    'simple',
                    'scroll',
                    'scrollMaxHeight',
                    'stacked'
                ]}
                value={responsive}
                onChange={setResponsive}
            /> */}

            <FormControl>
                <InputLabel id="demo-simple-select-label">
                    Responsive Option
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={responsive}
                    style={{ width: '200px', marginBottom: '10px' }}
                    onChange={({ target: { value } }) =>
                        setResponsive(value as typeof responsive)
                    }
                >
                    <MenuItem value="vertical">vertical</MenuItem>
                    <MenuItem value="standard">standard</MenuItem>
                    <MenuItem value="simple">simple</MenuItem>
                    <MenuItem value="scroll">scroll (deprecated)</MenuItem>
                    <MenuItem value="scrollMaxHeight">
                        scrollMaxHeight (deprecated)
                    </MenuItem>
                    <MenuItem value="stacked">stacked (deprecated)</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">
                    Table Body Height
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tableBodyHeight}
                    style={{
                        width: '200px',
                        marginBottom: '10px'
                    }}
                    onChange={({ target: { value } }) =>
                        setTableBodyHeight(value as typeof tableBodyHeight)
                    }
                >
                    <MenuItem value={''}>[blank]</MenuItem>
                    <MenuItem value={'400px'}>400px</MenuItem>
                    <MenuItem value={'800px'}>800px</MenuItem>
                    <MenuItem value={'100%'}>100%</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">
                    Max Table Body Height
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tableBodyMaxHeight}
                    style={{ width: '200px', marginBottom: '10px' }}
                    onChange={({ target: { value } }) =>
                        setTableBodyMaxHeight(
                            value as typeof tableBodyMaxHeight
                        )
                    }
                >
                    <MenuItem value={''}>[blank]</MenuItem>
                    <MenuItem value={'400px'}>400px</MenuItem>
                    <MenuItem value={'800px'}>800px</MenuItem>
                    <MenuItem value={'100%'}>100%</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">
                    Search Button
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchBtn}
                    style={{ width: '200px', marginBottom: '10px' }}
                    onChange={({ target: { value } }) =>
                        setSearchBtn(
                            value === 'disabled' ? value : value === 'true'
                        )
                    }
                >
                    <MenuItem value="true">
                        <code>true</code>
                    </MenuItem>
                    <MenuItem value="false">
                        <code>false</code>
                    </MenuItem>
                    <MenuItem value="disabled">
                        <code>'disabled'</code>
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">
                    Download Button
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={downloadBtn}
                    style={{ width: '200px', marginBottom: '10px' }}
                    onChange={({ target: { value } }) =>
                        setDownloadBtn(
                            value === 'disabled' ? value : value === 'true'
                        )
                    }
                >
                    <MenuItem value="true">
                        <code>true</code>
                    </MenuItem>
                    <MenuItem value="false">
                        <code>false</code>
                    </MenuItem>
                    <MenuItem value="disabled">
                        <code>'disabled'</code>
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">
                    Print Button
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={printBtn}
                    style={{ width: '200px', marginBottom: '10px' }}
                    onChange={({ target: { value } }) =>
                        setPrintBtn(
                            value === 'disabled' ? value : value === 'true'
                        )
                    }
                >
                    <MenuItem value="true">
                        <code>true</code>
                    </MenuItem>
                    <MenuItem value="false">
                        <code>false</code>
                    </MenuItem>
                    <MenuItem value="disabled">
                        <code>'disabled'</code>
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">
                    View Column Button
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={viewColumnBtn}
                    style={{ width: '200px', marginBottom: '10px' }}
                    onChange={({ target: { value } }) =>
                        setViewColumnBtn(
                            value === 'disabled' ? value : value === 'true'
                        )
                    }
                >
                    <MenuItem value="true">
                        <code>true</code>
                    </MenuItem>
                    <MenuItem value="false">
                        <code>false</code>
                    </MenuItem>
                    <MenuItem value="disabled">
                        <code>'disabled'</code>
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">
                    Filter Button
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterBtn}
                    style={{ width: '200px', marginBottom: '10px' }}
                    onChange={({ target: { value } }) =>
                        setFilterBtn(
                            value === 'disabled' ? value : value === 'true'
                        )
                    }
                >
                    <MenuItem value="true">
                        <code>true</code>
                    </MenuItem>
                    <MenuItem value="false">
                        <code>false</code>
                    </MenuItem>
                    <MenuItem value="disabled">
                        <code>'disabled'</code>
                    </MenuItem>
                </Select>
            </FormControl>

            <DataTable
                title={'ACME Employee list'}
                data={DATA}
                columns={COLUMNS}
                options={
                    {
                        ...STATIC_OPTIONS,
                        search: searchBtn,
                        download: downloadBtn,
                        print: printBtn,
                        viewColumns: viewColumnBtn,
                        filter: filterBtn,
                        responsive,
                        tableBodyHeight,
                        tableBodyMaxHeight
                    } satisfies DataTableOptions
                }
            />
        </>
    )
}

const COLUMNS: DataTableProps['columns'] = [
    { name: 'Name', options: { filterOptions: { fullWidth: true } } },
    'Title',
    'Location'
]

const STATIC_OPTIONS: DataTableOptions = {
    filterType: 'checkbox',
    onTableChange: (action, state) => {
        console.log(action)
        console.dir(state)
    }
}

const DATA = [
    ['Gabby George', 'Business Analyst', 'Minneapolis'],
    [
        'Aiden Lloyd',
        "Business Consultant for an International Company and CEO of Tony's Burger Palace",
        'Dallas'
    ],
    ['Jaden Collins', 'Attorney', 'Santa Ana'],
    ['Franky Rees', 'Business Analyst', 'St. Petersburg'],
    ['Aaren Rose', null, 'Toledo'],
    ['Johnny Jones', 'Business Analyst', 'St. Petersburg'],
    ['Jimmy Johns', 'Business Analyst', 'Baltimore'],
    ['Jack Jackson', 'Business Analyst', 'El Paso'],
    ['Joe Jones', 'Computer Programmer', 'El Paso'],
    ['Jacky Jackson', 'Business Consultant', 'Baltimore'],
    ['Jo Jo', 'Software Developer', 'Washington DC'],
    ['Donna Marie', 'Business Manager', 'Annapolis']
]

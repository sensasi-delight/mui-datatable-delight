'use client'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
// DataTable
import DataTable, { type DataTableOptions, type DataTableProps } from '@src'
// vendors
import { useState } from 'react'

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
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    onChange={({ target: { value } }) =>
                        setResponsive(value as typeof responsive)
                    }
                    style={{ marginBottom: '10px', width: '200px' }}
                    value={responsive}
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
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    onChange={({ target: { value } }) =>
                        setTableBodyHeight(value as typeof tableBodyHeight)
                    }
                    style={{
                        marginBottom: '10px',
                        width: '200px'
                    }}
                    value={tableBodyHeight}
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
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    onChange={({ target: { value } }) =>
                        setTableBodyMaxHeight(
                            value as typeof tableBodyMaxHeight
                        )
                    }
                    style={{ marginBottom: '10px', width: '200px' }}
                    value={tableBodyMaxHeight}
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
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    onChange={({ target: { value } }) =>
                        setSearchBtn(
                            value === 'disabled' ? value : value === 'true'
                        )
                    }
                    style={{ marginBottom: '10px', width: '200px' }}
                    value={searchBtn}
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
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    onChange={({ target: { value } }) =>
                        setDownloadBtn(
                            value === 'disabled' ? value : value === 'true'
                        )
                    }
                    style={{ marginBottom: '10px', width: '200px' }}
                    value={downloadBtn}
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
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    onChange={({ target: { value } }) =>
                        setPrintBtn(
                            value === 'disabled' ? value : value === 'true'
                        )
                    }
                    style={{ marginBottom: '10px', width: '200px' }}
                    value={printBtn}
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
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    onChange={({ target: { value } }) =>
                        setViewColumnBtn(
                            value === 'disabled' ? value : value === 'true'
                        )
                    }
                    style={{ marginBottom: '10px', width: '200px' }}
                    value={viewColumnBtn}
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
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    onChange={({ target: { value } }) =>
                        setFilterBtn(
                            value === 'disabled' ? value : value === 'true'
                        )
                    }
                    style={{ marginBottom: '10px', width: '200px' }}
                    value={filterBtn}
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
                columns={COLUMNS}
                data={DATA}
                options={{
                    ...STATIC_OPTIONS,
                    download: downloadBtn,
                    filter: filterBtn,
                    print: printBtn,
                    responsive,
                    search: searchBtn,
                    tableBodyHeight,
                    tableBodyMaxHeight,
                    viewColumns: viewColumnBtn
                }}
                title={'ACME Employee list'}
            />
        </>
    )
}

const COLUMNS: DataTableProps['columns'] = [
    { name: 'Name', options: { filterOptions: { fullWidth: true } } },
    'Title',
    'Location'
]

const STATIC_OPTIONS: DataTableProps['options'] = {
    filterType: 'checkbox',
    onTableChange: (action, state) => {
        console.dir({
            action,
            state
        })
    },
    onTableInit: (action, state) => {
        console.dir({
            action,
            state
        })
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

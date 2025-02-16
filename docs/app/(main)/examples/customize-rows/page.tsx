'use client'

/*
  See another example of how to use `customRowRender` at
  https://github.com/Skn0tt/mui-datatables-responsive-demo
  https://mui-datatables-responsive-demo.skn0tt.now.sh
*/
import DataTable from '@src'

function YourCustomRowComponent(props: RowType) {
    const { name, cardNumber, cvc, expiry } = props

    return (
        <div>
            <h1>{name}</h1>
            <p>
                Number: {cardNumber} <br />
                CVC: {cvc} <br />
                expiry: {expiry}
            </p>
        </div>
    )
}

interface RowType {
    name: string
    cardNumber: string
    cvc: string
    expiry: string
}

const creditCards: RowType[] = [
    {
        name: 'Tom Tallis',
        cardNumber: '5500005555555559',
        cvc: '582',
        expiry: '02/24'
    },
    {
        name: 'Rich Harris',
        cardNumber: '4444444444444448',
        cvc: '172',
        expiry: '03/22'
    },
    {
        name: 'Moby Dixon',
        cardNumber: '3566003566003566',
        cvc: '230',
        expiry: '12/25'
    }
]

function Example() {
    return (
        <DataTable
            title="Cards"
            data={creditCards}
            columns={[
                {
                    name: 'name',
                    label: 'Name'
                },
                {
                    name: 'cardNumber',
                    label: 'Card Number'
                },
                {
                    name: 'cvc',
                    label: 'CVC'
                },
                {
                    name: 'expiry',
                    label: 'Expiry'
                }
            ]}
            options={{
                selectableRows: 'none',
                responsive: 'standard',
                customRowRender: data => {
                    const [name, cardNumber, cvc, expiry] = data as string[]

                    if (!name || !cardNumber || !cvc || !expiry) {
                        return null
                    }

                    return (
                        <tr key={cardNumber}>
                            <td colSpan={4} style={{ paddingTop: '10px' }}>
                                <YourCustomRowComponent
                                    name={name}
                                    cardNumber={cardNumber}
                                    cvc={cvc}
                                    expiry={expiry}
                                />
                            </td>
                        </tr>
                    )
                }
            }}
        />
    )
}

export default Example

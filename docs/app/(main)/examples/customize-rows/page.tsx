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
        cardNumber: '5500005555555559',
        cvc: '582',
        expiry: '02/24',
        name: 'Tom Tallis'
    },
    {
        cardNumber: '4444444444444448',
        cvc: '172',
        expiry: '03/22',
        name: 'Rich Harris'
    },
    {
        cardNumber: '3566003566003566',
        cvc: '230',
        expiry: '12/25',
        name: 'Moby Dixon'
    }
]

function Example() {
    return (
        <DataTable
            columns={[
                {
                    label: 'Name',
                    name: 'name'
                },
                {
                    label: 'Card Number',
                    name: 'cardNumber'
                },
                {
                    label: 'CVC',
                    name: 'cvc'
                },
                {
                    label: 'Expiry',
                    name: 'expiry'
                }
            ]}
            data={creditCards}
            options={{
                customRowRender: data => {
                    const { name, cardNumber, cvc, expiry } = data

                    return (
                        <tr key={cardNumber}>
                            <td colSpan={4} style={{ paddingTop: '10px' }}>
                                <YourCustomRowComponent
                                    cardNumber={cardNumber}
                                    cvc={cvc}
                                    expiry={expiry}
                                    name={name}
                                />
                            </td>
                        </tr>
                    )
                },
                responsive: 'standard',
                selectableRows: 'none'
            }}
            title="Cards"
        />
    )
}

export default Example

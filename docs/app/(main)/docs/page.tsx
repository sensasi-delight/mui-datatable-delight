import { redirect } from 'next/navigation'
import { Route } from './_route--enum'

export default function Page() {
    redirect('/docs/' + Route.GETTING_STARTED)
}

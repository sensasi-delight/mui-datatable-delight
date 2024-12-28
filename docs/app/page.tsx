import { redirect } from 'next/navigation'
import { Route } from './_routes--enum'

export default function Page() {
    return redirect('/' + Route.DOCS__GETTING_STARTED__OVERVIEW)
}

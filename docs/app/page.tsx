import { redirect } from 'next/navigation'
import { Route } from './(main)/docs/_route--enum'

export default function Page() {
    return redirect('/docs/' + Route.GETTING_STARTED)
}

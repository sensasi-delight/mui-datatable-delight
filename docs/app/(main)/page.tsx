import { useRouter } from 'next/router'

export default function Page() {
    const { replace } = useRouter()

    replace('getting-started/overview')
}

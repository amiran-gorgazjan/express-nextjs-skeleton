import { useEffect, useState } from "react"

export default function Home() {
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const fetchHello = async () => {
            const response = await fetch("/api/hello-world")
            const data = await response.json()

            if (data.message) {
                setMessage(data.message)
            }
        }

        fetchHello()
    }, [])

    return (
        <div>
            <h1>Hello World</h1>
            <p>{message ?? 'Waiting for Express response...'}</p>
        </div>
    )
}
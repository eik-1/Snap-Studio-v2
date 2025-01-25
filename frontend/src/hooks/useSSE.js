import { useEffect } from "react"

export default function useSSE(onMessage) {
    useEffect(() => {
        const eventSource = new EventSource("http://localhost:3000/sse/events")

        eventSource.onMessage = (event) => {
            const data = JSON.parse(event.data)
            onMessage(data)
            eventSource.close()
        }

        return () => {
            eventSource.close()
        }
    }, [onMessage])
}


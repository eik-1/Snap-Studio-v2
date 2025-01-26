import { useEffect } from "react"

export default function useSSE(onMessage, userId) {
    useEffect(() => {
        const eventSource = new EventSource(
            `http://localhost:3000/sse/events/${userId}`,
        )

        eventSource.onMessage = (event) => {
            const data = JSON.parse(event.data)
            onMessage(data)
            eventSource.close()
        }

        return () => {
            eventSource.close()
        }
    }, [onMessage, userId])
}


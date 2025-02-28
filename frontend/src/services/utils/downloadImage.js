export async function downloadImageFromReplicate(imageUrl) {
    try {
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `snapstudio-${Date.now()}.png` // Generate unique filename
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
    } catch (error) {
        console.error("Error downloading image:", error)
        throw error
    }
}



function addOneMonth(timestamp) {
    const date = new Date(timestamp)
    date.setMonth(date.getMonth() + 1)

    const day = date.getDate()
    const month = date.toLocaleString("en-US", { month: "long" }) 
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
}
function addOneYear(timestamp) {
    const date = new Date(timestamp)
    date.setFullYear(date.getFullYear() + 1)

    const day = date.getDate()
    const month = date.toLocaleString("en-US", { month: "long" })
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
}
export { addOneMonth, addOneYear }

const formatCount = (c: number) => {

    const count = String(c)

    if (count.length > 3 && count.length < 5) {
        return `${count[0]},${count[1]}K`
    }
    if (count.length > 4 && count.length < 6) {
        return `${count.slice(0, 2)},${count[1]}K`
    }
    return c
}
export default formatCount
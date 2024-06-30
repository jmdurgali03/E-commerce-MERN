export const truncateText = (str: string) => {
    if(str.length < 30) return str

    return str.substring(0,30) + "...";
}
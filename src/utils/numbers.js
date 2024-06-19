import numbro from 'numbro'

export const formattedNumber = (val, mantissa = 2) => {
    const num = Number(val)
    return numbro(num).format({
        thousandSeparated: true,
        mantissa: mantissa,
        optionalMantissa: true
    });
}
export const numFloor = (val) => {
    const num = Number(val)
    let result = Math.floor(num * 100) / 100;
    return result
}
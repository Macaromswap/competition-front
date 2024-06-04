import numbro from 'numbro'

export const formattedNumber = (val, mantissa = 2) => {
    const num = Number(val)
    return numbro(num).format({
        thousandSeparated: true,
        mantissa: mantissa,
        optionalMantissa: true
    });
}
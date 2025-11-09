export function getMedicineURL(medicine = '', store = '', district='') {
    return `https://gorzdrav.spb.ru/_api/api/v2/medication/pharmacies/search?nom=${medicine}&isLgot=true&district=${district}&drugStore=${store}`
}

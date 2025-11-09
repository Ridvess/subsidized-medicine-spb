import {isNotEmptyTextNode} from "eslint-plugin-vue/lib/utils/indent-utils";

export function saveFavourite(code, data) {
    let savedData = JSON.parse(localStorage.getItem(code))
    let result = []

    if (savedData) {
        const index = savedData.findIndex(item => item === data)
        if (index !== -1)
            savedData.splice(index, 1)
        else {
            savedData.push(data)
        }

        localStorage.setItem(code, JSON.stringify(savedData))
    } else {
        result.push(data)
        localStorage.setItem(code, JSON.stringify(result))
    }
}

export function checkFavourite(code, data) {
    let savedData = localStorage.getItem(code)
    return savedData ? savedData.includes(data) : false
}

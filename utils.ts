// import {twMerge} from "tailwind-merge"

export function formatDate (date:string) {
    return new Date(date).toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })
}
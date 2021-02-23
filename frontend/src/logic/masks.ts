export const zipCodeMask = (zipcode: string): string => {
    let formatedZipcode = zipcode.replace(/[^\d]/g, '')
    if (formatedZipcode.length >= 6) {
        formatedZipcode = formatedZipcode.replace(/(\d{5})(\d{1,3})/, '$1-$2')
    }
    return formatedZipcode
}

export const documentMask = (document: string): string => {
    let formatedDocument = document.replace(/[^\d]/g, '')
    if (formatedDocument.length === 11) {
        formatedDocument = formatedDocument.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4'
        )
    }
    return formatedDocument
}

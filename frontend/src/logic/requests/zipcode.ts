import { ZipCodeProps } from 'types/zipcode'
import api from 'logic/api'

export const getAddressByZipCode = async (
    zipCode: number
): Promise<ZipCodeProps> => {
    const { data } = await api.get(
        `${process.env.REACT_APP_ZIPCODE_API_URL}/${zipCode}/json`
    )

    return data
}

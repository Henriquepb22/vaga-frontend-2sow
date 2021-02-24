import { ZipCodeProps } from 'types/zipcode'
import api, { signal } from 'logic/api'

export const getAddressByZipCode = async (
    zipCode: string
): Promise<ZipCodeProps> => {
    const { data } = await api.get(
        `${process.env.REACT_APP_ZIPCODE_API_URL}/${zipCode}/json`,
        {
            cancelToken: signal.token
        }
    )

    return data
}

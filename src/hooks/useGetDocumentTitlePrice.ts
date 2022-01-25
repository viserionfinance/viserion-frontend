import {useEffect} from 'react'
import {useCakeBusdPrice} from 'hooks/useBUSDPrice'

const useGetDocumentTitlePrice = () => {
    const cakePriceBusd = useCakeBusdPrice()
    useEffect(() => {
        const cakePriceBusdString = cakePriceBusd ? cakePriceBusd.toFixed(2) : ''
        // document.title = `Viserion Finance - ${cakePriceBusdString}`
        document.title = `Viserion Finance`
    }, [cakePriceBusd])
}
export default useGetDocumentTitlePrice

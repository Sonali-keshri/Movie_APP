import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/api'

const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=>{
            setLoading("....Loading")
            setData(null)
            setError(null)

            fetchFromAPI(url)
            .then((res)=>{
                setLoading(false);
                setData(res);
            })
            .catch((err)=>{
                setLoading(false)
                setError("Something went wrong!");
            })
    }, [url])
  return { data, loading, error}
}

export default useFetch
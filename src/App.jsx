import { useEffect } from "react"
import { fetchFromAPI } from "./utils/api"
import { useSelector, useDispatch } from "react-redux"
import { getApiConfiguration, getGenres } from "./store/Slice/homeSlice"
import Header from "../src/components/header/Header"
import Footer from "../src/components/footer/Footer"
import { Outlet } from "react-router-dom"

function App() {

  const url = useSelector((store) => store.home.url)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchData()
    genresCall()
  }, [])

  const fetchData = async () => {
    const data = await fetchFromAPI("/configuration")

    const url = {
      backdrop: data.images.secure_base_url + "original",
      poster: data.images.secure_base_url + "original",
      profile: data.images.secure_base_url + "original",
    }

    dispatch(getApiConfiguration(url))

  }

  const genresCall =  async () => {
    const promises = []
    const endpoints = ["tv", "movie"]
    const allGenres = {}

    endpoints.forEach((url) => {
      promises.push(fetchFromAPI(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises)
    // console.log("promise",data)

    data.map(({genres})=>{
        return genres.map((item)=> allGenres[item.id]= item)
    })

    dispatch(getGenres(allGenres))
    // console.log(("allgenres", allGenres))
  }

    return (
      <>
        <Header />
        <Outlet />
        <Footer />
        {/* <h1>App js</h1> */}
      </>
    )
  }

  export default App

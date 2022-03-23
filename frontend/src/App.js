import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import TypeSelector from './TypeSelector'; // Type selector and search bar component
import CustomMarker from './CustomMarker';
import './App.css';

function App() {
  const [respData, setRespData] = useState('')
  const getData = async () => {
    const resp = await fetch(process.env.REACT_APP_MY_FETCH_URL) // Server URL in .env file
    const respJson = await resp.json()
    setRespData(respJson)
  }

  useEffect(() => {
    getData()
  }, [])

  const checkedState = [true, true, true, true] // One state for each marker type
  const [checkedType, setCheckedType] = useState(checkedState)
  const [searchInput, setSearchInput] = useState('') // Search bar input

  // Checks the state of each marker, and updates it onChange
  const handleChange = (position) => {
    const updatedCheckedType = checkedType.map((item, index) => {
      return index === position ? !item : item
    })
    setCheckedType(updatedCheckedType)
  }

  // Function for updating search state
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
  }

  if (respData) {
    return (
      <>
        <MapContainer center={[44.033333, 20.800000]} zoom={window.innerWidth <= 1000 ? 6 : 7} style={{ zIndex: 1 }} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
          />
          { // Map data and return a marker for each type, then filter each type
            respData.map(point => {
              return CustomMarker(point, checkedType) // Return custom marker as a function
            }).filter((marker) => {
              if (!checkedType[0]) {
                return marker.props.type !== 'RADOVI'
              }
              return marker
            }).filter((marker) => {
              if (!checkedType[1]) {
                return marker.props.type !== 'ZABRANE'
              }
              return marker
            }).filter((marker) => {
              if (!checkedType[2]) {
                return marker.props.type !== 'OBUSTAVE'
              }
              return marker
            }).filter((marker) => {
              if (!checkedType[3]) {
                return marker.props.type !== 'ODRONI/KLIZIŠTA'
              }
              return marker
            }).filter((search) => {
              let x = search.props.desc
              return x.toLowerCase().includes(searchInput.toLowerCase())
            })

          }
        </MapContainer >
        <TypeSelector checkedType={checkedType} handleChange={handleChange} searchItems={searchItems} />
      </>
    )
  } else {
    return <>Loading...</>
  }
}

export default App;
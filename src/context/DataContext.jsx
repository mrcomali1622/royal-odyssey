import { createContext, useContext, useState } from 'react'
import { TOURS, ALBUMS, ANNOUNCEMENTS } from '../data/mockData'

const DataContext = createContext()

export function DataProvider({ children }) {
  const [tours, setTours] = useState(TOURS)
  const [albums, setAlbums] = useState(ALBUMS)
  const [announcements, setAnnouncements] = useState(ANNOUNCEMENTS)

  return (
    <DataContext.Provider value={{
      tours, setTours,
      albums, setAlbums,
      announcements, setAnnouncements,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)

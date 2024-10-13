import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Search, RefreshCw, Filter, MoreHorizontal, Calendar, Hotel, Tag, FileText, User, Flag, X, Info, Minus, Plus } from 'lucide-react'

interface Booking {
  id: number
  propertyId: number
  guestName: string
  startDate: Date
  endDate: Date
  price: number
}

interface DateRange {
  start: Date
  end: Date
}

const ReservationForm = ({ onClose, selectedDateRange, selectedProperty, onAddBooking }: { 
  onClose: () => void, 
  selectedDateRange: DateRange, 
  selectedProperty: string,
  onAddBooking: (booking: Omit<Booking, 'id'>) => void
}) => {
  const [activeTab, setActiveTab] = useState('RESERVIERUNGSDETAILS')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [pets, setPets] = useState(0)
  const [guestName, setGuestName] = useState('')

  const handleAddClose = () => {
    if (guestName) {
      onAddBooking({
        propertyId: properties.find(p => p.name === selectedProperty)?.id || 0,
        guestName,
        startDate: selectedDateRange.start,
        endDate: selectedDateRange.end,
        price: 75 // This is a placeholder price, you might want to calculate it based on the number of days and other factors
      })
      onClose()
    } else {
      alert('Please enter the guest name')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Add new reservation (+)</span>
            <span>|</span>
            <span>Price 75.00 €</span>
            <span>|</span>
            <span>Discount: 0.00 €</span>
            <span>|</span>
            <span>TOTAL: 75.00 €</span>
          </div>
          <button onClick={onClose}><X className="w-6 h-6" /></button>
        </div>

        <div className="p-4">
          <div className="flex space-x-4 mb-4">
            <button
              className={`px-4 py-2 ${activeTab === 'PANELS' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('PANELS')}
            >
              PANELS
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'RESERVIERUNGSDETAILS' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('RESERVIERUNGSDETAILS')}
            >
              RESERVIERUNGSDETAILS
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'PREISDETAILS' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('PREISDETAILS')}
            >
              PREISDETAILS
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'DISCOUNT' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('DISCOUNT')}
            >
              DISCOUNT:
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-4">
              <div>
                <button className="w-full bg-red-500 text-white py-2">RENT</button>
              </div>
              <div>
                <button className="w-full bg-gray-200 py-2">NOTES</button>
              </div>
              <div>
                <button className="w-full bg-gray-200 py-2">EXTRA</button>
              </div>
            </div>

            <div className="col-span-2 space-y-4">
              <div>
                <label className="block mb-1">Eigentum</label>
                <select className="w-full border p-2">
                  <option>{selectedProperty}</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Guest Name</label>
                <input
                  type="text"
                  className="w-full border p-2"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter guest name"
                />
              </div>

              <div>
                <label className="block mb-1">Tarif (1 items)</label>
                <select className="w-full border p-2">
                  <option>Standard</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Stammen aus:</label>
                  <div className="flex">
                    <input type="date" className="border p-2 w-2/3" defaultValue={selectedDateRange.start.toISOString().split('T')[0]} />
                    <input type="time" className="border p-2 w-1/3" defaultValue="14:00" />
                  </div>
                </div>
                <div>
                  <label className="block mb-1">Datum bis:</label>
                  <div className="flex">
                    <input type="date" className="border p-2 w-2/3" defaultValue={selectedDateRange.end.toISOString().split('T')[0]} />
                    <input type="time" className="border p-2 w-1/3" defaultValue="11:00" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Erwachsene</label>
                  <div className="flex items-center">
                    <button onClick={() => setAdults(Math.max(0, adults - 1))} className="border p-2"><Minus className="w-4 h-4" /></button>
                    <input type="number" className="border-t border-b p-2 w-16 text-center" value={adults} readOnly />
                    <button onClick={() => setAdults(adults + 1)} className="border p-2"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
                <div>
                  <label className="block mb-1">Kinder</label>
                  <div className="flex items-center">
                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="border p-2"><Minus className="w-4 h-4" /></button>
                    <input type="number" className="border-t border-b p-2 w-16 text-center" value={children} readOnly />
                    <button onClick={() => setChildren(children + 1)} className="border p-2"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Infants</label>
                  <div className="flex items-center">
                    <button onClick={() => setInfants(Math.max(0, infants - 1))} className="border p-2"><Minus className="w-4 h-4" /></button>
                    <input type="number" className="border-t border-b p-2 w-16 text-center" value={infants} readOnly />
                    <button onClick={() => setInfants(infants + 1)} className="border p-2"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
                <div>
                  <label className="block mb-1">Haustiere</label>
                  <div className="flex items-center">
                    <button onClick={() => setPets(Math.max(0, pets - 1))} className="border p-2"><Minus className="w-4 h-4" /></button>
                    <input type="number" className="border-t border-b p-2 w-16 text-center" value={pets} readOnly />
                    <button onClick={() => setPets(pets + 1)} className="border p-2"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div>
                  <h3 className="font-bold">PER DAY</h3>
                  <p className="text-2xl text-blue-500">75.00 €</p>
                </div>
                <div>
                  <h3 className="font-bold">PRICE</h3>
                  <p className="text-2xl text-blue-500">75.00 €</p>
                </div>
                <div>
                  <h3 className="font-bold">ITEMS</h3>
                  <p className="text-2xl text-blue-500">0.00 €</p>
                </div>
                <div>
                  <h3 className="font-bold">TOTAL</h3>
                  <p className="text-2xl text-blue-500">75.00 €</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <div className="space-x-2">
              <button className="border p-2 rounded"><Info className="w-4 h-4" /></button>
              <button className="border p-2 rounded">Formular schließen</button>
              <button className="bg-green-500 text-white p-2 rounded">Add group</button>
            </div>
            <div className="space-x-2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Durchsuchbar</span>
              </label>
              <button className="bg-blue-500 text-white p-2 rounded">Add & Edit</button>
              <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAddClose}>Add & Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const properties = [
  { id: 1, name: 'PARKPLATZ' },
  { id: 2, name: 'I LOVE IS IN THE AIR' },
  { id: 3, name: 'CRAZY LOVE' },
  { id: 4, name: 'DREAM, DREAM, DREAM' },
  { id: 5, name: 'MY ONLY SUNSHINE' },
  { id: 6, name: 'MADE FOR ME AND YOU' },
  { id: 7, name: 'WONDERFUL TONIGHT' },
  { id: 8, name: 'WAITING FOR LOVE' },
  { id: 9, name: 'SOUND OF LOVE' },
  { id: 10, name: 'FEELING GOOD' },
  { id: 11, name: 'FIELDS OF GOLD' },
  { id: 12, name: 'LET THERE BE LOVE' },
]

export default function CalendarInterface() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState('KAL')
  const [searchTerm, setSearchTerm] = useState('')
  const [showReservationForm, setShowReservationForm] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null)
  const [selectedProperty, setSelectedProperty] = useState('')
  const [isSelecting, setIsSelecting] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 1, propertyId: 2, guestName: 'LANA', startDate: new Date(2024, 9, 4), endDate: new Date(2024, 9, 7), price: 420 },
    { id: 2, propertyId: 4, guestName: 'FELIX', startDate: new Date(2024, 9, 5), endDate: new Date(2024, 9, 8), price: 350 },
  ])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const generateDates = () => {
    const days = getDaysInMonth(currentDate)
    return Array.from({ length: days }, (_, i) => {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
      return {
        date,
        day: date.getDate(),
        weekday: date.toLocaleString('default', { weekday: 'short' })
      }
    })
  }

  const dates = generateDates()

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleSearch = () => {
    console.log('Searching for:', searchTerm)
  }

  const handleRefresh = () => {
    console.log('Refreshing data')
  }

  const handleFilter = () => {
    console.log('Opening filter options')
  }

  const handleMouseDown = (propertyId: number, date: Date) => {
    setIsSelecting(true)
    setSelectedDateRange({ start: date, end: date })
    setSelectedProperty(properties.find(p => p.id === propertyId)?.name || '')
  }

  const handleMouseMove = (date: Date) => {
    if (isSelecting && selectedDateRange) {
      setSelectedDateRange(prev => ({
        start: prev!.start,
        end: date > prev!.start ? date : prev!.start
      }))
    }
  }

  const handleMouseUp = () => {
    if (isSelecting && selectedDateRange) {
      setIsSelecting(false)
      setShowReservationForm(true)
    }
  }

  const handleAddBooking = (newBooking: Omit<Booking, 'id'>) => {
    setBookings(prevBookings => [
      ...prevBookings,
      { ...newBooking, id: prevBookings.length + 1 }
    ])
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isSelecting) {
        setIsSelecting(false)
        if (selectedDateRange && selectedDateRange.start !== selectedDateRange.end) {
          setShowReservationForm(true)
        } else {
          setSelectedDateRange(null)
        }
      }
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isSelecting, selectedDateRange])

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">KALENDER</h1>
          <div className="flex space-x-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded">399 MIETEN</button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded">115 STORNIERTE MIETEN</button>
          </div>
        </div>
        
        <div className="flex space-x-4 mb-4">
          <button 
            className={`flex items-center space-x-1 px-3 py-2 border rounded ${activeTab === 'KAL' ? 'bg-blue-100' : ''}`}
            onClick={() => setActiveTab('KAL')}
          >
            <Calendar className="w-4 h-4" />
            <span>KAL</span>
          </button>
          <button 
            className={`flex items-center space-x-1 px-3 py-2 border rounded ${activeTab === 'MIETEN' ? 'bg-blue-100' : ''}`}
            onClick={() => setActiveTab('MIETEN')}
          >
            <User className="w-4 h-4" />
            <span>MIETEN</span>
          </button>
          <button 
            className={`flex items-center space-x-1 px-3 py-2 border rounded ${activeTab === 'PREIS' ? 'bg-blue-100' : ''}`}
            onClick={() => setActiveTab('PREIS')}
          >
            <FileText className="w-4 h-4" />
            <span>PREIS</span>
          </button>
          <button 
            className={`flex items-center space-x-1 px-3 py-2 border rounded ${activeTab === 'HOTEL' ? 'bg-blue-100' : ''}`}
            onClick={() => setActiveTab('HOTEL')}
          >
            <Hotel className="w-4 h-4" />
            <span>HOTEL</span>
          </button>
          <button 
            className={`flex items-center space-x-1 px-3 py-2 border rounded ${activeTab === 'TAG' ? 'bg-blue-100' : ''}`}
            onClick={() => setActiveTab('TAG')}
          >
            <Tag className="w-4 h-4" />
            <span>TAG</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4 mb-4">
          <button className="p-2 border rounded" onClick={handlePrevMonth}><ChevronLeft className="w-4 h-4" /></button>
          <input 
            type="text" 
            className="border rounded px-2 py-1" 
            value={currentDate.toLocaleDateString()} 
            readOnly 
          />
          <span>24</span>
          <input type="text" className="border rounded px-2 py-1 w-16" placeholder="1" />
          <button className="p-2 border rounded" onClick={handleNextMonth}><ChevronRight className="w-4 h-4" /></button>
          <button className="p-2 border rounded" onClick={handleSearch}><Search className="w-4 h-4" /></button>
          <button className="p-2 border rounded" onClick={handleRefresh}><RefreshCw className="w-4 h-4" /></button>
          <button className="p-2 border rounded" onClick={handleFilter}><Filter className="w-4 h-4" /></button>
          <input 
            type="text" 
            className="border rounded px-2 py-1 flex-grow" 
            placeholder="name of property" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="p-2 border rounded"><MoreHorizontal className="w-4 h-4" /></button>
        </div>
        
        <div className="overflow-x-auto" ref={calendarRef}>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-2 border-gray-300 p-2 w-48 bg-gray-100">Eigenschaften</th>
                {dates.map((date) => (
                  <th key={date.day} className="border-2 border-gray-300 p-2 w-96 bg-gray-100">
                    <div>{date.weekday}</div>
                    <div>{date.day}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td className="border-2 border-gray-300 p-2 w-48">{property.name}</td>
                  {dates.map((date) => {
                    const booking = bookings.find(
                      (b) => b.propertyId === property.id &&
                      date.date >= b.startDate &&
                      date.date <= b.endDate
                    )
                    const isSelected = selectedDateRange &&
                      date.date >= selectedDateRange.start &&
                      date.date <= selectedDateRange.end &&
                      property.name === selectedProperty
                    const isFirstDay = booking && date.date.getTime() === booking.startDate.getTime()
                    const isLastDay = booking && date.date.getTime() === booking.endDate.getTime()

                    return (
                      <td 
                        key={date.day} 
                        className={`border-2 border-gray-300 p-0 w-96 h-24 relative ${isSelected ? 'bg-blue-200' : ''}`}
                        onMouseDown={() => handleMouseDown(property.id, date.date)}
                        onMouseMove={() => handleMouseMove(date.date)}
                        onMouseUp={handleMouseUp}
                      >
                        {booking && (
                          <div 
                            className={`absolute top-1 bottom-1 left-1 right-1 bg-blue-500 text-white text-sm p-1 flex items-center justify-center
                              rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200
                              ${isFirstDay ? 'rounded-l-lg' : ''} ${isLastDay ? 'rounded-r-lg' : ''}`}
                            style={{
                              clipPath: isFirstDay ? 'inset(0 0 0 50%)' : isLastDay ? 'inset(0 50% 0 0)' : 'none',
                              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                            }}
                          >
                            <span className="truncate">{booking.guestName} - {booking.price}€</span>
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showReservationForm && selectedDateRange && (
        <ReservationForm 
          onClose={() => {
            setShowReservationForm(false)
            setSelectedDateRange(null)
          }} 
          selectedDateRange={selectedDateRange}
          selectedProperty={selectedProperty}
          onAddBooking={handleAddBooking}
        />
      )}
    </div>
  )
}

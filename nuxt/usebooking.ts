import {
  createItem,
  readItems,
  readItem,
  updateItem,
  deleteItem,
} from '@directus/sdk'

export const useBookings = () => {
  const { $directus } = useNuxtApp()

  const createBooking = (data: {
    pickup_location: string
    date: string
    mobile: string
  }) =>
    $directus.request(
      createItem('bookings', {
        ...data,
        status: 'pending',
      })
    )

  const getAllBookings = () =>
    $directus.request(
      readItems('bookings', {
        sort: ['-date_created'],
        fields: ['id', 'pickup_location', 'date', 'mobile', 'status', 'date_created'],
      })
    )
  const getBooking = (id: number) =>
    $directus.request(readItem('bookings', id))

  const updateBooking = (id: number, data: { status: string }) =>
    $directus.request(updateItem('bookings', id, data))

  const deleteBooking = (id: number) =>
    $directus.request(deleteItem('bookings', id))

  return {
    createBooking,
    getAllBookings,
    getBooking,
    updateBooking,
    deleteBooking,
  }
}
const version = 'v1'

const urlDoc = {
  auth: {
    login: { url: '/login', type: 'post' },
    logout: { url: '/logout', type: 'post' },
    register: { url: '/register', type: 'post' },
    // email verify
    sendVerification: { url: '/send-verification-email', type: 'post' },
    verifyEmail: { url: '/verify-email', type: 'post' },
    // forget password
    forgetPassword: { url: '/forgot-password', type: 'post' },
    resetPassword: { url: '/reset-password', type: 'post' },
    verifyToken: { url: '/verify-token', type: 'post' }
  },
  userDashboard: {
    stations: { url: `/${version}/location/all`, type: 'get' },
    search: { url: `/${version}/train-schedule/search`, type: 'post' },
    seats: { url: `/${version}/train-schedule/seats`, type: 'post' },
    reserve: { url: `/${version}/user/reservation`, type: 'post' },
    getReservations: { url: `/${version}/user/reservations`, type: 'get' },
    // not intergrated
    getTotalReservations: {
      url: `/${version}/user/reservations/count`,
      type: 'get'
    },
    editUser: {
      url: `/${version}/user/update`,
      type: 'post'
    },
    getUser: {
      url: `/${version}/user`,
      type: 'get'
    },
    getReservationsCount: {
      url: `/${version}/user/reservations/count`
    },
    tracking:{
      url: `/${version}/user/tracking`,
      type: 'get'
    }
  },
  admin: {
    getAllUsers: { url: `/${version}/dashboard/user/all`, type: 'get' },
    deleteUser: { url: `/${version}/dashboard/user`, type: 'delete' },
    editUser: { url: `/${version}/dashboard/user/edit`, type: 'post' },
    getAllReservations: {
      url: `/${version}/dashboard/reservations/all`,
      type: 'get'
    },
    addSchedule: { url: `/${version}/dashboard/schedule/add`, type: 'post' },
    getAllReservation: {
      url: `/${version}/dashboard/reservations/all`,
      type: 'post'
    },
    getStatistics: { url: `/${version}/dashboard/statistics`, type: 'get' },
    getRoutes: { url: `/${version}/dashboard/train-routes/all`, type: 'get' },
    getSchedules: {
      url: `/${version}/dashboard/train-schedule/all`,
      type: 'get'
    },
    deleteSchedule: {
      url: `/${version}/dashboard/train-schedule`,
      type: 'delete'
    },
    getAllTrains: { url: `/${version}/dashboard/trains`, type: 'get' },
    addNewSchedule: {
      url: `/${version}/dashboard/train-schedule/add`,
      type: 'post'
    }
  }
}

export default urlDoc

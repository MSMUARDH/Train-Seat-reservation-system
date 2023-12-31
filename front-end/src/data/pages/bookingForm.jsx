import dayjs from 'dayjs'
import { BiSolidSelectMultiple } from 'react-icons/bi'
import { Space } from 'antd'
import { MdEventSeat, MdPayment, MdSearch, MdRule } from 'react-icons/md'
import { CommonTag } from '../../components'

const todayDate = new Date()
const formattedDate = date => dayjs(date).format('YYYY-MM-DD')
const formatDateForValidate = date => {
  if (date === undefined) {
    return -1
  }
  return Number(dayjs(date).format('YYYYMMDD'))
}
const formattedTime = dayjs(todayDate).format('HH:mm')

const data = {
  formHeader: 'Search Train',
  formBtnText: 'Search',
  steps: [
    {
      title: 'Back to Search',
      icon: <MdSearch />
    },
    {
      title: 'Select Train',
      icon: <MdRule />
    },
    {
      title: 'Select Seat',
      icon: <MdEventSeat />
    },
    {
      title: 'Payment',
      icon: <MdPayment />
    }
  ],
  fields: stations => [
    {
      label: 'From',
      name: 'from',
      rules: [
        { required: true, message: 'Please enter your departure station!' }
      ],
      type: 'select',
      autoComplete: 'on',
      hasFeedback: true,
      placeholder: 'Colombo Fort',
      options: stations,
      allowClear: true,
      autoFocus: true,
      disabled: !stations.length,
      showArrow: false
    },
    {
      label: 'To',
      name: 'to',
      rules: [
        { required: true, message: 'Please enter your departure station!' },
        ({ getFieldValue }) => ({
          validator (_, value) {
            if (!value || getFieldValue('from') !== value) {
              return Promise.resolve()
            }
            return Promise.reject(
              new Error('Please select a different station!')
            )
          }
        })
      ],
      type: 'select',
      autoComplete: 'on',
      hasFeedback: true,
      placeholder: 'Colombo Fort',
      options: stations,
      allowClear: true,
      autoFocus: false,
      disabled: !stations.length,
      showArrow: false
    },
    {
      label: 'Date',
      name: 'departureDate',
      rules: [
        { required: true, message: 'Please enter valid date!' },
        { type: 'date', message: 'Please enter valid date!' }
      ],
      type: 'date',
      autoComplete: 'on',
      hasFeedback: true,
      placeholder: formattedDate(todayDate),
      allowClear: true,
      autoFocus: false,
      showToday: true,
      disabledDate: current => {
        let customDate = dayjs().format('YYYY-MM-DD')
        return current && current < dayjs(customDate, 'YYYY-MM-DD')
      }
    },
    {
      label: 'Start & End Time',
      name: 'time',
      type: 'timeRange',
      autoComplete: 'on',
      hasFeedback: true,
      placeholder: formattedTime,
      allowClear: true,
      autoFocus: false,
      format: 'HH:mm',
      minuteStep: 30
    },
    // {
    //   label: 'Return',
    //   name: 'return',
    //   type: 'switch',
    //   checkedChildren: 'Return train',
    //   unCheckedChildren: 'One way train',
    //   valuePropName: 'checked'
    // },
    {
      label: 'No of Passengers',
      name: 'passengers',
      rules: [{ required: true, message: 'Please enter number of Passengers' }],
      type: 'number',
      autoComplete: 'on',
      hasFeedback: true,
      placeholder: '1',
      allowClear: true,
      autoFocus: false,
      min: 1,
      max: 5,
      tooltip: true,
      tooltipText: (
        <span className='break-keep text-[0.8rem] w-20 text-blue-500 cursor-help '>
          more info
        </span>
      ),
      tooltipTitle: 'Only allowed passengers  in between 1 to 5 per booking'
    },
    {
      label: 'Return Date',
      name: 'returnDate',
      rules: [
        { required: false, message: 'Please enter valid date!' },
        { type: 'date', message: 'Please enter valid date!' },
        ({ getFieldValue }) => ({
          validator (_, value) {
            if (
              formatDateForValidate(getFieldValue('departureDate')) <
              formatDateForValidate(value)
            ) {
              return Promise.resolve()
            }
            return Promise.reject(
              new Error(
                'Return date should be higher date than departure date!'
              )
            )
          }
        })
      ],
      type: 'date',
      autoComplete: 'on',
      hasFeedback: true,
      placeholder: formattedDate(todayDate),
      allowClear: false,
      autoFocus: false,
      showToday: true,
      disabledDate: current => {
        let customDate = dayjs().format('YYYY-MM-DD')
        return current && current < dayjs(customDate, 'YYYY-MM-DD')
      }
    }
  ],
  tableColumns: (setBookingState, setSelectedTrain) => [
    {
      title: 'Train name',
      dataIndex: 'train_name',
      key: 'train_name'
    },
    {
      title: 'Departs',
      dataIndex: 'departure_time',
      key: 'departure_time',
      render: (_, { departure_time }) => {
        return (
          <Space direction='vertical'>
            <div>{dayjs(departure_time).format('YYYY-MM-DD')}</div>
            <div>{dayjs(departure_time).format('hh:mm A')}</div>
          </Space>
        )
      }
    },
    {
      title: 'Arrives',
      dataIndex: 'arrival_time',
      key: 'arrival_time',
      render: (_, { arrival_time }) => {
        return (
          <Space direction='vertical'>
            <div>{dayjs(arrival_time).format('YYYY-MM-DD')}</div>
            <div>{dayjs(arrival_time).format('hh:mm A')}</div>
          </Space>
        )
      }
    },
    {
      title: 'Class',
      dataIndex: 'schedule_seats',
      key: 'schedule_seats',
      render: (_, { schedule_seats }) => {
        return (
          <Space direction='vertical'>
            {console.log(schedule_seats)}
            {schedule_seats?.map((item, idx) => {
              return (
                <CommonTag
                  item={item}
                  key={idx}
                  type='class'
                  seatCount={20 - item.available_count}
                  ClassId
                />
              )
            })}
          </Space>
        )
      }
    },
    {
      title: 'Available',
      dataIndex: 'schedule_seats',
      key: 'schedule_seats',
      render: (_, { schedule_seats }) => {
        return (
          <Space direction='vertical'>
            {schedule_seats?.map((item, idx) => {
              return <CommonTag item={item} key={idx} type='seats' ClassId />
            })}
          </Space>
        )
      }
    },
    {
      title: 'Price',
      dataIndex: 'schedule_price',
      key: 'schedule_price',
      render: (_, { schedule_price }) => {
        return (
          <Space direction='vertical'>
            {schedule_price?.map((item, idx) => {
              return <CommonTag item={item} key={idx} type='price' ClassId/>
            })}
          </Space>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: row => (
        <div
          className='flex items-center justify-start gap-4'
          onClick={() => {
            setBookingState(2)
            setSelectedTrain(row)
          }}
        >
          <span className='text-sky-500'>Select</span>
          <BiSolidSelectMultiple className='text-sky-600' />
        </div>
      )
    }
  ]
}

export default data

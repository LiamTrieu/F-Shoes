import TimelineEvent from '@mailtop/horizontal-timeline/dist/TimelineEvent'
import { FaRegFileAlt, FaTrash, FaTruck } from 'react-icons/fa'
import { GiConfirmed } from 'react-icons/gi'
import { IoCloudDoneSharp } from 'react-icons/io5'
import { MdPaid } from 'react-icons/md'
import { AiOutlineDeliveredProcedure } from 'react-icons/ai'
import { getStatus } from '../../../services/constants/statusHoaDon'
import dayjs from 'dayjs'
const { Timeline } = require('@mailtop/horizontal-timeline')

const TimeLine = (props) => {
  const { orderTimeLine } = props

  return (
    <Timeline>
      {orderTimeLine.map((item, index) => {
        let color
        let icon

        switch (item.statusBill) {
          case 1:
            color = '#00CC00'
            icon = FaRegFileAlt
            break
          case 2:
            color = '#FFD700'
            icon = GiConfirmed
            break
          case 3:
            color = '#FF5733'
            icon = FaTruck
            break
          case 4:
            color = '#FF9933'
            icon = AiOutlineDeliveredProcedure
            break
          case 5:
            color = '#FFC733'
            icon = MdPaid
            break
          case 6:
            color = '#FFAA33'
            icon = FaRegFileAlt
            break
          case 7:
            color = '#FF1233'
            icon = IoCloudDoneSharp
            break
          case 0:
            color = 'gray'
            icon = FaTrash
            break
          default:
            color = '#000000'
            icon = FaRegFileAlt
            break
        }

        return (
          <TimelineEvent
            key={index}
            color={color}
            icon={icon}
            title={<h3 className="mt-2">{getStatus(item.statusBill)}</h3>}
            subtitle={dayjs(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}
          />
        )
      })}
    </Timeline>
  )
}

export default TimeLine

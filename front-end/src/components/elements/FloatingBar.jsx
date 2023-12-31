import { useContext } from 'react'
import { FloatButton } from 'antd'
import { PiTrainFill } from 'react-icons/pi'
import data from '../../data/components/sideBar'
import appDataContext from '../../context/AppDataContext'

const FloatingBar = ({
  trigger = 'click',
  type = 'primary',
  className,
  isAdmin
}) => {
  const [activeTabIndex, setActiveTabIndex] = useContext(appDataContext)
  
  const menuItems = isAdmin ? data.adminMenu : data.menu
  return (
    <div className={className}>
      <FloatButton.Group
        trigger={trigger}
        type={type}
        style={{
          right: 24
        }}
        icon={<PiTrainFill className='fill-white' />}
      >
        {menuItems?.map((item, idx) => (
          <FloatButton
            icon={item.icon(activeTabIndex === idx + 1)}
            key={idx}
            type={type}
            onClick={() =>
              item?.type !== 'logout'
                ? setActiveTabIndex(idx + 1)
                : item.onClick()
            }
            tooltip={item.title}
          />
        ))}
      </FloatButton.Group>
    </div>
  )
}

export default FloatingBar

import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { decreaseItemsQuantity, increaseItemsQuantity } from './cartSlice'

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch()

  function handleDecreaseQuantity() {
    dispatch(decreaseItemsQuantity(pizzaId))
  }
  function handleIncreaseQuantity() {
    dispatch(increaseItemsQuantity(pizzaId))
  }

  return (
    <div className="flex gap-1 items-center md:gap-3">
      <Button type="round" onClick={handleDecreaseQuantity}>
        -
      </Button>
      <span className="text-sm font-semibold text-slate-600">
        {currentQuantity}
      </span>
      <Button type="round" onClick={handleIncreaseQuantity}>
        +
      </Button>
    </div>
  )
}

export default UpdateItemQuantity

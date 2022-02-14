import {
  ButtonHTMLAttributes,
  ChangeEventHandler,
  DetailedHTMLProps,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import Popover from '../Popover'

import './styles.css'

export type FilterOptions = {
  name: string
  value: string | number
  checked?: boolean
}

export type FilterButtonProps =
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
  & {
    options: FilterOptions[]
    onApply: (selected: (string|number)[]) => void
  }

const FilterButton:FC<FilterButtonProps> = ({ options, onApply, ...rest }) => {
  const buttonRef = useRef(null)

  const [openFilters, setOpenFilters] = useState<boolean>(false)
  const [selected, setSelected] = useState<(string|number)[]>([])

  const toggleFilters = () => setOpenFilters(prev => !prev)

  const handleClose = () => setOpenFilters(false)

  const handleOption: ChangeEventHandler<HTMLInputElement> = (e) => {
    const isChecked = e.target.checked
    const value = e.target.value

    if (isChecked) {
      setSelected(prev => [...prev, value])
    } else {
      setSelected(prev => {
        const _prev = [...prev]
        const index = _prev.indexOf(value)
        _prev.splice(index, 1)
        return _prev
      })
    }
  }

  const handleApply = useCallback(() => {
    onApply(selected)
    handleClose()
  }, [selected])

  useEffect(() => {
    setSelected(options
      .filter(i => i.checked)
      .map(i => i.value)
    )
  }, [options])

  return (
    <>
      <button {...rest} ref={buttonRef} onClick={toggleFilters} />
      { Boolean(options.length) && (
      <Popover
        open={openFilters}
        onClose={handleClose}
        referenceElement={buttonRef.current}
      >
        <div className='options-wrapper'>

            <>
              {options.map((option, index) => {
                const id = `${index}-${option.value}`
                return (
                  <div key={index} className='option-control'>
                    <input
                      type='checkbox'
                      value={option.value}
                      checked={selected.some(i => i === option.value)}
                      id={id}
                      onChange={handleOption}
                    />
                    <label htmlFor={id}>{option.name}</label>
                  </div>
                )
              })}

              <button onClick={handleApply}>Aplicar</button>
            </>

        </div>
      </Popover>
      )}
    </>
  )
}

export default FilterButton

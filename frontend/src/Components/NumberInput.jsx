/* important this is an old component and is not in use*/

import {useState} from 'react'
import { Plus, Minus } from 'lucide-react';

function NumberInput({ 
  min = 0, 
  max = 4, 
  step = 1, 
  initialValue = 1,
  disabled,
  onChange
}) {
  const [value, setValue] = useState(initialValue);

  const handleInputChange = (e) => {
    const newValue = e.target.value === '' ? '' : Number(e.target.value);
    if (newValue === '' || (newValue >= min && newValue <= max)) {
      setValue(newValue);
      onChange && onChange(newValue);
    }
  };

  const handleBlur = () => {
    if (value === '') {
      setValue(min);
      onChange && onChange(min);
    }
  };

  const increment = () => {
    const newValue = Math.min(value + step, max);
    setValue(newValue);
    onChange && onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(value - step, min);
    setValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <div className="flex items-center w-max gap-2">
   <button
    type="button"
  className="block h-max w-max p-0 bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent hover:opacity-70 active:text-black disabled:opacity-50"
  onClick={decrement}
  disabled={value <= min || disabled}
>
  <Minus className="h-4 w-4 text-black active:text-black" />
</button>

      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        min={min}
        max={max}
        step={step}
        className="w-12 h-8 text-center mx-0 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2  focus:border-transparent"
        disabled={disabled}
      />
      <button
  type="button"
  className="block  h-max w-max p-0 mx-0 bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent hover:opacity-70 active:text-black disabled:opacity-50"
  onClick={increment}
  disabled={value >= max || disabled}
>
  <Plus className="h-4 w-4 text-black active:text-black" />
</button>
    </div>
  );
};

export default NumberInput;
import React from 'react';
import clsx from 'clsx';

const Input = ({
  label,
  value,
  type = 'text',
  placeholder = 'Enter a value',
  onChange,
  showRequired = false,
  required = true,
}) => {
  return (
    <div className="flex flex-col font-medium">
      <span className="inline-flex justify-between">
        <label
          htmlFor={label}
          className="text-sm text-primary-marine-blue "
        >
          {label}
        </label>
        {required && showRequired && (
          <p className="text-primary-starberry-red leading-3">
            This field is required
          </p>
        )}
      </span>
      <input
        type={type}
        id={label}
        value={value}
        className={clsx(
          'border border-neutral-light-gray rounded px-4 py-2 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue',
          showRequired &&
            required &&
            !value &&
            'ring-1 ring-primary-starberry-red'
        )}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;

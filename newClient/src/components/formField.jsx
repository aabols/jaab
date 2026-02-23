import classNames from 'classnames';

const fieldStyle = classNames(
    'mb-5',
);
const labelStyle = classNames(
    'block',
    'text-gray-700',
    'text-sm',
    'font-bold',
    'mb-1',
);
const inputStyle = classNames(
    'bg-gray-400',
    'appearance-none',
    'border-2',
    'border-gray-400',
    'rounded',
    'w-full',
    'py-2',
    'px-3',
    'text-gray-700',
    'leading-tight',
    'focus:outline-none',
    'focus:bg-white',
    'focus:border-blue-600',
);
const errStyle = classNames(
    'shadow',
    'appearance-none',
    'border',
    'border-red-500',
    'rounded',
    'w-full',
    'py-2',
    'px-3',
    'text-gray-700',
    'mb-1',
    'leading-tight',
    'focus:outline-none',
    'focus:shadow-outline',
);
const messageStyle = classNames(
    'text-red-500',
    'text-xs',
);

export default function FormField({ id, caption, type, error }) {
    return (
        <div className={fieldStyle}>
            <label htmlFor={id} className={labelStyle}>
                {caption}
            </label>
            <input className={error ? errStyle : inputStyle} type={type} id={id} name={id} />
            {error && <p className={messageStyle}>
                {error}
            </p>}
        </div>
    );
}

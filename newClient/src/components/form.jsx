import classNames from 'classnames';

const formStyle = classNames(
    'max-w-xs',
    'bg-white',
    'shadow-md',
    'rounded',
    'px-8',
    'py-6',
);

export default function Form({ children }) {
    return (
        <form className={formStyle}>
            {children}
        </form>
    );
}

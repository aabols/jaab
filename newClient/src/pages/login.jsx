import classNames from 'classnames';
import Form from '../components/form';
import FormField from '../components/formField';

const pageStyle = classNames(
    'h-full',
    'bg-green-950',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
);

export default function Login() {
    return (
        <div className={pageStyle}>
            <Form>
                <FormField caption='Username' id='username' type='text' />
                <FormField caption='Password' id='password' type='password' error='Do something' />
                <FormField caption='Repeat' id='repeat-password' type='password' error='Do something' />
            </Form>
        </div>
    );
}

import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { settingsActions } from '../../../../_actions/settings';
import { settingsConstants } from '../../../../_constants/settingsConstants';
import NumberInput from '../../../_shared/numberInput';
import SubmitButton from '../../../_shared/submitButton';

export default function ListsSettings() {
    const delayRef = useRef();
    const dispatch = useDispatch();
    const refreshDelay = useSelector(state => state.settings.listRefreshDelay);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(settingsActions.setRefreshDelay(delayRef.current.value));
    };

    return (
        <div id='list-settings'>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form__field'>
                    <NumberInput
                        label='Refresh delay (ms)'
                        id='refresh-delay'
                        defaultValue={refreshDelay}
                        step={500}
                        min={settingsConstants.MIN_REFRESH_DELAY}
                        ref={delayRef}
                    />
                </div>
                <div className='form__field'>
                    <SubmitButton
                        value='Save'
                    />
                </div>
            </form>
        </div>
    );
};

import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';

const COLLAPSE_LIST = [
    {
        collapse: 'Daily',
        objectID: 0,
    },
    {
        collapse: 'Weekly',
        objectID: 1,
    },
    {
        collapse: 'Monthly',
        objectID: 2,
    },
    {
        collapse: 'Quarterly',
        objectID: 3,
    },
    {
        collapse: 'Annual',
        objectID: 4,
    },
];

const RadioButtons = ({setCollapse}) => {
    return (
        <div>
            <legend>Radio Buttons</legend>
            {COLLAPSE_LIST.map(item => {
                return (
                    <div key={item.objectID}>
                        <FormGroup tag="fieldset">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={setCollapse(item.collapse)} type="radio" name='radio1' />{' '}
                                    {item.collapse}
                                </Label>
                            </FormGroup>
                        </FormGroup>
                    </div>
                );
            })}
        </div>
    );
}

export default RadioButtons;
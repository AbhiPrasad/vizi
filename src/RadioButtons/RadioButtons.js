import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import './RadioButtons.css';

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

class RadioButtons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rSelected: 'Monthly',
        }

        this.onRadioClick = this.onRadioClick.bind(this);
    }

    onRadioClick(collapse) {
        const { setCollapse } = this.props;

        setCollapse(collapse);

        this.setState({
            rSelected: collapse
        });
    }

    render() {
        return (
            <div className="text-center">
                <ButtonGroup>
                    {COLLAPSE_LIST.map(item => {
                        return (
                            <div key={item.objectID} className="collapse-btn">
                                <Button
                                    color="primary"
                                    onClick={() => this.onRadioClick(item.collapse)}
                                    active={this.state.rSelected === item.collapse}
                                >
                                    {item.collapse}
                                </Button>
                            </div>
                        );
                    })}
                </ButtonGroup>
            </div>
        );
    }
}

export default RadioButtons;
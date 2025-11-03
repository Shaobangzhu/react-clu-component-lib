import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Alert, { AlertProps } from './alert'

const testProps: AlertProps = {
    title: 'title',
    onClose: jest.fn()
}

const typeProps: AlertProps = {
    ...testProps,
    type: 'success',
    description: 'success desc',
    closable: false
}

describe('test Alert Component', () => {
    it('should render the correct default Alert', () => {
        render(<Alert {...testProps}/>)
        expect(screen.getByText('title')).toBeInTheDocument();
        fireEvent.click(screen.getByText('X'));
        expect(testProps.onClose).toHaveBeenCalled();
        // When transition component is done, come back and finish the verification of removal of current element
    });
});
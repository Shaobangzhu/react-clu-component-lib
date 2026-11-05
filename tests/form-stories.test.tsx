import {composeStories} from '@storybook/react-vite';
import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect,it} from 'vitest';
import preview from '../.storybook/preview';
import * as stories from '../src/forms/DeliveryMetadata.stories';
const {Light,Dark}=composeStories(stories,preview);
it('renders the real synthetic form story, edits controlled state and submits valid native fields',async()=>{
 const user=userEvent.setup();render(<Light/>);
 const reference=screen.getByRole('textbox',{name:'Reference (required)'});
 await user.clear(reference);await user.type(reference,'Sample B');expect(reference).toHaveValue('Sample B');
 await user.selectOptions(screen.getByRole('combobox'),'a');await user.click(screen.getByRole('button',{name:'Submit synthetic form'}));
 expect(screen.getByText('Synthetic form submitted')).toBeVisible();
});
it('uses a local dark story host with unchanged labels and values',()=>{
 render(<Dark/>);const reference=screen.getByRole('textbox',{name:'Reference (required)'});
 expect(reference.closest('[data-clu-theme]')).toHaveAttribute('data-clu-theme','dark');
 expect(reference).toHaveValue('Sample A');expect(document.body).not.toHaveAttribute('data-clu-theme');
});

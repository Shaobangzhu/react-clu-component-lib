import { test, expect } from '@playwright/test';
for (const theme of ['light','dark']) {
  test(`${theme}: reviewed visual states`,async ({page}) => {
    await page.goto(`/iframe.html?id=quality-deterministic--${theme}&viewMode=story`);
    await expect(page.getByRole('heading',{name:'CLU synthetic quality fixture'})).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`${theme}-states.png`,{fullPage:true});
    await page.getByRole('button',{name:'Activate 0'}).focus();
    await expect(page.getByRole('button',{name:'Activate 0'})).toBeFocused();
    await expect(page).toHaveScreenshot(`${theme}-focus.png`,{fullPage:true});
    await page.getByRole('button',{name:'Open quality dialog'}).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page).toHaveScreenshot(`${theme}-dialog.png`);
  });
}
test('native keyboard, control, pagination and modal focus contract',async ({page}) => {
  await page.goto('/iframe.html?id=quality-deterministic--light&viewMode=story');
  const action=page.getByRole('button',{name:'Activate 0'});await action.focus();await page.keyboard.press('Enter');
  await expect(page.getByRole('button',{name:'Activate 1'})).toBeFocused();
  const radio=page.getByRole('radio',{name:'Summary',exact:true});await radio.focus();await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('radio',{name:'Detail',exact:true})).toBeChecked();
  const next=page.getByRole('button',{name:'Next page'});await next.focus();await page.keyboard.press('Enter');
  await expect(page.getByText('Showing 11–11 of 11 items')).toBeVisible();await expect(next).toBeDisabled();
  const trigger=page.getByRole('button',{name:'Open quality dialog'});await trigger.click();
  const input=page.getByRole('textbox',{name:'Review note'});await expect(input).toBeFocused();await input.fill('Preserved synthetic draft');
  await page.getByRole('button',{name:'Cancel review'}).focus();await page.keyboard.press('Tab');await expect(page.getByRole('button',{name:'Close dialog'})).toBeFocused();
  await page.keyboard.press('Shift+Tab');await expect(page.getByRole('button',{name:'Cancel review'})).toBeFocused();
  await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toBeHidden();await expect(trigger).toBeFocused();
  await trigger.click();await expect(input).toHaveValue('Preserved synthetic draft');await page.getByRole('button',{name:'Cancel review'}).click();
});

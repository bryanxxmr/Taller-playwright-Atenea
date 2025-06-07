import { test, expect } from '@playwright/test';

test('TC-1 Verificacion de elementos Visuales en la pagina de registro', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator('input[name="firstName"]')).toBeVisible();
  await expect(page.locator('input[name="lastName"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.getByTestId('boton-registrarse')).toBeVisible();
  // Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle(/Playwright/);
});

test('TC-2 Verificacion Boton de registro esta inhabilitado por defecto', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByTestId('boton-registrarse')).toBeDisabled();
  // Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle(/Playwright/);
});

test('TC-3 Verificacion de que el boton de registro se habilita al completar los campos', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Kenny');
  await page.locator('input[name="lastName"]').fill('Ruiz');
  await page.locator('input[name="email"]').fill('kenny@gmail.com');
  await page.locator('input[name="password"]').fill('123456');
  await expect(page.getByTestId('boton-registrarse')).toBeEnabled();
});

test('TC-4 Verificar redireccionamiento a página de inicio de sesión al hacer clic en el botón de registro', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByTestId('boton-login-header-signup').click();
  await expect(page).toHaveURL('http://localhost:3000/login');
});

test('TC-5 Verificar Registro exitoso con datos válidos', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Juan');
  await page.locator('input[name="lastName"]').fill('Torres');
  await page.locator('input[name="email"]').fill('juantorres'+Date.now().toString()+'@email.com');
  await page.locator('input[name="password"]').fill('123456');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso')).toBeVisible();
});
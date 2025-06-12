import { test, expect } from '@playwright/test';
//test es una funcion que permite crear un test
// expect es una funcion que permite hacer aserciones (aserciones son comparaciones entre el valor esperado y el valor real)
// Importar la libreria de Playwright para hacer pruebas automatizadas

//async hace que la funcion sea asincrona, lo que permite usar await dentro de la funcion
//page es un objeto que representa una pagina web en Playwright
test('Caso de Prueba1 - Verificacion de elementos Visuales en la pagina de registro existan', async ({ page }) => {
  // Navegar a la pagina de registro
  //await hace que la funcion espere a que se resuelva la promesa
  //page es un objeto que representa una pagina web en Playwright
  //goto es una funcion que permite navegar a una URL
  await page.goto('http://localhost:3000/');
  //expect es una funcion que permite hacer aserciones (aserciones son comparaciones entre el valor esperado y el valor real)
  await expect(page.locator('input[name="firstName"]')).toBeVisible(); // Verificar que el campo de nombre exista
  await expect(page.locator('input[name="lastName"]')).toBeVisible(); // Verificar que el campo de apellido exista
  await expect(page.locator('input[name="email"]')).toBeVisible(); // Verificar que el campo de correo electronico exist
  await expect(page.locator('input[name="password"]')).toBeVisible(); // Verificar que el campo de contraseña exista
  await expect(page.getByTestId('boton-registrarse')).toBeVisible(); // Verificar que el boton de registro exista
});

test('Caso de Prueba2 - Verificacion que el boton de registro este inhabilitado por defecto', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByTestId('boton-registrarse')).toBeDisabled(); // Verificar que el boton de registro este inhabilitado por defecto
})

test('Caso de Prueba3 - Verificacion que el boton de registro este habilitado al completar los campos obligatorios', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Completar los campos obligatorios
  await page.locator('input[name="firstName"]').fill("Bryan")
  await page.locator('input[name="lastName"]').fill("Mendoza")
  await page.locator('input[name="email"]').fill("correo@gmail.com")
  await page.locator('input[name="password"]').fill("123456")
  await expect(page.getByTestId('boton-registrarse')).toBeEnabled()
})

test('Caso de Prueba4 - Verificar Redireccionamiento al hacer clic', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.waitForTimeout(5000)
  await page.getByTestId('boton-login-header-signup').click()
  await expect(page).toHaveURL('http://localhost:3000/login')
  await page.waitForTimeout(5000)
})

test('Caso de Prueba5 - Verificar Refistro exitoso con datos validos', async({page})=>{
  await page.goto('http://localhost:3000/')
  await page.locator('input[name="firstName"]').fill('KennyG')
  await page.locator('input[name="lastName"]').fill('MendoR')
  await page.locator('input[name="email"]').fill('correo2' + Date.now().toString() + '@gmail.com')
  await page.locator('input[name="password"]').fill('1234567')
  await page.getByTestId('boton-registrarse').click()
  await page.getByText('Registro exitoso')
  await expect(page.getByText('Registro exitoso')).toBeVisible()
})

test('Caso de Prueba6 - Verificar que un usuario no pueda registrarse con un correo electronico ya existente', async({page})=>{
  const correoElectronico = 'correo2' + Date.now().toString() + '@gmail.com'
  await page.goto('http://localhost:3000/')
  await page.locator('input[name="firstName"]').fill('KennyG')
  await page.locator('input[name="lastName"]').fill('MendoR')
  await page.locator('input[name="email"]').fill(correoElectronico)
  await page.locator('input[name="password"]').fill('1234567')
  await page.getByTestId('boton-registrarse').click()
  await expect(page.getByText('Registro exitoso')).toBeVisible()
  await page.goto('http://localhost:3000/')
  await page.locator('input[name="firstName"]').fill('KennyG')
  await page.locator('input[name="lastName"]').fill('MendoR')
  await page.locator('input[name="email"]').fill(correoElectronico)
  await page.locator('input[name="password"]').fill('1234567')
  await page.getByTestId('boton-registrarse').click()
  await expect(page.getByText('Email already in use')).toBeVisible() // Verificar que el mensaje de error se muestre
  await expect(page.getByText('Registro exitoso')).not.toBeVisible() // Verificar que el boton de registro este inhabilitado
})
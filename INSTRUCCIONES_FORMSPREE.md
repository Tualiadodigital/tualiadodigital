# 📧 Cómo Activar el Formulario de Contacto con Formspree

## ✅ Cambios Realizados

1. ✅ **Precio corregido**: De €499 a **€300** en la sección de comparación
2. ✅ **Formulario configurado**: Ahora usa Formspree para enviar emails reales

---

## 🚀 Pasos para Activar el Formulario

### Paso 1: Crear cuenta en Formspree (GRATIS)

1. Ve a [https://formspree.io/](https://formspree.io/)
2. Haz clic en **"Get Started"** o **"Sign Up"**
3. Regístrate con tu email (puedes usar `info@tualiadodigital.tech`)
4. Confirma tu email

### Paso 2: Crear tu formulario

1. Una vez dentro, haz clic en **"+ New Form"**
2. Dale un nombre al formulario, por ejemplo: **"Contacto Tu Aliado Digital"**
3. Formspree te dará un **Form ID** (algo como `xpznvwxy`)
4. **COPIA ESE ID** - lo necesitarás en el siguiente paso

### Paso 3: Actualizar tu página web

En el archivo `index.html`, busca la línea **975** que dice:

```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Reemplaza `YOUR_FORM_ID` con el ID que copiaste en el paso anterior.

**Ejemplo:**
Si tu Form ID es `xpznvwxy`, quedará así:

```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/xpznvwxy" method="POST">
```

### Paso 4: Subir los cambios a tu sitio web

Sube los archivos actualizados (`index.html` y `js/main.js`) a tu servidor.

### Paso 5: ¡Probar!

1. Ve a tu página web
2. Rellena el formulario de contacto
3. Envíalo
4. **La primera vez**, Formspree te pedirá que confirmes tu email
5. Una vez confirmado, ¡todos los mensajes llegarán automáticamente a tu email!

---

## 📊 Plan Gratuito de Formspree

El plan gratuito incluye:
- ✅ **50 envíos por mes** (más que suficiente para empezar)
- ✅ Emails directos a tu bandeja de entrada
- ✅ Panel de control para ver todos los mensajes
- ✅ Protección anti-spam básica
- ✅ Sin marca de agua

---

## 🔧 ¿Qué hace el formulario ahora?

Cuando alguien rellena el formulario:
1. Los datos se envían a Formspree
2. Formspree te envía un email con:
   - Nombre de la persona
   - Email de contacto
   - Teléfono (si lo puso)
   - Tipo de proyecto
   - Mensaje
3. Puedes responder directamente desde tu email

---

## 💡 Configuraciones Adicionales (Opcional)

Desde el panel de Formspree puedes:
- Configurar un email de confirmación automático para quien envía el formulario
- Añadir protección reCAPTCHA contra spam
- Redirigir a una página de "Gracias" después del envío
- Ver estadísticas de envíos

---

## ❓ ¿Necesitas Ayuda?

Si tienes problemas:
1. Revisa que hayas reemplazado `YOUR_FORM_ID` correctamente
2. Asegúrate de que los archivos estén subidos al servidor
3. Comprueba que hayas confirmado tu email en Formspree

---

## 📝 Resumen Rápido

```bash
1. Ir a formspree.io
2. Crear cuenta
3. Crear formulario "Contacto"
4. Copiar el Form ID
5. Reemplazar YOUR_FORM_ID en index.html (línea 975)
6. Subir archivos al servidor
7. ¡Probar el formulario!
```

---

**¡Listo! Tu formulario estará 100% funcional** 🎉

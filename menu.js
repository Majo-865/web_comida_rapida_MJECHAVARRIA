// ==========================================
// MENÚ INTERACTIVO Y ENVÍO A WHATSAPP
// ==========================================

// Configura aquí tu número de teléfono de WhatsApp (con código de país, sin el signo +)
const TELEFONO_WHATSAPP = '573000000000'; 

document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
  const cartBar = document.getElementById('cart-bar');
  const cartSummary = document.getElementById('cart-summary');
  const cartTotal = document.getElementById('cart-total');
  const btnPedir = document.getElementById('btn-pedir');

  // Escuchar cambios en todos los inputs
  inputs.forEach(input => {
    input.addEventListener('change', actualizarPedido);
  });

  function actualizarPedido() {
    let total = 0;
    let resumenItems = [];

    // 1. Obtener Base de Salchipapa
    const baseSeleccionada = document.querySelector('input[name="base-salchipapa"]:checked');
    if (baseSeleccionada) {
      const precioBase = parseInt(baseSeleccionada.dataset.price);
      total += precioBase;
      resumenItems.push(`Base ${baseSeleccionada.value}`);
    }

    // 2. Obtener Toppings seleccionados
    const toppings = document.querySelectorAll('input[name="topping"]:checked');
    toppings.forEach(top => {
      total += parseInt(top.dataset.price);
      resumenItems.push(top.value);
    });

    // 3. Obtener Salsas seleccionadas (Sin costo)
    const salsas = document.querySelectorAll('input[name="salsa"]:checked');
    if (salsas.length > 0) {
      const listaSalsas = Array.from(salsas).map(s => s.value).join(', ');
      resumenItems.push(`Salsas: (${listaSalsas})`);
    }

    // 4. Obtener Hamburguesas seleccionadas
    const hamburguesas = document.querySelectorAll('input[name="hamburguesa"]:checked');
    hamburguesas.forEach(burguer => {
      total += parseInt(burguer.dataset.price);
      resumenItems.push(burguer.value);
    });

    // 5. Obtener Bebidas seleccionadas
    const bebidas = document.querySelectorAll('input[name="bebida"]:checked');
    bebidas.forEach(bebida => {
      total += parseInt(bebida.dataset.price);
      resumenItems.push(bebida.value);
    });

    // Mostrar u Ocultar la barra flotante según haya algo seleccionado
    if (resumenItems.length > 0) {
      cartBar.classList.remove('hidden');
      cartSummary.textContent = resumenItems.join(' + ');
      cartTotal.textContent = `$${total.toLocaleString('es-CO')}`;
    } else {
      cartBar.classList.add('hidden');
    }
  }

  // Evento al presionar el botón "PEDIR AHORA"
  btnPedir.addEventListener('click', () => {
    let mensaje = '¡Hola! Quisiera realizar el siguiente pedido desde la web:\n\n';

    // Salchipapas
    const baseSeleccionada = document.querySelector('input[name="base-salchipapa"]:checked');
    if (baseSeleccionada) {
      mensaje += `🍟 *Salchipapa:* Base ${baseSeleccionada.value}\n`;

      const toppings = document.querySelectorAll('input[name="topping"]:checked');
      if (toppings.length > 0) {
        const listaToppings = Array.from(toppings).map(t => t.value).join(', ');
        mensaje += `   • *Toppings:* ${listaToppings}\n`;
      }

      const salsas = document.querySelectorAll('input[name="salsa"]:checked');
      if (salsas.length > 0) {
        const listaSalsas = Array.from(salsas).map(s => s.value).join(', ');
        mensaje += `   • *Salsas:* ${listaSalsas}\n`;
      }
      mensaje += '\n';
    }

    // Hamburguesas
    const hamburguesas = document.querySelectorAll('input[name="hamburguesa"]:checked');
    if (hamburguesas.length > 0) {
      mensaje += '🍔 *Hamburguesas:*\n';
      hamburguesas.forEach(h => {
        mensaje += `   • ${h.value}\n`;
      });
      mensaje += '\n';
    }

    // Bebidas
    const bebidas = document.querySelectorAll('input[name="bebida"]:checked');
    if (bebidas.length > 0) {
      mensaje += '🥤 *Bebidas:*\n';
      bebidas.forEach(b => {
        mensaje += `   • ${b.value}\n`;
      });
      mensaje += '\n';
    }

    // Total final
    const totalTexto = cartTotal.textContent;
    mensaje += `💰 *TOTAL ESTIMADO:* ${totalTexto}\n\n`;
    mensaje += 'Quedo atento a la confirmación de mi pedido. ¡Muchas gracias!';

    // Abrir WhatsApp con el mensaje codificado para URL
    const urlWhatsapp = `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsapp, '_blank');
  });
});
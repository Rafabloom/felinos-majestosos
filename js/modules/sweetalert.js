// sweetalert.js
import Swal from 'sweetalert2';

export default class SweetAlert {
  constructor(triggers) {
    this.triggers = document.querySelectorAll(triggers);
    this.addEventListeners();
  }

  addEventListeners() {
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        Swal.fire({
          title: 'Atenção!',
          text: 'Esses links são somente para o visual e não funcionam.',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      });
    });
  }
}

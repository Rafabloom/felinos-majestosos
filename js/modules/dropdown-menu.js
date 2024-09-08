import outsideClick from './outsideclick.js';
import Swal from 'sweetalert2';

export default class DropdownMenu {
  constructor(dropdownMenus, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);
    this.events = events || ['click'];

    this.activeClass = 'active';
    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
    this.handleDropdownItemClick = this.handleDropdownItemClick.bind(this);
  }

  activeDropdownMenu(event) {
    event.preventDefault();
    const element = event.currentTarget;

    // Adiciona a classe ativa
    element.classList.add(this.activeClass);

    // Adiciona a função de clique para os itens do dropdown
    this.addDropdownItemClickEvent(element);

    outsideClick(element, this.events, () => {
      element.classList.remove(this.activeClass);
    });
  }

  addDropdownItemClickEvent(menu) {
    const dropdownItems = menu.querySelectorAll('.dropdown-menu a');
    dropdownItems.forEach(item => {
      item.removeEventListener('click', this.handleDropdownItemClick); // Remove listeners existentes
      item.addEventListener('click', this.handleDropdownItemClick); // Adiciona novo listener
    });
  }

  handleDropdownItemClick(event) {
    event.preventDefault();
    if (window.innerWidth <= 1200) {
      Swal.fire({
        title: 'Atenção!',
        text: 'Os links do Menu Dropdown são somente para o visual e não funcionam.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          title: 'swal2-title-custom',
          confirmButton: 'swal2-confirm-custom',
          icon: 'swal2-icon-custom',
        },
        iconColor: '#ff8c00'
      });
    }
  }

  init() {
    if (this.dropdownMenus.length) {
      this.dropdownMenus.forEach(menu => {
        this.events.forEach(userEvent => {
          menu.addEventListener(userEvent, this.activeDropdownMenu);
        });
      });
    }
    return this;
  }
}

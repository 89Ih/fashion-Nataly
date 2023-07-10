class Product extends HTMLElement {

  connectedCallback() {

    this.innerHTML = `
    <div id="id01" class="modal">
    <div class="modal-content animate " >
      <div class="imgcontainer ">
            <span class="close_box" >&times;</span>
       </h2>
       <div id="explored" class="f1"></div>
      </div>
    </div>
  </div>
             `;
  }
}

customElements.define('product-component', Product)
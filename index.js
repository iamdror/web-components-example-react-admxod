import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import { LitElement, html, property, customElement } from 'lit-element/lit-element.js';

import '@material/mwc-textfield/mwc-textfield.js';
import '@material/mwc-icon-button-toggle/mwc-icon-button-toggle.js';
import '@material/mwc-icon/mwc-icon-font.js';

import '@material/mwc-top-app-bar/mwc-top-app-bar.js';
import '@material/mwc-icon-button/mwc-icon-button.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
    this.myRef = React.createRef();
  }

  render() {
    return (
      <div>
        <mwc-top-app-bar>
          <mwc-icon-button icon="menu" slot="navigationIcon"></mwc-icon-button>
          <div slot="title">Web Components Example</div>
        </mwc-top-app-bar>
        <section className="react">
          <Hello name={this.state.name} />
          <p>
            Start editing to see some magic happen :)
          </p>
        </section>
        <section>
          <my-element></my-element>
          <my-element adjective="neat"></my-element>
        </section>
      </div>
    );
  }

}

export class MyElement extends LitElement {

  static properties = {
    adjective: {type: String},
    _isEditing: {type: Boolean}
  }
  
  constructor() {
    super();
    this.adjective = 'great';
    this._isEditing = false;
  }

  render() {
    return html`
      <style>
        div { 
          background: teal;
          margin: 8px;
          padding: 8px; 
          color: white;
          display: flex;
          align-items: center;
        }

        span {
          flex: 1;
        }
      </style>
      <div>
        <span ?hidden=${this._isEditing}>Web Components are ${this.adjective}!</span>
        <span ?hidden=${!this._isEditing}>
          <mwc-textfield label="Enter some text!" @change=${this.handleChange}></mwc-textfield>
        </span>
      <mwc-icon-button-toggle onIcon="done" offIcon="edit" @click=${this.handleClick}></mwc-icon-button-toggle>
      </div>
    `;
  }

  handleChange(e) {
    this.adjective = e.target.value;
  }

  handleClick() {
    this._isEditing = !this._isEditing;
  }
}
customElements.define('my-element', MyElement);

render(<App />, document.getElementById('root'));

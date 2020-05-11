import React, { Component } from 'react'
let curYear = new Date().getFullYear();


export default class Footer extends Component {
    render() {
        return (
            <footer>
          <p>Copyright &copy; {curYear}</p>
          <p>
            Made by{" "}
            <a
              href="https://linkedin.com/in/victor--fernandez"
              target="_blank"
              rel="noopener noreferrer"
            >
              Victor Fernandez
            </a>
          </p>
        </footer>
        )
    }
}

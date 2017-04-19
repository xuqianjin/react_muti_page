import React, {Component} from "react"
import ReactDOM from 'react-dom'
import styles from './page2.css'

export default class page2 extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={styles.badge}>这是page2</div>
        )
    }
}
ReactDOM.render(React.createElement(page2), document.getElementById('root'))

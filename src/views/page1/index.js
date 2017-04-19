import React, {Component} from "react"
import ReactDOM from 'react-dom'

export default class page1 extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div >这是page1</div>
        )
    }
}
ReactDOM.render(React.createElement(page1), document.getElementById('root'))

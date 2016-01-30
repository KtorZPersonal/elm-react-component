const React = require('react')
const ReactDOM = require('react-dom')

module.exports = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        className: React.PropTypes.string,
        id: React.PropTypes.string
    },

    getInitialState() {
        return { app: null }
    },

    componentDidMount() {
        let ports = Object
                .keys(this.props)
                .filter(x => !/^(name|children|ref|id|className|key|on[A-Z])/.test(x))
                .reduce((o, x) => Object.assign(o, { [x]: this.props[x] }), {})

        let app = Elm.embed(Elm[this.props.name], ReactDOM.findDOMNode(this), ports)

        Object
            .keys(app.ports)
            .forEach(x => {
                if (typeof app.ports[x].subscribe !== "function") { return }
                let handler = this.props[`on${x.substring(0, 1).toUpperCase()+x.substring(1)}`]
                if (handler == null) { return }
                app.ports[x].subscribe(handler)
            })

        this.setState({ app })
    },

    shouldComponentUpdate(nextProps) {
        if (this.state.app == null) { return false }

        let ports = this.state.app.ports
        Object
            .keys(ports)
            .forEach(x => {
                if (typeof ports[x].send !== "function") { return }
                ports[x].send(nextProps[x])
            })

        return false
    },

    render() {
        return (<div className={this.props.className} id={this.props.id}></div>)
    }
})

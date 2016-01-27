const React = require('react')

module.exports = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        initPorts: React.PropTypes.object,
    },

    getInitialState() {
        var id = "elm-react-0"
        while (document.getElementById(id)) {
            id = id.replace(/[0-9]+$/, x => parseInt(x) + 1)
        }
        return { id, app: null }
    },

    componentDidMount() {
        let div = document.getElementById(this.state.id)
        if (div == null) {
            setTimeout(this.componentDidMount, 100)
            return
        }
        let app = Elm.embed(Elm[this.props.name], div, this.props.initPorts)
        Object.keys(app.ports).forEach(x => {
            if (typeof app.ports[x].subscribe !== "function") { return }
            let handler = this.props[`on${x.substring(0, 1).toUpperCase()+x.substring(1)}`]
            if (handler == null) { return }
            app.ports[x].subscribe(handler)
        })

        this.setState({ app })
    },

    shouldComponentUpdate(nextProps, nextState) {
        return false
    },

    render() {
        return (<div id={this.state.id}></div>)
    }
})

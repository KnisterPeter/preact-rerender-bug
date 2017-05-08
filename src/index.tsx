import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import 'preact/devtools';

class Model {
    @observable
    public name = 'World'; 
}
const model = new Model();

interface PluginProps {
    time: number;
    model: Model;
}

@observer
class Plugin extends React.Component<PluginProps, undefined> {
    static displayName = 'Plugin';

    private node: HTMLDivElement;

    componentDidMount() {
        console.log('Plugin mounted', this.node);
        if (this.node !== undefined) {
            ReactDOM.render(<Child model={this.props.model} />, this.node);
        }
    }

    componentDidUpdate() {
        if (this.node !== undefined) {
            ReactDOM.render(<Child model={this.props.model} />, this.node);
        }
    }

    render() {
        console.log('Re-/render plugin');
        return (
            <div ref={node => this.node = node} ></div>
        );
    }
}

interface ChildProps {
    model: Model;
}

@observer
class Child extends React.Component<ChildProps, undefined> {
    static displayName = 'Child';

    componentWillMount() {
        console.log('Mounting Child');
    }

    componentWillUpdate() {
        console.log('Updating Child');
    }

    render() {
        return (
            <p>
                Hello {this.props.model.name}!
            </p>
        );
    }
}

@observer
class Child2 extends React.Component<ChildProps, undefined> {
    static displayName = 'Child2';

    componentWillMount() {
        console.log('Mounting Child2');
    }

    componentWillUpdate() {
        console.log('Updating Child2');
    }

    render() {
        return (
            <div>
                <p>
                    Hello {this.props.model.name}!
                    <Plugin model={this.props.model} time={new Date().getTime()} />
                </p>
            </div> 
        );
    }
}

interface RootProps {
    model: Model;
}

@observer
class Root extends React.Component<RootProps, undefined> {
    static displayName = 'Root';

    componentWillMount() {
        console.log('Mounting Root');
    }

    componentWillUpdate() {
        console.log('Updating Root');
    }

    onClick() {
        this.props.model.name = `Tapped at ${new Date().getTime()}`;
    }

    render() {
        return (
            <div>
                <Child model={this.props.model} />
                <Plugin model={this.props.model} time={new Date().getTime()} />
                <Child2 model={this.props.model} />
                <br />
                <button onClick={() => this.onClick()}>Tap</button>
            </div>
        );
    }
}

ReactDOM.render(<Root model={model} />, document.getElementById('app'));

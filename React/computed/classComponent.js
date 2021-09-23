// 在类组件中
class ClassComponent extends Component {
  get computed() {
    return this.props.value;
  }

  get computed2() {
    return this.computed + "2";
  }

  render() {
    return (
      <div>
        {this.computed}, {this.computed2}
      </div>
    );
  }
}

function App() {
  const [state, setState] = useState("old");

  useEffect(() => {
    // 模拟一些异步处理，变化传入的 props
    setTimeout(() => {
      setState("new");
    }, 4000);
  }, []);

  return <ClassComponent value={state}></ClassComponent>;
}

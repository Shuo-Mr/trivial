// 使用useMemo 实现

const handler = (v) => v;

function FC({ value }) {
  const computed = useMemo(() => handler(value), [value]);

  return <div>{computed}</div>;
}

function App() {
  const [data, setData] = useState("old");

  useEffect(() => {
    setTimeout(() => {
      setData("new");
    }, 4000);
  }, []);

  return <FC value={data}></FC>;
}

// Function Async Components

const asyncHandler = (v) => {
  return new Promise((resolve, rejcet) => {
    setTimeout(() => {
      resolve(`已处理`);
    }, 2000);
  });
};

/**
 * 处理 async 业务的 hooks 封装
 * @param {Function} func 异步逻辑函数
 * @param {Array} dep 依赖列表
 * @param {Object} initialValue 初始值
 */

function useAsynComputed(func, dep, initialValue) {
  const [val, setVal] = useState(initialValue);

  useEffect(() => {
    let cancel = false;

    const handler = async () => {
      const res = await func();
      if (!cancel) {
        setVal(res);
      }
    };

    handler();

    return () => {
      cancel = true;
    };
  }, [dep]);
}

function AsyncFC({ value }) {
  const cpmputed = useAsynComputed(value, [value], value);

  return <div>{cpmputed}</div>;
}

function App() {
  const [data, setData] = useState("old");

  useEffect(() => {
    // 模拟一些异步处理，变化传入的 props
    setTimeout(() => {
      setData("new");
    }, 4000);
  }, []);

  return <AsyncFC value={data}></AsyncFC>;
}

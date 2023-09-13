import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import finnHub from "../../api/finnHub";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function StockList() {
  const { watchList, setWatchList } = useContext(AppContext);
  // console.log(watchList)
  const [stocks, setStocks] = useState([]);
  // console.log(stocks)
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    console.log("stocklist -> useeffect ran");
    let isMounted = true;
    async function fetchData() {
      try {
        const response = await Promise.all(
          watchList.map((item) => {
            return finnHub.get("/quote?", {
              params: {
                symbol: item,
              },
            });
          })
        );
        // const {data} = await finnHub.get("/quote?", {
        //     params: {
        //         symbol: 'AMZN'
        //     }
        // })
        // console.log(response)
        if (isMounted) {
          const stocksData = response.map((item) => {
            return {
              data: item.data,
              symbol: item.config.params.symbol,
            };
          });
          // console.log(stocksData)
          setStocks(stocksData);
        }
      } catch (error) {}
      setLoading(false);
    }
    fetchData();
    return () => (isMounted = false);
  }, [watchList]);

  function changeColor(data) {
    if (data < 0) {
      return "text-danger";
    } else return "text-success";
  }
  function changeArrow(data) {
    if (data < 0) {
      return <BiSolidDownArrow />;
    } else return <BiSolidUpArrow />;
  }

  function selectedStockDetail(symbol) {
    console.log("stock clicked for detail");
    navigate(`detail/${symbol}`);
  }

  function deleteStock(symbol) {
    const filteredWatchList = watchList.filter((item) => {
      return item !== symbol;
    });
    setWatchList(filteredWatchList);
  }

  if (stocks.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="column">Name</th>
            <th scope="column">Last</th>
            <th scope="column">Chg</th>
            <th scope="column">Chg%</th>
            <th scope="column">High</th>
            <th scope="column">Low</th>
            <th scope="column">Open</th>
            <th scope="column">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((item) => {
            const { data, symbol } = item;
            return (
              <tr key={symbol} onClick={() => selectedStockDetail(symbol)}>
                <th scope="row">{symbol}</th>
                <td> {data.c} </td>
                <td className={changeColor(data.d)}>
                  {data.d} {changeArrow(data.dp)}
                </td>
                <td className={changeColor(data.dp)}>
                  {data.dp} {changeArrow(data.dp)}
                </td>
                <td> {data.h.toFixed(2)} </td>
                <td> {data.l.toFixed(2)} </td>
                <td> {data.o} </td>
                <td>
                  {data.pc}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteStock(symbol);
                    }}
                  >
                    close
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

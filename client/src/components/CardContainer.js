import React, { useState } from "react";
import Cards from "./Cards";

function CardContainer({ users, logs }) {
  const [nameSort, setNameSort] = useState(true);
  const [revenueSort, setRevenueSort] = useState(true);
  const [impressSort, setImpressSort] = useState(true);
  const [convertSort, setConvertSort] = useState(true);
  const [init, setInit] = useState(false);
  const combineData = () => {
    if (!init) {
      const map = {};
      const total = (acc, curr) => acc + curr;
      logs.forEach(log => {
        if (!map[log.user_id]) {
          map[log.user_id] = {
            time: [],
            type: [],
            revenue: [],
            impressions: [],
            conversions: []
          };
        }
        if (log.type === "impression") {
          map[log.user_id].impressions.push(log.time);
        } else {
          map[log.user_id].conversions.push(new Date(log.time));
        }
        map[log.user_id].time.push(log.time);
        map[log.user_id].type.push(log.type);
        map[log.user_id].revenue.push(log.revenue);
      });

      users.map(user => {
        const obj = {};
        map[user.id].conversions.sort((a, b) => a - b);
        map[user.id].conversions.forEach(date => {
          const formattedDate = date.getMonth() + 1 + "/" + date.getDate();
          if (!obj[formattedDate]) {
            obj[formattedDate] = [];
          }
          obj[formattedDate].push(date);
        });
        user.totalImpress = map[user.id].impressions.length;
        user.totalConvert = map[user.id].conversions.length;
        user.revenue = map[user.id].revenue.reduce(total);
        user.dates = obj;
        const datapoints = [];
        for (let key in obj) {
          let temp = { name: key, conversions: obj[key].length };
          datapoints.push(temp);
        }
        user.data = datapoints;
        return user;
      });
      setInit(true);
    }
  };
  combineData();

  const sortByName = () => {
    users.sort((a, b) => a.name.localeCompare(b.name));
    if (!nameSort) {
      users.reverse();
    }
    setNameSort(!nameSort);
  };
  const sortByRevenue = () => {
    users.sort((a, b) => a.revenue - b.revenue);
    if (!revenueSort) {
      users.reverse();
    }
    setRevenueSort(!revenueSort);
  };
  const sortByConvert = () => {
    users.sort((a, b) => a.totalConvert - b.totalConvert);
    if (!convertSort) {
      users.reverse();
    }
    setConvertSort(!convertSort);
  };
  const sortByImp = () => {
    users.sort((a, b) => a.totalImpress - b.totalImpress);
    if (!impressSort) {
      users.reverse();
    }
    setImpressSort(!impressSort);
  };

  return (
    <div>
      <h1>Marketing Summary</h1>
      <div className="buttonContainer">
        <button className="sortButton" onClick={sortByName}>
          By name {nameSort ? "asc" : "desc"}
        </button>
        <button className="sortButton" onClick={sortByImp}>
          By impressions {impressSort ? "asc" : "desc"}
        </button>
        <button className="sortButton" onClick={sortByConvert}>
          By conversions {convertSort ? "asc" : "desc"}
        </button>
        <button className="sortButton" onClick={sortByRevenue}>
          By revenue {revenueSort ? "asc" : "desc"}
        </button>
      </div>
      <div className="grid">
        <Cards users={users} />
      </div>
    </div>
  );
}

export default CardContainer;

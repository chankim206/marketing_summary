import React from "react";
import fallback from "../assets/oops.png";
import {
  Label,
  Text,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Cards({ users }) {
  const CustomizedLabel = () => {
    return (
      <Text
        x={0}
        y={0}
        dx={-90}
        dy={40}
        textAnchor="middle"
        width={180}
        transform="rotate(-90)"
      >
        Conversions
      </Text>
    );
  };
  return users.map(user => {
    return (
      <div key={user.id}>
        {user.avatar && (
          <React.Fragment>
            <div className="basic-info">
              <div>
                <img
                  src={user.avatar}
                  alt="icon"
                  onError={event => event.target.setAttribute("src", fallback)}
                ></img>
              </div>
              <div className="desc">
                <h2 className="name">{user.name}</h2>
                <p className="occu">{user.occupation}</p>
              </div>
            </div>
          </React.Fragment>
        )}
        {!user.avatar && (
          <div className="basic-info">
            <div data-name={user.name.charAt(0)}></div>
            <div className="desc">
              <h2 className="name">{user.name}</h2>
              <p className="occu">{user.occupation}</p>
            </div>
          </div>
        )}
        <div className="infographics">
          <div>
            <span className="chart">Conversions Per Day</span>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={user.data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="0 0" />
                <XAxis tick={{ fontSize: 10 }} dataKey="name">
                  <Label value="Dates" offset={-5} position="insideBottom" />
                </XAxis>
                <YAxis tick={{ fontSize: 10 }} label={<CustomizedLabel />} />
                <Tooltip />
                <Line type="monotone" dataKey="conversions" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="summary">
            <span className="impress">{user.totalImpress}</span>
            <span className="types">impressions</span>
            <span className="convert">{user.totalConvert}</span>
            <span className="types">conversions</span>
            <p className="money">&#36;{Math.round(user.revenue)}</p>
          </div>
        </div>
      </div>
    );
  });
}

export default Cards;

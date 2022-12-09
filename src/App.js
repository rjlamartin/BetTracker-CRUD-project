import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [wager, setWager] = useState("");
  const [league, setLeague] = useState("");
  const [winLoss, setWinLoss] = useState("");
  const [sportsWagersList, setWagersList] = useState([]);

  const [newwinloss, setnewwinloss] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setWagersList(response.data);
    });
  }, []);

  const submitWager = () => {
    Axios.post("http://localhost:3001/api/insert", {
      wager: wager,
      league: league,
      winLoss: winLoss,
    });

    setWagersList([
      ...sportsWagersList,
      { wager: wager, league: league, winLoss: winLoss },
    ]);
  };

  const deleteWager = (wager) => {
    Axios.delete(`http://localhost:3001/api/delete/${wager}`);
  };

  const updatewinloss = (wager) => {
    Axios.put("http://localhost:3001/api/update/:id", {
      wager: wager,
      league: league,
      winLoss: newwinloss,
    });
    setnewwinloss("")
  };

  return (
    <div className="App">
      <h1>Bet Tracker</h1>

      <div className="form">
        <label>Wager:</label>
        <input
          type="text"
          name="wager"
          onChange={(e) => {
            setWager(e.target.value);
          }}
        />
        <label>League:</label>
        <input
          type="text"
          name="league"
          onChange={(e) => {
            setLeague(e.target.value);
          }}
        />
        <label>Win/Loss:</label>
        <input
          type="text"
          name="winLoss"
          onChange={(e) => {
            setWinLoss(e.target.value);
          }}
        />

        <button onClick={submitWager}>Submit</button>

        {sportsWagersList.map((val) => {
          return (
            <div className="card">
              <h2>Wager: {val.wager}</h2>
              <p>League: {val.league}</p>
              <h2>W/L: {val.winLoss}</h2>

              <button
                onClick={() => {
                  deleteWager(val.wager);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e)=> {
                  setnewwinloss(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updatewinloss(val.wager);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

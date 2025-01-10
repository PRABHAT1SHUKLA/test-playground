import React, { useState, useEffect, useCallback } from "react";
import "./CryptoTracker.css";

interface CryptoData {
  name: string;
  symbol: string;
  price: number;
  change: number;
}

const CryptoTracker: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cryptocurrency data
  const fetchCryptoData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets", {
        method: "GET",
        headers: { accept: "application/json" },
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 5,
          page: 1,
          sparkline: false,
        },
      });
      const data = await response.json();
      const formattedData = data.map((coin: any) => ({
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price,
        change: coin.price_change_percentage_24h,
      }));
      setCryptoData(formattedData);
    } catch (error) {
      console.error("Failed to fetch crypto data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-update every 30 seconds
  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 30000);
    return () => clearInterval(interval);
  }, [fetchCryptoData]);

  return (
    <div className="crypto-tracker">
      <h1>Crypto Price Tracker</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price (USD)</th>
              <th>Change (24h)</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((coin, index) => (
              <tr key={index}>
                <td>{coin.name}</td>
                <td>{coin.symbol}</td>
                <td>${coin.price.toFixed(2)}</td>
                <td className={coin.change > 0 ? "positive" : "negative"}>
                  {coin.change.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CryptoTracker;

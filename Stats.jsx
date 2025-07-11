// StatisticsPage.jsx
import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import axios from "axios";

const StatisticsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Replace with your backend API endpoint
    axios.get("http://localhost:5000/api/statistics")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Stats Fetch Error:", err));
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>URL Statistics</Typography>
      {data.length === 0 ? (
        <Typography>No statistics available.</Typography>
      ) : (
        data.map((item, index) => (
          <Card key={index} variant="outlined" sx={{ my: 2 }}>
            <CardContent>
              <Typography><strong>Short Link:</strong> <a href={`http://localhost:5000/${item.shortCode}`}>{item.shortCode}</a></Typography>
              <Typography><strong>Original URL:</strong> {item.originalUrl}</Typography>
              <Typography><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</Typography>
              <Typography><strong>Expiry:</strong> {new Date(item.expiry).toLocaleString()}</Typography>
              <Typography><strong>Total Clicks:</strong> {item.clicks.length}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1">Click Logs:</Typography>
              {item.clicks.length === 0 ? (
                <Typography>No clicks yet.</Typography>
              ) : (
                item.clicks.map((click, idx) => (
                  <Box key={idx} ml={2}>
                    <Typography>• {new Date(click.timestamp).toLocaleString()} — {click.referer || 'Unknown Source'}</Typography>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default StatisticsPage;

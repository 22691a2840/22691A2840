import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const UrlForm = () => {
  const [urls, setUrls] = useState([{ url: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleAdd = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = async () => {
    const res = [];
    for (let u of urls) {
      if (!u.url) continue;

      try {
        const response = await axios.post("http://localhost:5000/api/shorten", {
          url: u.url,
          validity: u.validity ? parseInt(u.validity) : undefined,
          shortcode: u.shortcode || undefined,
        });
        res.push(response.data);
      } catch (err) {
        res.push({
          error:
            err.response?.data?.error ||
            err.response?.data ||
            err.message ||
            "Something went wrong",
        });
      }
    }
    setResults(res);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Shorten URLs
      </Typography>

      {urls.map((input, i) => (
        <Box key={i} my={2} border={1} borderRadius={2} p={2}>
          <TextField
            label="Original URL"
            value={input.url}
            fullWidth
            margin="dense"
            onChange={(e) => handleChange(i, "url", e.target.value)}
          />
          <TextField
            label="Validity (mins)"
            type="number"
            value={input.validity}
            margin="dense"
            onChange={(e) => handleChange(i, "validity", e.target.value)}
            fullWidth
          />
          <TextField
            label="Custom Shortcode"
            value={input.shortcode}
            margin="dense"
            onChange={(e) => handleChange(i, "shortcode", e.target.value)}
            fullWidth
          />
        </Box>
      ))}

      <Button onClick={handleAdd} disabled={urls.length >= 5}>
        Add More
      </Button>
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        sx={{ ml: 2 }}
      >
        Shorten
      </Button>

      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Results:</Typography>
          {results.map((r, i) => (
            <Box key={i} mb={2} p={2} border={1} borderRadius={2}>
              {r.shortLink ? (
                <>
                  <Typography>
                    <strong>Short Link:</strong>{" "}
                    <a href={r.shortLink} target="_blank" rel="noreferrer">
                      {r.shortLink}
                    </a>
                  </Typography>
                  <Typography>
                    <strong>Expires At:</strong> {r.expiry}
                  </Typography>
                </>
              ) : (
                <Typography color="error">
                  <strong>Error:</strong>{" "}
                  {typeof r.error === "string"
                    ? r.error
                    : JSON.stringify(r.error)}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UrlForm;

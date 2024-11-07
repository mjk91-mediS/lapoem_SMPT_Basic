const express = require('express');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 책 관련 라우트
app.use('/api', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

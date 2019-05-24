const path = require('path'),
    express = require('express'),
    app = express(),
    port = process.env.PORT || 3001;

const distPath = path.resolve(__dirname, '../', 'dist');
app.get('/', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
});
app.use(express.static(distPath));

app.listen(port, () => { console.log(`App is listening on port ${port}`) });
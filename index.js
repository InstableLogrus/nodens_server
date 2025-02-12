import app from './app.ts';

const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening on http://localhost:${port}`);
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
});

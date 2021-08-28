import app from './infra/config/app';

app.listen(process.env.PORT || 4000, () => {
  console.log('Server running');
});
